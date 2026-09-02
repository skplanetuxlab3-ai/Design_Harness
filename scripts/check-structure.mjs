#!/usr/bin/env node
/**
 * check-structure — CLAUDE.md §2 준수 검사
 *
 * 재사용 컴포넌트 (src/components/) — 4파일
 *   {Name}/
 *   ├── {Name}.tsx
 *   ├── {Name}.types.ts
 *   ├── {Name}.stories.tsx
 *   └── index.ts
 *
 * 화면 (src/templates/) — 2파일
 *   {Name}/
 *   ├── {Name}.tsx
 *   └── index.ts
 *
 * 종전에는 화면도 components/ 에 두고 EXEMPT 이름 목록으로 걸렀다.
 * 목록이 4 → 10 개로 늘면서, 화면을 하나 추가할 때마다 이 스크립트를
 * 고쳐야 했다. 분류를 이름 목록이 아니라 디렉터리가 지게 바꿨다.
 * (2026-09-02)
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

/** 종류별로 요구하는 파일이 다르다 */
const KINDS = [
  {
    label: '컴포넌트',
    dir: join(ROOT, 'src', 'components'),
    required: (n) => ({ tsx: `${n}.tsx`, types: `${n}.types.ts`, stories: `${n}.stories.tsx`, index: 'index.ts' }),
  },
  {
    label: '화면',
    dir: join(ROOT, 'src', 'templates'),
    required: (n) => ({ tsx: `${n}.tsx`, index: 'index.ts' }),
  },
]

const C = {
  red: (s) => `\x1b[31m${s}\x1b[0m`,
  gray: (s) => `\x1b[90m${s}\x1b[0m`,
  green: (s) => `\x1b[32m${s}\x1b[0m`,
  cyan: (s) => `\x1b[36m${s}\x1b[0m`,
  bold: (s) => `\x1b[1m${s}\x1b[0m`,
}

const groups = []
for (const kind of KINDS) {
  if (!existsSync(kind.dir)) continue
  const items = []
  for (const name of readdirSync(kind.dir).sort()) {
    const dir = join(kind.dir, name)
    if (!statSync(dir).isDirectory()) continue
    const files = kind.required(name)
    const missing = Object.entries(files)
      .filter(([, f]) => !existsSync(join(dir, f)))
      .map(([k]) => k)
    items.push({ name, missing })
  }
  groups.push({ label: kind.label, items })
}

const violations = groups.flatMap((g) => g.items.filter((i) => i.missing.length).map((i) => ({ ...i, kind: g.label })))

if (process.argv.includes('--json')) {
  console.log(JSON.stringify({ groups, violations }, null, 2))
} else {
  for (const g of groups) {
    const ok = g.items.filter((i) => !i.missing.length).length
    console.log(`${C.bold(g.label)} ${g.items.length}개 — 완비 ${ok} / 위반 ${g.items.length - ok}`)
  }
  console.log('')
  if (violations.length) {
    console.log(C.red('✗ §2 위반'))
    for (const v of violations) console.log(`  ${C.cyan(v.name)} ${C.gray('(' + v.kind + ')')}  누락: ${v.missing.join(', ')}`)
    console.log('')
  } else {
    console.log(C.green('✓ 구조 검사 통과'))
  }
}

process.exitCode = violations.length ? 1 : 0
