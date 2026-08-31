#!/usr/bin/env node
/**
 * design-qa — 디자인 시스템 품질 검사 전체 실행
 *
 * 각 검사를 **끝까지 다 돌린다.** 하나 실패했다고 멈추면 전체 그림을 못 본다.
 * (`&&` 체이닝을 쓰지 않는 이유)
 *
 * 사용법:  npm run design:qa  [--skip-storybook]
 * 종료 코드: 0 = 전부 통과, 1 = 하나라도 실패
 */

import { spawnSync } from 'node:child_process'
import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const skipSB = process.argv.includes('--skip-storybook')

const C = {
  red: (s) => `\x1b[31m${s}\x1b[0m`,
  green: (s) => `\x1b[32m${s}\x1b[0m`,
  gray: (s) => `\x1b[90m${s}\x1b[0m`,
  bold: (s) => `\x1b[1m${s}\x1b[0m`,
  cyan: (s) => `\x1b[36m${s}\x1b[0m`,
}

const CHECKS = [
  { name: '타입 + 빌드', cmd: 'npm', args: ['run', 'build'], why: 'tsc -b 는 미사용 변수까지 잡는다 (tsc --noEmit 보다 엄격)' },
  { name: '디자인 토큰', cmd: process.execPath, args: ['scripts/scan-hardcode.mjs', 'src', '--baseline'], why: '기준선 대비 신규 하드코딩·토큰 위반·접근성(§6)' },
  { name: '컴포넌트 구조', cmd: process.execPath, args: ['scripts/check-structure.mjs'], why: 'CLAUDE.md §2 — 1컴포넌트 = 4파일' },
]
if (!skipSB) {
  CHECKS.push({ name: 'Storybook 빌드', cmd: 'npm', args: ['run', 'build-storybook'], why: '96개 스토리가 실제로 컴파일되는지' })
}

const results = []
for (const c of CHECKS) {
  process.stdout.write(`${C.gray('▸')} ${c.name} …`)
  const t0 = Date.now()
  const r = spawnSync(c.cmd, c.args, { cwd: ROOT, encoding: 'utf8', maxBuffer: 64 * 1024 * 1024 })
  const ms = Date.now() - t0
  const ok = r.status === 0
  process.stdout.write(`\r${ok ? C.green('✓') : C.red('✗')} ${c.name} ${C.gray(`(${(ms / 1000).toFixed(1)}s)`)}\n`)
  results.push({ ...c, ok, out: ((r.stdout || '') + (r.stderr || '')).trim() })
}

const failed = results.filter((r) => !r.ok)

console.log('')
if (!failed.length) {
  console.log(C.green(C.bold('✓ design-qa 전체 통과')))
  console.log(C.gray(`  ${results.map((r) => r.name).join(' · ')}`))
} else {
  console.log(C.red(C.bold(`✗ ${failed.length}/${results.length} 실패`)))
  for (const f of failed) {
    console.log(`\n${C.cyan('── ' + f.name)}  ${C.gray(f.why)}`)
    // 마지막 40줄만 — 빌드 로그 전체는 소음이다
    const lines = f.out.split('\n').filter((l) => l.trim())
    console.log(lines.slice(-40).map((l) => '   ' + l).join('\n'))
  }
}

process.exitCode = failed.length ? 1 : 0
