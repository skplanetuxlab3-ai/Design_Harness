---
description: 디자인 시스템 전체 품질 검사 (빌드·타입·토큰·구조·Storybook)
argument-hint: [--skip-storybook]
allowed-tools: Bash, Read, Edit, Grep, Glob, Agent
---

전체 품질 검사를 실행하라.

```bash
npm run design:qa $1
```

실패가 있으면 `design-qa` 서브에이전트에게 넘겨 분류·수정을 맡긴다.

## 확인할 것

- **미사용 변수를 그냥 지우지 않았는가** — 구현이 빠진 것일 수 있다
  (`SocialDealCard.badgeType` 이 실제로 그랬다)
- 기준선을 임의로 갱신하지 않았는가 (`design:baseline` 은 승인 사항)
- UI 를 바꿨다면 Storybook 에서 실제로 확인했는가 — 정적 검사만으로는 부족하다
