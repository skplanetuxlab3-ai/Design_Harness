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

## 5. 에이전트 위임 규칙

| 작업 | 담당 에이전트 |
|------|-------------|
| Figma URL → 코드 구현 | `figma-implementer` |
| 토큰 불일치 감지 + 수정 | `token-checker` |
| 전체 품질 검사 (빌드/타입/스토리) | `design-qa` |
| 코드 하드코딩 스캔 | `design-reviewer` |

에이전트 호출 예시:
```
@figma-implementer https://figma.com/design/xxx/ComponentName?node-id=1-2
@token-checker src/components/Button/Button.tsx
@design-qa
@design-reviewer src/components/
```

---

## 6. 접근성 기준선
- 모든 대화형 요소: `role`, `aria-label` 또는 `aria-labelledby` 필수
- 색상 대비: WCAG AA 이상 (일반 텍스트 4.5:1, 대형 텍스트 3:1)
- 포커스 링: `focus-visible:` pseudo-class 사용, 제거 금지
