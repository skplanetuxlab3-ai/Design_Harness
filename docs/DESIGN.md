# Design Language Guide

## 브랜드 성격

| 속성 | 설명 |
|------|------|
| 명확함 | 불필요한 장식 제거. 정보가 즉각 전달되어야 함 |
| 신뢰감 | 일관된 색상·타이포·간격. 예측 가능한 인터랙션 |
| 가벼움 | 무겁지 않은 시각 무게감. 여백을 두려워하지 않음 |
| 접근성 | 모든 사용자를 위한 설계가 기본값 |

---

## 색상 시스템

### 시맨틱 토큰 계층

```
Primitive (원시값)       Semantic (의미값)          Component (컴포넌트)
─────────────────       ──────────────────         ───────────────────
--color-blue-500   →    --color-primary         →  --button-bg
--color-gray-900   →    --color-text-primary
--color-gray-50    →    --color-surface
--color-red-500    →    --color-error
```

### 색상 사용 맥락

| 토큰 | 사용처 | 사용 금지처 |
|------|--------|------------|
| `--color-primary` | CTA 버튼, 주요 링크, 포커스 링 | 배경, 대량 텍스트 |
| `--color-surface` | 카드 배경, 모달 배경 | 텍스트, 아이콘 |
| `--color-text-primary` | 본문, 제목 | 비활성 상태 |
| `--color-text-secondary` | 부가 설명, 메타 정보 | 주요 콘텐츠 |
| `--color-text-disabled` | 비활성 요소 | 활성 콘텐츠 |
| `--color-error` | 에러 메시지, 경고 아이콘 | 성공/중립 상태 |
| `--color-border` | 구분선, 입력 필드 테두리 | 채움 색상 |

### 금지 조합
- `--color-primary` 배경 위에 `--color-primary` 텍스트
- `--color-surface` 위에 `--color-text-disabled` (대비 부족)
- 회색 계열만으로 상태 구분 (색맹 접근성)

---

## 스페이싱 시스템

4px 베이스 그리드 기반:

| 토큰 | 값 | 사용처 |
|------|----|--------|
| `--spacing-1` | 4px | 아이콘-텍스트 간격, 인라인 요소 |
| `--spacing-2` | 8px | 컴포넌트 내부 소형 여백 |
| `--spacing-3` | 12px | 입력 필드 내부 패딩 |
| `--spacing-4` | 16px | 카드 패딩, 섹션 내부 여백 |
| `--spacing-6` | 24px | 카드 간격, 그룹 간 여백 |
| `--spacing-8` | 32px | 섹션 간 여백 |
| `--spacing-12` | 48px | 대형 섹션 패딩 |
| `--spacing-16` | 64px | 페이지 레벨 여백 |

### 스페이싱 원칙
- 관련 요소는 작은 spacing, 독립 요소는 큰 spacing
- 같은 계층의 요소는 같은 spacing 값 사용
- 4의 배수에서 벗어나는 값은 반드시 디자이너 확인

---

## 타이포그래피

| 역할 | 토큰 | 기본값 |
|------|------|--------|
| Display | `--text-display` | 48px / 600 weight |
| Heading 1 | `--text-h1` | 32px / 600 |
| Heading 2 | `--text-h2` | 24px / 600 |
| Heading 3 | `--text-h3` | 20px / 500 |
| Body Large | `--text-body-lg` | 16px / 400 |
| Body | `--text-body` | 14px / 400 |
| Caption | `--text-caption` | 12px / 400 |
| Label | `--text-label` | 12px / 500 |

### 금지사항
- 임의 `font-size` 픽셀 값 직접 사용
- `font-weight: bold` (숫자 값 사용: 500, 600, 700)
- 줄 높이 없는 폰트 사이즈 지정

---

## 컴포넌트 조합 규칙

### 가능한 조합
```
Button + Icon         ← 아이콘은 텍스트 왼쪽 또는 오른쪽 (둘 다 X)
Card > [Header, Body, Footer]
Input + Label + HelperText
Badge on Avatar       ← 상태 표시 목적만
```

### 금지 조합
```
❌ Button 안에 Button
❌ 모달 안에 모달 (대신 Sheet 사용)
❌ Table 안에 Table
❌ Input 안에 Input
❌ Tooltip 안에 Tooltip
```

### 쓰지 말 것 (Figma에서 Deprecated 처리됨)
- `OldButton` 컴포넌트 (→ `Button` 사용)
- `LegacyCard` 컴포넌트 (→ `Card` 사용)
- 직접 `<div className="shadow-md">` 대신 `Card` 컴포넌트 사용

---

## Figma 레이어 네이밍 컨벤션

### 규칙
```
컴포넌트: PascalCase          → Button, InputField, UserCard
변형(Variant): kebab-case     → size=large, state=disabled
그룹: _prefix로 구분          → _layout, _content, _icon
자동 레이아웃 프레임: .suffix  → container., row., col.
```

### 컴포넌트 속성 네이밍
```
상태: state (default | hover | focus | disabled | error)
크기: size (sm | md | lg)
변형: variant (primary | secondary | ghost | danger)
불리언: isLoading, hasIcon, isDisabled (camelCase)
```

### 레이어 명칭 → 코드 매핑
| Figma 레이어 | 코드 요소 |
|------------|----------|
| `container.` | 최상위 wrapper div |
| `label` | `<span>` 또는 `<label>` |
| `icon-left` | 좌측 아이콘 컨테이너 |
| `icon-right` | 우측 아이콘 컨테이너 |
| `helper-text` | 보조 텍스트 `<p>` |
| `overlay` | `::after` pseudo-element |

### 금지 레이어 명칭
```
❌ Frame 123 (자동 생성 이름)
❌ Group 45
❌ Rectangle (의미 없는 이름)
❌ Copy of Button (복사본 미정리)
```
