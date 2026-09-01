#!/usr/bin/env node
/**
 * token-decisions — "대응 토큰이 없는 값"을 결정 가능한 형태로 묶는다.
 *
 * 스캐너 출력은 파일·줄 단위라 207건이 207개의 문제로 보인다.
 * 실제로는 고유 값이 33개뿐이고, 같은 값이 여러 곳에서 반복될 뿐이다.
 * 값 하나를 결정하면 그 값이 쓰인 모든 곳이 한 번에 정리된다.
 *
 * 각 값마다 보여주는 것:
 *   · 어느 컴포넌트의 어느 축(gap/padding/size)에 쓰이는지
 *   · 같은 값을 가진 기존 토큰 (매핑 후보)
 *   · 실제 코드 문맥
 *
 * 사용법:
 *   node scripts/token-decisions.mjs              # 빈도순 전체
 *   node scripts/token-decisions.mjs --top 10     # 상위 N개만
 *   node scripts/token-decisions.mjs --value 4    # 특정 값만 자세히
 *   node scripts/token-decisions.mjs --json
 */

import { readFileSync } from 'node:fs'
import { execFileSync } from 'node:child_process'
import { join, resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const argv = process.argv.slice(2)
const opt = (n) => { const i = argv.indexOf(n); return i >= 0 ? argv[i + 1] : null }

const C = {
  cyan: (s) => `\x1b[36m${s}\x1b[0m`,
  gray: (s) => `\x1b[90m${s}\x1b[0m`,
  bold: (s) => `\x1b[1m${s}\x1b[0m`,
  green: (s) => `\x1b[32m${s}\x1b[0m`,
  yellow: (s) => `\x1b[33m${s}\x1b[0m`,
}

/* 기존 토큰 — 같은 값을 가진 것을 매핑 후보로 제시 */
const TOKEN = {}
for (const f of ['src/tokens/colors.css', 'src/tokens/spacing.css', 'src/tokens/typography.css', 'src/styles/globals.css']) {
  const src = readFileSync(join(ROOT, f), 'utf8')
  for (const m of src.matchAll(/(--[a-z0-9-]+)\s*:\s*([^;]+);/g)) TOKEN[m[1]] = m[2].trim()
}
const BY_PX = {}
for (const [k, v] of Object.entries(TOKEN)) {
  const m = /^(-?[\d.]+)px$/.exec(v)
  if (m) (BY_PX[m[1]] ??= []).push(k)
}

/* 스캔 */
let out
try {
  out = execFileSync(process.execPath, ['scripts/scan-hardcode.mjs', 'src', '--all', '--json'], {
    cwd: ROOT, encoding: 'utf8', maxBuffer: 128 * 1024 * 1024,
  })
} catch (e) { out = e.stdout }
const { findings } = JSON.parse(out)

/** 유틸리티 → 사람이 읽는 축 이름 */
const AXIS = {
  gap: '간격', 'gap-x': '가로 간격', 'gap-y': '세로 간격',
  p: '패딩', px: '좌우 패딩', py: '상하 패딩',
  pt: '위 패딩', pb: '아래 패딩', pl: '왼쪽 패딩', pr: '오른쪽 패딩',
  m: '마진', mx: '좌우 마진', my: '상하 마진',
  mt: '위 마진', mb: '아래 마진', ml: '왼쪽 마진', mr: '오른쪽 마진',
  w: '너비', h: '높이', size: '크기', 'min-w': '최소 너비', 'max-w': '최대 너비',
  text: '글자 크기', leading: '줄 높이', tracking: '자간',
  top: '위치(top)', right: '위치(right)', bottom: '위치(bottom)', left: '위치(left)',
  rounded: '모서리',
}

/** 인라인 스타일이면 스니펫에서 CSS 속성명을 뽑는다 (paddingTop: '12px' → paddingTop) */
const CSS_PROP = {
  paddingtop: '위 패딩', paddingbottom: '아래 패딩', paddingleft: '왼쪽 패딩', paddingright: '오른쪽 패딩',
  paddinginline: '좌우 패딩', paddingblock: '상하 패딩', padding: '패딩',
  margintop: '위 마진', marginbottom: '아래 마진', margin: '마진',
  gap: '간격', rowgap: '세로 간격', columngap: '가로 간격',
  width: '너비', height: '높이', minwidth: '최소 너비', maxwidth: '최대 너비', maxheight: '최대 높이',
  fontsize: '글자 크기', lineheight: '줄 높이', borderradius: '모서리',
  top: '위치(top)', left: '위치(left)', right: '위치(right)', bottom: '위치(bottom)',
}
function inlineAxis(snippet, px) {
  const re = new RegExp("([A-Za-z]+)\\s*:\\s*['\"]" + px.replace('.', '\\.') + "px['\"]")
  const m = re.exec(snippet)
  if (!m) return null
  return CSS_PROP[m[1].toLowerCase()] || m[1]
}

const groups = {}
for (const f of findings) {
  if (!/대응 토큰 없음|토큰 없음|네임스페이스·축이 맞는 토큰 없음/.test(f.message)) continue
  // 스토리는 데모 데이터다. 디자인 토큰 결정 대상이 아니다.
  if (/\.stories\.tsx?$/.test(f.file)) continue
  const pxm = /(\d+(?:\.\d+)?)px/.exec(f.match) || /(\d+(?:\.\d+)?)px/.exec(f.message)
  if (!pxm) continue
  const px = pxm[1]
  const util = f.match.includes('-[') ? f.match.slice(0, f.match.indexOf('-[')) : null
  const axis = util ? (AXIS[util] || util) : (inlineAxis(f.snippet, px) || '(인라인)')
  const comp = (/components\/([^/]+)\//.exec(f.file) || [, 'App'])[1]
  ;(groups[px] ??= []).push({ comp, util: util || 'style', axis, file: f.file, line: f.line, match: f.match, snippet: f.snippet })
}

let entries = Object.entries(groups).sort((a, b) => b[1].length - a[1].length)
const only = opt('--value')
if (only) entries = entries.filter(([px]) => px === only)
const top = opt('--top')
if (top && !only) entries = entries.slice(0, parseInt(top, 10))

if (argv.includes('--json')) {
  console.log(JSON.stringify(Object.fromEntries(entries.map(([px, us]) => [px, { count: us.length, candidates: BY_PX[px] || [], usages: us }])), null, 2))
  process.exit(0)
}

const total = Object.values(groups).reduce((a, b) => a + b.length, 0)
console.log(C.bold(`토큰 없는 값 ${Object.keys(groups).length}종 · ${total}곳`))
console.log(C.gray('값 하나를 결정하면 그 값이 쓰인 모든 곳이 정리된다.\n'))

for (const [px, uses] of entries) {
  console.log(C.bold(C.cyan(`${px}px`)) + C.gray(`  ${uses.length}곳`))

  // 컴포넌트 × 축으로 묶어서 의미를 드러낸다
  const byCtx = {}
  for (const u of uses) (byCtx[`${u.comp} · ${u.axis}`] ??= []).push(u)
  for (const [ctx, list] of Object.entries(byCtx).sort((a, b) => b[1].length - a[1].length)) {
    console.log(`   ${ctx} ${C.gray('×' + list.length)}`)
    if (only) for (const u of list) console.log(C.gray(`      ${u.file.replace('src/components/', '')}:${u.line}  ${u.snippet.slice(0, 76)}`))
  }

  const cands = (BY_PX[px] || []).filter((t) => !t.startsWith('--elevation'))
  if (cands.length) {
    const show = cands.slice(0, 4)
    console.log(C.gray(`   같은 값 토큰: ${show.join(', ')}${cands.length > 4 ? ` 외 ${cands.length - 4}` : ''}`))
  } else {
    console.log(C.yellow('   같은 값 토큰 없음 — 신설이 유일한 선택'))
  }
  console.log('')
}

console.log(C.gray('각 값마다: ① 토큰 신설  ② 기존 토큰 매핑  ③ 그대로 두기'))
console.log(C.gray('자세히 보려면  node scripts/token-decisions.mjs --value 4'))
