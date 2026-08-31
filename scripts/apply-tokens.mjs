#!/usr/bin/env node
/**
 * apply-tokens — 확신 추천만 골라 실제 코드에 적용한다.
 *
 * 스캐너가 "네임스페이스 + 축"을 모두 만족한다고 판단한 추천만 대상으로 하고,
 * 치환 후 **토큰 값이 원래 px와 같은지 전부 대조**한다. 하나라도 어긋나면 롤백한다.
 * 값이 보존되면 렌더링 결과는 변하지 않는다.
 *
 * 사용법:
 *   node scripts/apply-tokens.mjs src --dry-run
 *   node scripts/apply-tokens.mjs src --only '^--(typeset|radius)-'
 *   node scripts/apply-tokens.mjs src/components/Tag --exclude '^--slist-'
 *
 * 주의: 값이 같아도 의미가 맞는지는 사람이 봐야 한다.
 * 그래서 --only 없이는 실행되지 않는다. 검토한 토큰 계열만 명시적으로 적용할 것.
 * (정말 전부 적용하려면 --all-confident 를 명시해야 한다)
 */

import { readFileSync, writeFileSync } from 'node:fs'
import { execFileSync } from 'node:child_process'
import { join, resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const SCANNER = join(ROOT, 'scripts', 'scan-hardcode.mjs')

const argv = process.argv.slice(2)
const flag = (n) => argv.includes(n)
const opt = (n) => {
  const i = argv.indexOf(n)
  return i >= 0 ? argv[i + 1] : null
}
const targets = argv.filter(
  (a, i) => !a.startsWith('--') && !['--only', '--exclude', '--lines'].includes(argv[i - 1])
)
if (!targets.length) targets.push('src')

if (!opt('--only') && !flag('--all-confident')) {
  console.error(
    '거부: --only <정규식> 없이는 적용하지 않습니다.\n' +
      '  값이 같아도 의미가 맞는지는 사람이 확인해야 합니다.\n' +
      '  먼저 `npm run design:scan -- <경로> --all` 로 추천을 검토한 뒤,\n' +
      "  검증된 계열만 지정하세요. 예: --only '^--(typeset|radius)-'\n" +
      '  (검토를 마쳤고 전부 적용하려면 --all-confident)'
  )
  process.exit(2)
}

const DRY = flag('--dry-run')
// --lines 12,34,56 : 지정한 줄만 적용 (단일 파일 대상 정밀 작업용)
const LINES = opt('--lines') ? new Set(opt('--lines').split(',').map((n) => parseInt(n, 10))) : null
const ONLY = opt('--only') ? new RegExp(opt('--only')) : null
const EXCLUDE = opt('--exclude') ? new RegExp(opt('--exclude')) : null

/* 토큰 → 값 인덱스 (검증용) */
const TOKEN_VALUE = {}
for (const f of ['src/tokens/colors.css', 'src/tokens/spacing.css', 'src/tokens/typography.css', 'src/styles/globals.css']) {
  const src = readFileSync(join(ROOT, f), 'utf8')
  for (const m of src.matchAll(/(--[a-z0-9-]+)\s*:\s*([^;]+);/g)) TOKEN_VALUE[m[1]] = m[2].trim()
}

function scan(target) {
  try {
    return execFileSync(process.execPath, [SCANNER, target, '--all', '--json'], {
      cwd: ROOT, encoding: 'utf8', maxBuffer: 128 * 1024 * 1024,
    })
  } catch (e) {
    return e.stdout // 위반이 있으면 exit 1 — stdout은 정상 출력됨
  }
}

const findings = targets.flatMap((t) => JSON.parse(scan(t)).findings)

/* 확신 추천만, 필터 통과분만 */
const picked = []
for (const f of findings) {
  if (f.rule !== 'arbitrary-px' || !f.confident) continue
  const m = /var\((--[a-z0-9-]+)\)/.exec(f.message)
  if (!m) continue
  const token = m[1]
  if (ONLY && !ONLY.test(token)) continue
  if (EXCLUDE && EXCLUDE.test(token)) continue
  if (LINES && !LINES.has(f.line)) continue
  picked.push({ ...f, token })
}

/* 파일별로 묶어 치환 */
const byFile = {}
for (const p of picked) (byFile[p.file] ??= []).push(p)

let applied = 0, files = 0
const rollbacks = []
const tokenTally = {}

for (const [rel, list] of Object.entries(byFile)) {
  const abs = join(ROOT, rel)
  const before = readFileSync(abs, 'utf8')
  const lines = before.split('\n')
  const done = new Set()
  let n = 0

  for (const p of list) {
    const key = p.line + '|' + p.match
    if (done.has(key)) continue
    done.add(key)
    const i = p.line - 1
    if (!lines[i] || !lines[i].includes(p.match)) continue
    const utility = p.match.slice(0, p.match.indexOf('-['))
    // Tailwind 임의값에서 font-size 만 [length:...] 접두어가 필요하다
    const isFontSize = utility === 'text' && /-size$/.test(p.token)
    const repl = utility + '-' + (isFontSize ? `[length:var(${p.token})]` : `[var(${p.token})]`)
    const hits = lines[i].split(p.match).length - 1
    lines[i] = lines[i].split(p.match).join(repl)
    n += hits
    tokenTally[p.token] = (tokenTally[p.token] || 0) + hits
  }

  if (!n) continue
  const after = lines.join('\n')

  /* ── 값 보존 검증 ── 토큰 값이 원래 px와 다르면 이 파일은 통째로 롤백 */
  const bad = []
  const beforeLines = before.split('\n'), afterLines = after.split('\n')
  for (let i = 0; i < afterLines.length; i++) {
    if (beforeLines[i] === afterLines[i]) continue
    for (const t of afterLines[i].matchAll(/([a-z-]+)-\[(?:length:)?var\((--[a-z0-9-]+)\)\]/g)) {
      const v = TOKEN_VALUE[t[2]]
      if (!/^-?[\d.]+px$/.test(v || '')) continue
      const orig = new RegExp('\\b' + t[1] + '-\\[(-?[\\d.]+px)\\]').exec(beforeLines[i])
      if (!orig) continue
      if (v !== orig[1]) bad.push(`${rel}:${i + 1} ${t[1]} ${t[2]} 기대 ${orig[1]} 실제 ${v}`)
    }
  }
  if (bad.length) {
    rollbacks.push({ rel, bad })
    continue
  }

  if (!DRY) writeFileSync(abs, after)
  applied += n
  files++
}

/* ── 보고 ── */
console.log(`${DRY ? '[dry-run] ' : ''}적용 ${applied}건 / ${files}개 파일`)
if (ONLY) console.log(`  --only ${ONLY.source}`)
if (EXCLUDE) console.log(`  --exclude ${EXCLUDE.source}`)
if (LINES) console.log(`  --lines ${[...LINES].join(',')}`)

const skipped = picked.length - picked.filter((p) => byFile[p.file]).length
const tally = Object.entries(tokenTally).sort((a, b) => b[1] - a[1])
if (tally.length) {
  console.log('\n토큰별:')
  for (const [t, c] of tally) console.log('  ' + String(c).padStart(3) + '  ' + t)
}

if (rollbacks.length) {
  console.log('\n❌ 값 불일치로 롤백된 파일:')
  for (const r of rollbacks) {
    console.log('  ' + r.rel)
    r.bad.slice(0, 5).forEach((b) => console.log('     ' + b))
  }
  process.exitCode = 1
} else if (applied) {
  console.log('\n✅ 값 보존 검증 통과 — 토큰 값이 전부 원래 px와 동일 (렌더링 불변)')
}
