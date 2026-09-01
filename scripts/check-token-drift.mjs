#!/usr/bin/env node
/**
 * check-token-drift — Figma 변수와 레포 토큰이 어긋났는지 검사한다.
 *
 * 왜 "생성기"가 아니라 "검사기"인가:
 *   get_variable_defs 는 **노드가 쓰는 변수만** 돌려준다. 전체 컬렉션을 한 번에
 *   못 받으므로 CSS 전체를 재생성할 수 없다. 게다가 현재 토큰 파일에는 손으로 쓴
 *   레이어 구조·섹션 주석·한글 설명이 들어 있어 통째로 덮어쓰면 그게 다 날아간다.
 *   그래서 값이 어긋난 것만 잡아내고, 고치는 건 사람이 판단한다.
 *
 * 스냅샷은 에이전트가 MCP 로 받아 scripts/figma-vars/<이름>.json 에 저장한다.
 * (스크립트는 MCP 를 호출할 수 없다)
 *
 * 사용법:
 *   node scripts/check-token-drift.mjs            # 전체 스냅샷 검사
 *   node scripts/check-token-drift.mjs --json
 *
 * 종료 코드: 0 = 일치, 1 = 드리프트 발견
 */

import { readFileSync, readdirSync, existsSync } from 'node:fs'
import { join, resolve, dirname, basename } from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const SNAP_DIR = join(ROOT, 'scripts', 'figma-vars')
const CSS_FILES = ['src/tokens/colors.css', 'src/tokens/spacing.css', 'src/tokens/typography.css', 'src/styles/globals.css']

const C = {
  red: (s) => `\x1b[31m${s}\x1b[0m`,
  yellow: (s) => `\x1b[33m${s}\x1b[0m`,
  gray: (s) => `\x1b[90m${s}\x1b[0m`,
  green: (s) => `\x1b[32m${s}\x1b[0m`,
  cyan: (s) => `\x1b[36m${s}\x1b[0m`,
  bold: (s) => `\x1b[1m${s}\x1b[0m`,
}

/* ── 레포 토큰 읽기 + 주석의 Figma 경로 인덱싱 ── */
const TOKEN = {}
const BY_FIGMA_PATH = {}
for (const rel of CSS_FILES) {
  const abs = join(ROOT, rel)
  if (!existsSync(abs)) continue
  const src = readFileSync(abs, 'utf8')
  for (const m of src.matchAll(/(--[a-z0-9-]+)\s*:\s*([^;]+);/g)) TOKEN[m[1]] = m[2].trim()
  // 선언 뒤 주석에 적힌 Figma 경로 (예: /* color/black/black200 */)
  for (const m of src.matchAll(/(--[a-z0-9-]+)\s*:[^;]+;\s*\/\*\s*([^*\n]+?)\s*(?:\*\/|—|※)/g)) {
    const first = m[2].trim().split(/\s+/)[0]
    if (first.includes('/') && !BY_FIGMA_PATH[first]) BY_FIGMA_PATH[first] = m[1]
  }
}

const OVERRIDE = JSON.parse(readFileSync(join(ROOT, 'scripts', 'figma-token-map.json'), 'utf8'))

/** var() 체인을 끝까지 푼다 */
function resolveToken(name, guard = 0) {
  let v = TOKEN[name]
  const only = /^var\((--[a-z0-9-]+)\)$/
  while (v && only.test(v) && guard++ < 8) v = TOKEN[only.exec(v)[1]]
  return v
}

/**
 * Figma 경로 → 레포 토큰명.
 * 우선순위: 예외표 → CSS 주석 → 규칙 유추
 */
function toToken(path) {
  if (OVERRIDE[path]) return OVERRIDE[path]
  if (BY_FIGMA_PATH[path]) return BY_FIGMA_PATH[path]

  // typeset_{step}_{weight}/{prop} → --typeset-{step}-{prop}
  // 레포는 weight 를 접어서 하나로 쓴다 (bold/regular 가 같은 size 토큰을 공유)
  const ts = /^typeset_(.+?)(?:_(?:bold|regular|medium|semibold))?\/(size|lineheight|letterspacing|weight|font)$/.exec(path)
  if (ts) {
    const propMap = { size: 'size', lineheight: 'lh', letterspacing: 'tracking' }
    const prop = propMap[ts[2]]
    if (!prop) return null // weight·font 는 레포에 대응 토큰 없음
    return '--typeset-' + ts[1].replace(/_/g, '-') + '-' + prop
  }

  // 일반 규칙: a/b/c → --a-b-c (공백·언더스코어를 하이픈으로)
  const guess = '--' + path.toLowerCase().replace(/[/\s_]+/g, '-').replace(/-+/g, '-')
  if (TOKEN[guess] !== undefined) return guess

  // 유추한 이름의 계열이 레포에 이미 있으면 "이름을 못 풀었다"가 아니라
  // "Figma 에는 있는데 레포에 선언이 없다"로 본다. 후자가 훨씬 actionable 하다.
  const family = guess.replace(/-[^-]+$/, '')
  const hasFamily = Object.keys(TOKEN).some((k) => k.startsWith(family + '-'))
  return hasFamily ? guess : null
}

/** Figma 값과 레포 값이 같은가 (Figma 치수는 단위 없는 숫자) */
function sameValue(figma, repo) {
  if (repo === undefined) return false
  const f = String(figma).trim().toLowerCase()
  const r = String(repo).trim().toLowerCase()
  if (f === r) return true
  if (/^-?[\d.]+$/.test(f) && r === f + 'px') return true          // "12" vs "12px"
  const hex = (x) => x.replace('#', '').replace(/^(.)(.)(.)$/, '$1$1$2$2$3$3')
  if (f.startsWith('#') && r.startsWith('#')) {
    const [a, b] = [hex(f), hex(r)]
    if (a === b) return true
    if (a.length === 8 && a.endsWith('ff') && a.slice(0, 6) === b) return true
    if (b.length === 8 && b.endsWith('ff') && b.slice(0, 6) === a) return true
  }
  return false
}

/* ── 스냅샷 검사 ── */
if (!existsSync(SNAP_DIR) || !readdirSync(SNAP_DIR).filter((f) => f.endsWith('.json')).length) {
  console.log(C.yellow('스냅샷이 없습니다.'))
  console.log(C.gray('  에이전트가 get_variable_defs 로 받아 scripts/figma-vars/<이름>.json 에 저장해야 합니다.'))
  console.log(C.gray('  형식: { "color/black/black200": "#626262", "radius/radius050": "4", ... }'))
  process.exit(0)
}

const drift = [], unmapped = [], missing = []
let checked = 0

for (const file of readdirSync(SNAP_DIR).filter((f) => f.endsWith('.json')).sort()) {
  const snap = JSON.parse(readFileSync(join(SNAP_DIR, file), 'utf8'))
  const source = basename(file, '.json')
  for (const [path, figmaVal] of Object.entries(snap)) {
    if (path.startsWith('_')) continue
    // 합성 이펙트(Effect(...))는 값 비교 대상이 아니다
    if (typeof figmaVal === 'string' && figmaVal.startsWith('Effect(')) continue

    const tok = toToken(path)
    if (!tok) { unmapped.push({ source, path, figmaVal }); continue }
    const repoVal = resolveToken(tok)
    if (repoVal === undefined) { missing.push({ source, path, tok }); continue }
    checked++
    if (!sameValue(figmaVal, repoVal)) drift.push({ source, path, tok, figmaVal, repoVal })
  }
}

if (process.argv.includes('--json')) {
  console.log(JSON.stringify({ checked, drift, unmapped, missing }, null, 2))
} else {
  console.log(`대조 ${checked}건 — 드리프트 ${drift.length} / 미매핑 ${unmapped.length} / 토큰 없음 ${missing.length}\n`)
  if (drift.length) {
    console.log(C.red(C.bold('✗ 값이 어긋남 — Figma 가 바뀌었는데 코드가 안 따라갔다')))
    for (const d of drift) {
      console.log(`  ${C.cyan(d.path)}`)
      console.log(`     Figma ${C.bold(d.figmaVal)}  ≠  ${d.tok} ${C.bold(d.repoVal)}   ${C.gray('(' + d.source + ')')}`)
    }
    console.log('')
  }
  if (missing.length) {
    console.log(C.yellow('토큰이 없음 — Figma 에는 있는데 레포에 선언이 없다'))
    for (const m of missing.slice(0, 15)) console.log(C.gray(`  ${m.path} → ${m.tok} (${m.source})`))
    if (missing.length > 15) console.log(C.gray(`  ... 외 ${missing.length - 15}건`))
    console.log('')
  }
  if (unmapped.length) {
    console.log(C.gray(`매핑 불가 ${unmapped.length}건 — scripts/figma-token-map.json 에 추가하면 검사 대상이 된다`))
    for (const u of unmapped.slice(0, 10)) console.log(C.gray(`  ${u.path} = ${u.figmaVal}`))
    if (unmapped.length > 10) console.log(C.gray(`  ... 외 ${unmapped.length - 10}건`))
    console.log('')
  }
  if (!drift.length) console.log(C.green('✓ 대조한 토큰은 Figma 와 일치'))
}

process.exitCode = drift.length ? 1 : 0
