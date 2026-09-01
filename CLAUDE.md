# Design System Harness — 프로젝트 규칙

## 기술 스택
- React 18 + TypeScript 5
- Tailwind CSS v4 (`@import "tailwindcss"` 방식)
- Storybook 8
- Vite 5

## 빌드 명령어

```bash
npm run dev          # 개발 서버
npm run build        # 프로덕션 빌드
npm run typecheck    # 타입 검사
npm run storybook    # Storybook 실행 (포트 6006)
npm run build-storybook  # Storybook 정적 빌드
npm run lint         # ESLint 검사
```

---

## 1. 디자인 토큰 사용 규칙

### 필수
- 모든 색상은 반드시 CSS 변수로 참조: `var(--color-*)`, `var(--radius-*)`, `var(--spacing-*)`
- Tailwind 클래스는 `text-[var(--color-primary)]` 형태로 사용
- 시맨틱 토큰 우선 사용: `--color-primary`, `--color-surface`, `--color-text-*`

### 하드코딩 절대 금지
```
❌ color: #3B82F6
❌ background: rgb(59, 130, 246)
❌ className="text-blue-500"     ← Tailwind 리터럴 색상 금지
❌ style={{ color: 'blue' }}
❌ border-radius: 8px            ← 반드시 var(--radius-*) 사용
❌ padding: 16px                 ← 반드시 var(--spacing-*) 사용
```

```
✅ color: var(--color-primary)
✅ className="text-[var(--color-primary)]"
✅ style={{ color: 'var(--color-surface)' }}
✅ border-radius: var(--radius-md)
```

---

## 2. 컴포넌트 구조 규칙 (1컴포넌트 = 4파일)

```
src/components/{ComponentName}/
├── {ComponentName}.tsx          # 컴포넌트 구현
├── {ComponentName}.types.ts     # Props 타입 정의
├── {ComponentName}.stories.tsx  # Storybook Stories
└── index.ts                     # re-export
```

### 파일별 책임
- `.tsx`: JSX + 로직만. CSS-in-JS나 인라인 스타일 최소화
- `.types.ts`: Props 인터페이스, 유니온 타입만. 로직 없음
- `.stories.tsx`: 각 variant마다 Story 1개 이상 필수
- `index.ts`: `export { default } from './ComponentName'` 형태

### 네이밍
- 컴포넌트: PascalCase (`Button`, `InputField`)
- Props 타입: `{ComponentName}Props` (`ButtonProps`)
- Stories: `{ComponentName}Stories` export name

---

## 3. Figma 충실도 규칙

### 원칙: Figma는 단일 진실 공급원(Single Source of Truth)
- Figma 레이어의 텍스트는 **그대로** 유지 (번역, 축약, 의미 변경 금지)
- Figma에 없는 내용을 코드에 추가하지 않음
- Figma의 spacing, sizing 값을 가장 가까운 토큰으로 매핑 (임의 값 금지)

### 금지사항
```
❌ Figma 텍스트 "로그인하기" → "Login" 으로 변경
❌ Figma에 없는 hover 애니메이션 임의 추가
❌ Figma에 없는 컴포넌트 variant 생성
❌ Figma 레이아웃과 다른 구조로 마크업 작성
❌ 디자이너 승인 없이 Figma 값 "개선"
```

### 허용
```
✅ Figma 값 8px → var(--spacing-2) 매핑 (토큰 기반 대응)
✅ Figma 컴포넌트 description 기반 접근성 속성 추가 (aria-*)
✅ 반응형 breakpoint 추가 (Figma에 명시된 경우만)
```

---

## 4. 컴포넌트 너비 규칙

### 원칙: 고정 px 너비 금지
```
❌ width: 320px
❌ className="w-80"          ← 고정 너비 Tailwind 클래스
❌ max-width: 480px          ← 디자인 컨텍스트 밖에서 임의 지정
```

```
✅ className="w-full"        ← 기본값
✅ 부모 컨테이너가 padding으로 너비 제어
✅ max-width는 레이아웃 컨테이너에서만 지정
```

컴포넌트 자체는 `w-full`이 기본. 너비는 **사용하는 쪽(부모)**이 결정.

---

## 5. 규칙 강제 (Enforcement)

**이 문서의 규칙은 부탁이 아니라 강제된다.** 아래 스캐너가 §1·§3·§4를 결정론적으로 검사한다.

```bash
npm run design:scan                  # src 전체 스캔
npm run design:scan -- --baseline    # 신규 위반만 (일상 작업용)
npm run design:scan -- src/components/Chip --all   # 경로 지정 + info 포함
npm run design:baseline              # 기준선 갱신 (⚠ 사용자 승인 필요)
npm run design:ci                    # CI용 — warn도 실패 처리
npm run design:apply -- <경로> --only '<정규식>'   # 확신 추천을 실제로 치환 (--dry-run 지원)
npm run design:assets                # 만료된 Figma 에셋 전수 조사 (--md / --json)
npm run design:structure             # §2 4파일 규칙 검사
npm run design:drift                 # Figma 변수 ↔ 레포 토큰 값 대조
npm run design:qa                    # 전체 품질 검사 (아래 참조)
npm run storybook                    # Storybook 개발 서버 (포트 6006)
npm run build-storybook              # Storybook 정적 빌드
```

### design:qa — 품질 게이트

```bash
npm run design:qa [-- --skip-storybook]
```

4개 검사를 **하나 실패해도 끝까지** 돌린다 (`&&` 체이닝을 안 쓰는 이유 — 전체 그림이 필요하다).

| 검사 | 무엇을 |
|---|---|
| 타입 + 빌드 | `tsc -b` + `vite build`. `tsc --noEmit` 보다 엄격 — 미사용 변수를 잡는다 |
| 디자인 토큰 | 기준선 대비 신규 위반 + 접근성(§6) |
| 컴포넌트 구조 | §2 — 1컴포넌트 = 4파일 |
| 토큰 드리프트 | Figma 변수 스냅샷과 레포 토큰 값 대조 |
| Storybook 빌드 | 96개 스토리가 실제로 컴파일되는지 |

**§2 예외**: `*Home` 화면 조합 4개는 재사용 컴포넌트가 아니라
`scripts/check-structure.mjs` 의 `EXEMPT` 에 등록돼 있다. 조용히 빠지지 않고 보고서에 표시된다.

`design:apply`는 **`--only` 없이는 실행을 거부한다.** 값이 같아도 의미가 맞는지는 사람이 봐야 하기 때문이다.
치환 후 토큰 값이 원래 px와 같은지 전부 대조하고, 하나라도 어긋나면 그 파일을 통째로 롤백한다.
`--lines 12,34` 로 특정 줄만 정밀 적용할 수 있다.

### 검사 규칙

| 규칙 | 심각도 | 근거 |
|------|--------|------|
| `raw-hex-color` — hex 리터럴 | error | §1 |
| `raw-color-function` — rgb()/hsl() 리터럴 | error | §1 |
| `tailwind-literal-color` — `text-blue-500` 류 | error | §1 |
| `expiring-figma-asset` — Figma MCP 임시 URL | error | §3 |
| `a11y-img-no-alt` — alt 없는 `<img>` | error | §6 |
| `a11y-focus-removed` — `outline-none` (focus-visible 없이) | error | §6 |
| `fixed-px-width` — `w-[320px]` 류 | error | §4 |
| `arbitrary-px` — `px-[10px]`, `text-[14px]` 류 | warn | §1 |
| `inline-style-px` — 인라인 스타일 px 리터럴 | warn | §1 |
| `tailwind-numeric-scale` — `h-8`, `px-4` 류 | info | §1 |

`.stories.tsx`는 데모 데이터이므로 한 단계 낮춰 적용한다.

### 기준선(baseline)

`scripts/design-baseline.json`에 **기존 부채 324건**이 기록되어 있다.
`--baseline` 플래그는 이 목록을 무시하고 **신규 위반만** 보고한다.
부채를 갚으면서 기준선을 줄여나가는 래칫(ratchet) 구조다.

기준선을 갱신하면 갚지 않은 부채가 그냥 사라진다. **사용자 승인 없이 `design:baseline`을 실행하지 마라.**

> 참고: 여러 명이 동시에 부채를 갚으면 이 파일이 충돌한다. 그때는 머지하지 말고 재생성해야 한다.
> 다만 **현재는 단독 작업 중이라 이 이슈는 유예 상태다** (2026-08-31). 협업 시작 시 다시 볼 것.

### 토큰 드리프트 검사 — Figma 가 바뀌었는데 코드가 안 따라간 경우

`src/tokens/*.css` 헤더에 "Generated: auto" 라고 적혀 있지만 **생성기는 없다.**
만들 수도 없다 — `get_variable_defs` 는 **노드가 쓰는 변수만** 돌려주므로 전체 컬렉션을
한 번에 못 받고, 지금 토큰 파일에는 손으로 쓴 레이어 구조·섹션 주석·한글 설명이 들어 있어
통째로 덮어쓰면 그게 다 날아간다.

그래서 재생성 대신 **검사**한다. 값이 어긋난 것만 잡고, 고치는 건 사람이 판단한다.

```bash
npm run design:drift
```

**스냅샷은 에이전트가 채운다.** 스크립트는 MCP 를 호출할 수 없으므로,
Figma 작업을 할 때 `get_variable_defs` 결과를 `scripts/figma-vars/<이름>.json` 에 저장한다.

```json
{ "_source": "... 노드 ID", "_captured": "2026-08-31",
  "color/black/black200": "#626262", "radius/radius050": "4" }
```

이름 대응은 세 단계로 푼다:
1. `scripts/figma-token-map.json` 예외표 — 이름과 값이 어긋나는 것들
   (`products/radius/radius06` → `--products-radius-8`, `products/spacing08` → `--products-spacing-10`)
2. **토큰 CSS 주석에 적힌 Figma 경로** — 315개가 이미 박혀 있어 이게 주 매핑 소스다.
   앞으로 토큰을 추가할 때도 `/* color/black/black200 */` 형태로 경로를 남길 것.
3. 규칙 유추 — `a/b/c` → `--a-b-c`, `typeset_{step}_{weight}/{prop}` → `--typeset-{step}-{prop}`
   (레포는 weight 를 접어서 bold·regular 가 같은 size 토큰을 공유한다)

### 토큰 소스 건강 검사 (스캔 전 선행)

스캐너는 CSS를 정규식으로 읽는다. 그래서 **브라우저가 실제로는 무시하는 선언까지
“존재하는 토큰”으로 인덱싱할 수 있다.** 실제로 그런 토큰이 11개 있었다.

- **주석 조기 종료** — 주석 텍스트 안에 닫기 시퀀스가 들어가면 주석이 거기서 끝나고,
  뒤따르는 선언이 통째로 사라진다. `typography.css` 6줄, `spacing.css` 1줄이 이 문제였다.
- **오타 참조** — `var(--products-spacing40)` (정답: `--products-spacing-40`).
  참조가 해석되지 않으면 선언 전체가 버려진다. 5건 있었다.

두 검사 모두 스캔보다 **먼저** 돌고, 걸리면 스캔을 중단한다.
파일에는 보이는데 런타임에는 없는 토큰을 참조한 코드는 조용히 깨지기 때문이다.

⚠️ **파일에 있다 = 런타임에 있다가 아니다.** 토큰을 추가한 뒤에는 반드시
브라우저에서 `getComputedStyle(document.documentElement).getPropertyValue('--토큰')`으로 확인할 것.

### 추천 신뢰도 — 값만 맞는 토큰을 조심하라

스캐너는 px 값이 같은 토큰을 찾아주지만, **값이 같다고 의미가 같지 않다.**
`pt-[9px]`에 `--product-deal-items-pb`(padding-**bottom**)를 꽂으면 Figma와 코드가 조용히 어긋난다.

그래서 추천은 두 조건을 모두 만족할 때만 "확신"으로 표시된다.

1. **네임스페이스** — 파일이 속한 컴포넌트의 토큰 계열인가 (`ProductCard` → `--product-*`, `--plist-*`)
   `--typeset-*`, `--radius-*`, `--spacing-*`는 전역이므로 항상 통과.
   매핑은 `scripts/component-token-map.json`에서 조정한다.
2. **축(axis)** — 속성 방향이 맞는가 (`pt-` → `-pt`, `px-` → `-px`, `gap-` → `-gap`)
3. **형제 우선** — 같은 줄에 이미 쓰인 토큰 가족을 먼저 고른다.
   한 요소의 `pt`/`pb`/`px`가 서로 다른 가족에서 오면 안 된다.
4. **typeset 짝 맞추기** — `text-`와 `leading-`은 한 쌍으로 푼다.
   lh 값은 16/20/24/28px에서 두세 계열과 겹쳐서(xs·sm 둘 다 16px), 따로 풀면
   `--typeset-sm-size` + `--typeset-xs-lh` 같은 잡종이 나온다.
   맞는 스텝이 없으면 “typeset 스케일에 없음”으로 보고하고 억지로 붙이지 않는다.

`scripts/component-token-map.json`이 컴포넌트별 소유 네임스페이스를 정한다.
**소유하지 않은 계열을 넣으면 안 된다** — 값만 맞는 추천이 “확신”으로 승격되어 자동 치환된다.
페이지 조합 컴포넌트(`*Home`, `*Section`)는 대개 빈 배열이 정답이다.

둘 다 맞으면 `[var(--token)] 로 교체`, 아니면 **`값만 일치 → 그대로 쓰지 말 것`**으로 경고한다.
후자는 자동 치환 금지. Figma 원본을 확인하고 토큰을 신설하거나 올바른 토큰을 찾아야 한다.

### 정적 분석의 한계 (검토 완료, 자동 적용 금지)

아래 13건은 스캐너가 “확신”으로 표시하지만 **코드를 읽고 의미가 틀리다고 판단한 것**들이다.
자동 적용하지 말 것. Figma 확인이 필요하다.

- `ProductCard.tsx` `gap-[2px]` ×8 — `--product-deal-items-gap`(2px)를 추천하지만,
  실제 위치는 기프티콘·아웃바운드 카드의 **본문 컬럼 간격**이지 딜 아이템이 아니다.
  2열(plist) 스케일에는 2px gap 토큰이 없다 (`--plist-price-gap`은 3px).
- `ProductCard.tsx` `gap-[4px]` ×4 — `--product-ranking-item-gap`을 추천하지만
  랭킹 카드가 아닌 곳(할인딜·핫딜·무비 카드의 스탯 행)이다.
- `ProductCard.stories.tsx` `gap-[8px]` ×1 — 그리드 거터이므로 `--plist-gutter`가 맞다.

→ **디자인 시스템에 실제로 빠져 있는 토큰**을 가리키는 신호다. 신설 여부는 디자이너가 결정한다.

### 훅이 놓치는 경로

훅은 Claude의 Edit/Write 도구에만 걸린다. **Bash로 파일을 쓰면 훅이 돌지 않는다.**
스크립트로 일괄 수정한 뒤에는 `npm run design:scan -- --baseline`을 직접 돌릴 것.

### 자동 차단 (hook)

`.claude/hooks/design-guard.mjs`가 `PostToolUse`로 등록되어 있다.
Claude가 `src/**/*.tsx`를 수정할 때마다 그 파일을 스캔하고, 기준선에 없는 신규 위반이 있으면
**exit 2로 차단**한다. 차단 메시지가 Claude에게 전달되어 스스로 고친다.

토큰 정합성은 LLM의 선의가 아니라 이 훅이 보장한다.

---

## 5-1. 에이전트 위임 규칙

| 작업 | 담당 | 상태 |
|------|------|------|
| 코드 하드코딩 스캔 + 수정 | `design-reviewer` | ✅ `.claude/agents/design-reviewer.md` |
| Figma URL → 코드 구현 | `figma-implementer` | ✅ `.claude/agents/figma-implementer.md` |
| 토큰 불일치 감지 + 수정 | `token-checker` | ⬜ 미구현 (design-reviewer + 스캐너가 대체) |
| 전체 품질 검사 (빌드/타입/구조/스토리) | `design-qa` | ✅ `.claude/agents/design-qa.md` |

호출 예시:
```
@design-reviewer src/components/Chip
@figma-implementer https://figma.com/design/xxx?node-id=17717-210498
@design-qa
/design-review src/components
/figma-implement https://figma.com/design/xxx?node-id=17717-210498
/design-qa
```

### 구현 검증은 정적 검사로 끝나지 않는다

`figma-implementer`가 강제하는 핵심 규칙이다. 스캐너는 소스 텍스트만 본다. 그래서 못 잡는 것:

1. **런타임에 없는 토큰** — CSS가 깨져 있으면 파일에는 보이는데 브라우저엔 없다 (실제 11개 있었다)
2. **값이 틀린 토큰** — 하드코딩이 아니라 스캐너를 통과한다.
   타이머 바 gap에 2px 토큰을 썼는데 Figma는 4px이었다. 화면상 차이를 눈으로 못 봤다.
3. **생성되지 않은 Tailwind 클래스** — 조용히 기본값으로 렌더된다

→ **브라우저에서 `getComputedStyle`을 재서 Figma 값과 숫자로 대조한다.** 눈으로 보는 건 검증이 아니다.

### Figma 파일 좌표 (탐색 없이 바로 가기)

| 파일 | key | 무엇이 있나 |
|---|---|---|
| OCB_쇼핑 | `cVMwduDVDz4PFtf0MyFJ0n` | 쇼핑 화면·컴포넌트 (아래 대부분이 여기) |
| OCB_PDS3.0 | `oufgQ0kAqcxm83eX0nfxNm` | 파운데이션 (네비·다이얼로그·버튼 아이콘) |

| 노드 | ID | 비고 |
|---|---|---|
| `❖ Components` 페이지 | `970:30245` | 쇼핑 컴포넌트 전체 (덤프 후 grep 권장) |
| `Elements / Badge` 세트 | `937:27083` | **배지 variant 6종** |
| `bottom_appbar` | `1472:11343` | 하단 네비 아이콘 5개 |
| `ico_okiclub` | `14176:77748` | OK캐시백 클럽 로고 |
| `Chip menu` | `16147:35048` | 이벤트 칩 6종 (라벨 포함) |
| `List / Item / Tag` | `2178:64993` | `icon / 10 / point` 포함 |
| DiscountDeal ver=02 | `18462:124398` | |
| HotDeal ver=02 | `18476:127323` | |
| DiscountDeal_Soldout ver=02 | `19665:336915` | |
| 타이머 Flag | `18562:125857` | |
| `❖ Blocks` (PDS) | `2022:226` | `ico / 24 / notification` = `2038:252` |
| `Elements / Tab` | `2220:97063` | **탭 variant 4종** (Type=Basic\|Icon × State=active\|inactive) |
| `Navigation bar` | `2474:116649` | Tab 인스턴스 4개 + Trailing BTN(`2474:116630`) |

⚠️ `쇼핑` 페이지(`1401:42907`)는 메타데이터가 너무 커서 `get_metadata` 가 실패한다.
컴포넌트 페이지 덤프를 grep 하는 쪽이 빠르다.

⚠️ 토큰 CSS 주석의 node ID(`20312-39339` 등)는 **어느 파일에서도 열리지 않는다.** 옛 좌표로 보인다.

### Badge — Figma variant 와 1:1

`Elements / Badge` (node 937:27083) 의 variant 이름을 **그대로** 쓴다. 임의로 이름을 짓지 마라.

| BadgeType | Figma variant | 기본 라벨 |
|---|---|---|
| `Timer` | Type=Timer | (시계 + `time`) |
| `New` | Type=New | New |
| `First` | Type=First | 첫구매 |
| `Ranking` | Type=Ranking | (`rank` 숫자) |
| `OkiClub` | Type=Okiclub | (로고 44×10 / 54×12) |
| `Primary` | Type=Primary | 내가 본 |

⚠️ **Figma variant 시트(937:27083)의 Timer·New 에 걸린 `opacity: 0.1`(10%)은 코드에 반영하지 않는다.**
시트에서만 흐리게 표시된 것으로, 실제 배지는 전 타입 100% 불투명이다.
`get_design_context` 가 `opacity-10` 클래스를 내주더라도 **무시할 것.** (2026-08-31 결정)

⚠️ 배지 안의 로고 `<img>`에는 **`shrink-0` 이 필수**다. preflight 의 `img{max-width:100%}` 가
너비가 확정되지 않은 컨테이너(feed 배지)에서 0으로 해석돼 로고가 사라진다.

### Tab — 탭은 하나다 (2026-09-01 결정)

`Elements / Tab`(`2220:97063`)이 **유일한** 탭 컴포넌트다. variant 는 4종뿐이고,
`Navigation bar`(`2474:116649`)는 이 컴포넌트의 인스턴스 4개 + Trailing BTN 으로 조립된다.
Trailing BTN(`2474:116630`)도 별도 컴포넌트가 아니라 **Tab 의 Type=Icon 인스턴스**다.

그래서 `TopNavBar` 는 탭을 자체 구현하지 않고 `<Tab>` 을 렌더한다.

⚠️ **활성 인디케이터 점은 흰색(#ffffff)이다.** `TopNavBar` 가 갖고 있던 인라인 `ActiveDot` 은
`--color-brand-ocb-pink` 를 썼지만 **Figma 에 그런 variant 는 없다** — 렌더 PNG 픽셀을 재서 확인했다
(ActiveDot `2474:69982`, 3×3, `#ffffff`). 핑크는 드리프트였고 제거했다.
OCB 핑크가 쓰이는 곳은 `Alert` 배지(8×8)와 `SubLabel` 뿐이다.

### CheckoutPanel — 2026-05 개편 (Figma 결제화면 섹션 4972:30276)

Order 는 세 조각의 합성이다. **마스터 컴포넌트**를 소스로 삼되, 화면 인스턴스가 덮어쓰는 값이 많다.

| 조각 | 마스터 node |
|---|---|
| Order info | `9689:46435` |
| Order Settings | `9689:46512` |
| Order / CTA | `9689:48364` |

⚠️ **마스터 기본값만 보고 구현하면 틀린다.** SP05_9(`15483:143817`)를 대조했더니
부족 경고가 "포인트 부족"이 아니라 **"1,000P 부족"**(금액), 배너가 캐쉬백이 아니라
**"포인트로만 구매 가능한 상품입니다"**, 자동충전 표시·수량 컨트롤·약관이 없고,
CTA 순서가 **교환 → 충전** 이었다. 그래서 아래를 전부 prop 으로 열어뒀다.

`bannerType`(cashback/pointOnly/none) · `pointShortage` · `showQuantity` ·
`showRetryPayment` · `showAgreement` · `pointAutoCharge`

**신설 요소**: "목표 미달 시 지금 가격으로 구매" 체크박스 행 (공동구매 전용).

토큰은 기존 `--checkout-*` 20개를 **그대로 유지**했다 — 새 디자인과 값이 전부 일치했기 때문이다.
개편으로 생긴 요소만 21개를 추가했다 (`--checkout-settings-*`, `--checkout-qty-*`, `--checkout-check-size` 등).

### 디자인 버전 (ver=01 / ver=02)

Figma의 딜 카드에는 `ver=01`과 `ver=02` 두 버전이 있다. **코드는 ver=02 기준이다.**

- `DiscountDeal` ver=02 — node 18462:124398 / `HotDeal` ver=02 — node 18476:127323
- `DiscountDeal_Soldout` ver=02 — node 19665:336915 / 타이머 Flag — node 18562:125857

ver=01 대비: 하단 "공구 참여" 버튼 → backdrop-blur 타이머 바, 좌상단 로고 마스크 뱃지 → 선택적 "내가 본" 뱃지,
가격 15px → 14px. ver=01 전용이던 `DealBadge`·`DealSoldoutOverlay`와 로고 마스크 에셋은 제거했다.

**토큰도 ver=02 기준으로 갱신했다.** `--product-deal-items-pb` 9→12px, `--product-deal-items-gap` 2→1px.
타이머 바는 ver=02 신설이라 토큰이 없어서 `--product-deal-timer-{h,py,gap,flag-h}`·`--product-deal-overlay-h`를 만들었다.
Figma의 `products/spacing02`(2px)가 레포에 누락돼 있어 `--products-spacing-02`로 추가했다.

`--product-deal-badge-*`는 ver=01 로고 마스크 뱃지 전용이라 **deprecated**로 표시만 해뒀다 (다른 카드 참조 가능성).

⚠️ `src/tokens/*.css` 헤더에 "Generated: auto — do NOT edit manually"이 있지만 레포에 생성기가 없다.
이번 갱신은 Figma ver=02 노드를 읽어 수동 반영한 것이다. 생성기를 만들 때 ver=02를 소스로 쓸 것.

### 알려진 차단 요인
- ~~`npm run build` 실패~~ → **해소.** `SocialDealCard`의 `badgeType`이 실제로 배지 타이포를 제어하도록 구현됨
  (timer 12/16px, days 10/15px). 빌드 통과 확인.
- Figma MCP 임시 에셋 URL — 48개 중 **19개는 로컬 에셋으로 복구 완료**(`src/assets/`).
  남은 29개는 **예시/더미 이미지**로 판정되어 복구하지 않는다 (디자인 시스템 구성요소가 아님).
  브라우저에서는 깨진 이미지로 보이지만 의도된 상태다. 필요하면 `placehold.co`로 교체할 것.
  전수 목록은 [`docs/figma-assets.md`](docs/figma-assets.md) — 변수명·종류·사용 문맥·참고 Figma node·권장 파일명.
  `npm run design:assets -- --md > docs/figma-assets.md` 로 재생성한다.
  코드에는 node ID가 없어 UUID로 역추적이 **불가능**하다. 앞으로 에셋은 반드시
  `src/assets/`에 파일명+node ID로 저장할 것 (`icon-fire_20312-39355.svg`).

---

## 6. 접근성 기준선
- 모든 대화형 요소: `role`, `aria-label` 또는 `aria-labelledby` 필수
- 색상 대비: WCAG AA 이상 (일반 텍스트 4.5:1, 대형 텍스트 3:1)
- 포커스 링: `focus-visible:` pseudo-class 사용, 제거 금지
