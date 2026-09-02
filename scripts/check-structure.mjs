#!/usr/bin/env node
/**
 * check-structure — CLAUDE.md §2 (1컴포넌트 = 4파일) 준수 검사
 *
 *   {ComponentName}/
 *   ├── {ComponentName}.tsx
 *   ├── {ComponentName}.types.ts
 *   ├── {ComponentName}.stories.tsx
 *   └── index.ts
 *
 * 화면 조합 컴포넌트(*Home 등)는 재사용 대상이 아니라 규칙 적용이 애매하다.
 * EXEMPT 에 명시하면 검사에서 제외하되, 그 사실을 보고에 남긴다 —
 * 조용히 빠지는 예외는 부채가 된다.
 *
 * 사용법:
 *   node scripts/check-structure.mjs          # 표로 출력
 *   node scripts/check-structure.mjs --json
 *
 * 종료 코드: 0 = 통과, 1 = 위반
 */

import { readdirSync, existsSync, statSync } from 'node:fs'
import { join, resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const DIR = join(ROOT, 'src', 'components')

/** 화면 조합 — 재사용 컴포넌트가 아니므로 types/index 를 요구하지 않는다 */
const EXEMPT = new Set(['ShoppingHome', 'GroupbuyingHome', 'TodayDealHome', 'EcouponHome', 'JeoklipHome', 'SearchHome', 'SearchTyping', 'SearchResults', 'ShoppingBridge'])

const C = {
  red: (s) => `\x1b[31m${s}\x1b[0m`,
  yellow: (s) => `\x1b[33m${s}\x1b[0m`,
  gray: (s) => `\x1b[90m${s}\x1b[0m`,
  green: (s) => `\x1b[32m${s}\x1b[0m`,
  cyan: (s) => `\x1b[36m${s}\x1b[0m`,
}

const results = []
for (const name of readdirSync(DIR).sort()) {
  const dir = join(DIR, name)
  if (!statSync(dir).isDirectory()) continue

  const files = {
    tsx: `${name}.tsx`,
    types: `${name}.types.ts`,
    stories: `${name}.stories.tsx`,
    index: 'index.ts',
  }
  const missing = Object.entries(files)
    .filter(([, f]) => !existsSync(join(dir, f)))
    .map(([k]) => k)

  results.push({ name, missing, exempt: EXEMPT.has(name) })
}

const violations = results.filter((r) => r.missing.length && !r.exempt)
const exempted = results.filter((r) => r.exempt && r.missing.length)
const ok = results.filter((r) => !r.missing.length)

if (process.argv.includes('--json')) {
  console.log(JSON.stringify({ violations, exempted, okCount: ok.length }, null, 2))
} else {
  console.log(`컴포넌트 ${results.length}개 — 완비 ${ok.length} / 위반 ${violations.length} / 예외 ${exempted.length}\n`)
  if (violations.length) {
    console.log(C.red('✗ §2 위반'))
    for (const v of violations) {
      console.log(`  ${C.cyan(v.name)}  누락: ${v.missing.join(', ')}`)
    }
    console.log('')
  }
  if (exempted.length) {
    console.log(C.gray('예외 (화면 조합 — EXEMPT 등록됨)'))
    for (const e of exempted) console.log(C.gray(`  ${e.name}  누락: ${e.missing.join(', ')}`))
    console.log('')
  }
  if (!violations.length) console.log(C.green('✓ 구조 검사 통과'))
}

process.exitCode = violations.length ? 1 : 0
