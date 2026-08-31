---
description: 디자인 토큰 하드코딩을 스캔하고 수정한다 (기본: 신규 위반만)
argument-hint: [경로] [--all]
allowed-tools: Bash, Read, Edit, Grep, Glob
---

디자인 토큰 정합성을 검사하고 고쳐라.

대상: $1
(비어 있으면 `src` 전체)

## 1단계 — 스캔

```bash
node scripts/scan-hardcode.mjs ${1:-src} --baseline
```

`$2`가 `--all`이면 `--baseline`을 빼고 기존 부채까지 전부 본다.

## 2단계 — design-reviewer 에이전트에게 위임

스캔 결과가 5건을 넘으면 `design-reviewer` 서브에이전트를 호출해 수정을 맡겨라.
5건 이하면 직접 고쳐라.

## 3단계 — 검증

```bash
node scripts/scan-hardcode.mjs ${1:-src} --baseline
npm run typecheck
```

둘 다 통과해야 완료다.

## 규칙

- "대응 토큰 없음" 항목은 고치지 말고 사용자에게 물어라. 없는 토큰을 지어내면 Figma와 코드가 조용히 어긋난다.
- 기준선(`--write-baseline`)은 사용자 승인 없이 갱신하지 마라.
