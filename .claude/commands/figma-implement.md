---
description: Figma 디자인을 이 레포의 컴포넌트로 구현한다 (토큰 매핑 + 런타임 검증 포함)
argument-hint: <Figma URL>
allowed-tools: Bash, Read, Edit, Write, Grep, Glob, Skill, Agent
---

Figma 디자인을 구현하라.

대상: $1

## 순서

1. `figma-design-to-code` 스킬을 먼저 로드한다 (필수).
2. `figma-implementer` 서브에이전트에게 위임한다.
3. 에이전트 보고를 받으면 아래를 직접 확인한다.

```bash
npm run design:scan -- --baseline
npx tsc --noEmit
```

## 확인할 것

- 기존 컴포넌트를 재사용했는가, 아니면 중복을 만들었는가
- **새 variant/타입을 만들었다면**, Figma variant 세트를 조회해 이미 있는 건 아닌지 확인했는가
  (보고에 "variant" 항목이 없으면 다시 시키라 — `Seen` vs `Primary` 중복 사고가 여기서 났다)
- MCP 에셋 URL이 코드에 남아 있지 않은가 (`grep -r "api/mcp/asset" src`)
- **런타임 측정 결과가 보고에 있는가** — 없으면 다시 시키라. 눈으로 본 건 검증이 아니다.
- 대응 토큰이 없던 값이 있으면 사용자에게 보고 (디자인 시스템의 구멍이다)
