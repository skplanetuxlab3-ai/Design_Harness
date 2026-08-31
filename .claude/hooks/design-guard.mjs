#!/usr/bin/env node
/**
 * design-guard — PostToolUse 훅
 *
 * Claude가 파일을 수정할 때마다 그 파일만 스캔해서, 기준선에 없는 *신규* 하드코딩이
 * 들어오면 exit 2로 차단한다. stderr 내용이 Claude에게 그대로 전달되어 스스로 고친다.
 *
 * 이것이 "토큰 하드코딩 0건"을 문서상 약속이 아니라 실제 보장으로 만드는 지점이다.
 * LLM 판단은 새지만, 이 스크립트는 안 샌다.
 *
 * 등록: .claude/settings.json 의 hooks.PostToolUse
 */

import { spawnSync } from 'node:child_process'
import { existsSync } from 'node:fs'
import { join, resolve, dirname, relative, isAbsolute } from 'node:path'
import { fileURLToPath } from 'node:url'

const HOOK_DIR = dirname(fileURLToPath(import.meta.url))
const ROOT = resolve(HOOK_DIR, '..', '..')
const SCANNER = join(ROOT, 'scripts', 'scan-hardcode.mjs')

import { readFileSync } from 'node:fs'

let payload = {}
try {
  payload = JSON.parse(readFileSync(0, 'utf8') || '{}')
} catch {
  payload = {}
}

const filePath = payload?.tool_input?.file_path
if (!filePath) process.exit(0)

const abs = isAbsolute(filePath) ? filePath : resolve(payload.cwd || ROOT, filePath)
const rel = relative(ROOT, abs)

// 이 프로젝트 src/ 안의 ts/tsx만 검사
if (rel.startsWith('..') || !/^src[\\/].*\.tsx?$/.test(rel)) process.exit(0)
if (!existsSync(abs) || !existsSync(SCANNER)) process.exit(0)

const res = spawnSync(process.execPath, [SCANNER, rel, '--baseline', '--json'], {
  cwd: ROOT,
  encoding: 'utf8',
  maxBuffer: 32 * 1024 * 1024,
})

if (res.error || !res.stdout) process.exit(0)

let findings = []
try {
  findings = JSON.parse(res.stdout).findings || []
} catch {
  process.exit(0)
}

// info는 차단하지 않는다 — 소음이 되면 훅을 꺼버리게 된다
const blocking = findings.filter((f) => f.severity === 'error' || f.severity === 'warn')
if (!blocking.length) process.exit(0)

const lines = [
  `[design-guard] ${rel} 에 신규 디자인 토큰 위반 ${blocking.length}건이 있습니다. 수정 후 진행하세요.`,
  '',
]
for (const f of blocking.slice(0, 20)) {
  lines.push(`  ${rel}:${f.line}  ${f.severity.toUpperCase()}  ${f.match}   [${f.rule}]`)
  lines.push(`    → ${f.message}`)
  lines.push(`    ${f.ref}`)
}
if (blocking.length > 20) lines.push(`  ... 외 ${blocking.length - 20}건`)
lines.push('')
lines.push('전체 확인: npm run design:scan -- --baseline')
lines.push('의도된 예외라면 사용자에게 확인받고 npm run design:baseline 으로 기준선을 갱신하세요.')

process.stderr.write(lines.join('\n') + '\n')
process.exit(2) // 2 = blocking. stderr가 Claude에게 전달된다.
