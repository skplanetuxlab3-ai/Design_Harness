# Design Token 매핑 테이블

> **Source**: Figma / [OCB쇼핑_PDS3.0](https://www.figma.com/design/8xNEpGRfOaezbLEjqPJzGB/OCB%EC%87%BC%ED%95%91_PDS3.0?node-id=20310-411)  
> **Node**: `20310:411`  
> **추출 방법**: `get_variable_defs` MCP

---

## 파일 구조

```
src/tokens/
├── colors.css    ← 색상 토큰 (Primitive → Semantic → Component 3계층)
└── spacing.css   ← 간격·반경·elevation 토큰

src/styles/
└── globals.css   ← @import + 글로벌 시맨틱 재매핑
```

---

## 색상 토큰 (colors.css)

### Layer 1 — Primitive: Brand

| Figma 변수명 | CSS 변수 | 값 |
|---|---|---|
| `color/brand/primary` | `--primitive-brand-purple` | `#6c40f0` |
| `color/brand/ocb_pink` | `--primitive-brand-pink` | `#fe0955` |

### Layer 1 — Primitive: Black Scale
> ⚠️ OCB 역순 스케일: `100` = 진함(#333), `900` = 연함(#fafafa)

| Figma 변수명 | CSS 변수 | 값 |
|---|---|---|
| `color/black` | `--primitive-black` | `#000000` |
| `color/black/black100` | `--primitive-black-100` | `#333333` |
| `color/black/black200` | `--primitive-black-200` | `#626262` |
| `color/black/black300` | `--primitive-black-300` | `#868686` |
| `color/black/black400` | `--primitive-black-400` | `#b1b1b1` |
| `color/black/black500` | `--primitive-black-500` | `#c7c7c7` |
| `color/black/black600` | `--primitive-black-600` | `#d5d5d5` |
| `color/black/black800` | `--primitive-black-800` | `#f4f4f4` |
| `color/black/black900` | `--primitive-black-900` | `#fafafa` |

### Layer 1 — Primitive: BlueBlack Scale
> ⚠️ OCB 역순 스케일: `100` = 진함(#2d2f43), `700` = 연함(#e8e8ea)

| Figma 변수명 | CSS 변수 | 값 |
|---|---|---|
| `color/blueblack` | `--primitive-blueblack` | `#1e2032` |
| `color/blueblack/blueblack100` | `--primitive-blueblack-100` | `#2d2f43` |
| `color/blueblack/blueblack200` | `--primitive-blueblack-200` | `#4d4f66` |
| `color/blueblack/blueblack300` | `--primitive-blueblack-300` | `#9a9aa3` |
| `color/blueblack/blueblack700` | `--primitive-blueblack-700` | `#e8e8ea` |

### Layer 1 — Primitive: Accent Colors

| Figma 변수명 | CSS 변수 | 값 |
|---|---|---|
| `color/blue` | `--primitive-blue` | `#2084ff` |
| `color/blue/blue900` | `--primitive-blue-900` | `#edefff` |
| `color/yellow` | `--primitive-yellow` | `#ffbe20` |
| `color/yellow/yellow900` | `--primitive-yellow-900` | `#fff4e1` |
| `color/green/green900` | `--primitive-green-900` | `#edfced` |
| `color/mint/mint900` | `--primitive-mint-900` | `#defbf3` |
| `color/pink` | `--primitive-pink` | `#fe0955` |
| `color/pink/pink900` | `--primitive-pink-900` | `#fff4f5` |
| `color/purple` | `--primitive-purple` | `#aa23e9` |
| `color/white` | `--primitive-white` | `#ffffff` |

### Layer 1 — Primitive: Shopping 전용

| Figma 변수명 | CSS 변수 | 값 |
|---|---|---|
| `color/shopping/SP_black` | `--primitive-sp-black` | `#181818` |
| `color/shopping/SP_yellow` | `--primitive-sp-yellow` | `#e0fe4c` |
| `color/shopping/SP_pink` | `--primitive-sp-pink` | `#f69eff` |
| `color/shopping/pink` | `--primitive-shopping-pink` | `#fe4881` |
| `color/shopping/purple600` | `--primitive-shopping-purple-600` | `#8058f7` |
| `color/shopping/border` | `--primitive-shopping-border` | `#00000005` |
| `color/shopping/opacity/black50` | `--primitive-black-opacity-50` | `#0000000a` |
| `color/shopping/opacity/black200` | `--primitive-black-opacity-200` | `#00000033` |
| `color/shopping/opacity/black400` | `--primitive-black-opacity-400` | `#00000066` |
| `color/shopping/opacity/white200` | `--primitive-white-opacity-200` | `#ffffff33` |
| `color/shopping/opacity/white800` | `--primitive-white-opacity-800` | `#ffffffcc` |

### Layer 1 — Primitive: 시스템 배지 색상

| Figma 변수명 | CSS 변수 (Sub/텍스트) | CSS 변수 (배경) | Sub 값 | BG 값 |
|---|---|---|---|---|
| `시스템 컬러/서브·배경/1 Pink` | `--primitive-system-sub-pink` | `--primitive-system-bg-pink` | `#f4335d` | `#ffe5e8` |
| `시스템 컬러/서브·배경/2 Mint` | `--primitive-system-sub-mint` | `--primitive-system-bg-mint` | `#2e997b` | `#defbf3` |
| `시스템 컬러/서브·배경/3 Purple` | `--primitive-system-sub-purple` | `--primitive-system-bg-purple` | `#8c24b2` | `#f7e7fe` |
| `시스템 컬러/서브·배경/4 Orange` | `--primitive-system-sub-orange` | `--primitive-system-bg-orange` | `#f27100` | `#ffecd6` |
| `시스템 컬러/서브·배경/5 Blue` | `--primitive-system-sub-blue` | `--primitive-system-bg-blue` | `#2434b2` | `#edefff` |
| `시스템 컬러/서브·배경/6 Light pink` | `--primitive-system-sub-light-pink` | `--primitive-system-bg-light-pink` | `#f4335d` | `#ffe6fc` |
| `시스템 컬러/서브·배경/7 Green` | `--primitive-system-sub-green` | `--primitive-system-bg-green` | `#2e997b` | `#edfced` |
| `시스템 컬러/서브·배경/8 Grey` | `--primitive-system-sub-grey` | `--primitive-system-bg-grey` | `#4d4f66` | `#e8e8ea` |
| `시스템 컬러/서브·배경/9 Yellow` | `--primitive-system-sub-yellow` | `--primitive-system-bg-yellow` | `#f27100` | `#fff7d1` |
| `시스템 컬러/서브·배경/10 Sky blue` | `--primitive-system-sub-sky-blue` | `--primitive-system-bg-sky-blue` | `#398cbf` | `#e0f4fe` |

### Layer 2 — Semantic

| Figma 변수명 | CSS 변수 | 참조 Primitive | 값 |
|---|---|---|---|
| `color/price/primary` | `--color-price-primary` | `--primitive-brand-pink` | `#fe0955` |
| `color/text/secondary` | `--color-text-secondary` | `--primitive-blueblack` | `#1e2032` |
| `color/theme/bg_light` | `--color-theme-bg-light` | `--primitive-black-900` | `#fafafa` |
| `Semantic/Label/Alternative` | `--semantic-label-alternative` | 직접값 | `#37383c` |
| `시스템 컬러/배지 세트` | `--color-badge-{color}-text/bg` | `--primitive-system-sub/bg-*` | (세트 참조) |

### Layer 3 — Component

| Figma 변수명 | CSS 변수 | 참조 Semantic | 값 |
|---|---|---|---|
| `filled/primary/surface` | `--filled-primary-surface` | `--primitive-blueblack` | `#1e2032` |
| `filled/primary/label` | `--filled-primary-label` | `--primitive-white` | `#ffffff` |
| `filled/secondary/surface` | `--filled-secondary-surface` | `--primitive-blueblack-700` | `#e8e8ea` |
| `top_appbar/surface` | `--top-appbar-surface` | `--primitive-sp-black` | `#181818` |
| `top_appbar/divider` | `--top-appbar-divider` | `--primitive-black-800` | `#f4f4f4` |

---

## 간격·반경 토큰 (spacing.css)

### Border Radius Scale

| Figma 변수명 | CSS 변수 | 값 |
|---|---|---|
| `radius/radius050` | `--radius-050` | `4px` |
| `radius/radius100` | `--radius-100` | `8px` |
| `radius/radius150` | `--radius-150` | `12px` |
| `radius/radius200` | `--radius-200` | `16px` |
| `radius/radius250` | `--radius-250` | `20px` |
| `radius/radius350` | `--radius-350` | `24px` |
| `radius/radiusmax` | `--radius-max` | `100px` |
| `products/radius/radius8` | `--products-radius-8` | `6px` ⚠️ |
| `products/radius/radius60` | `--products-radius-60` | `16px` |

> ⚠️ `products/radius/radius8`의 실제 값은 `6px` — Figma 변수명과 값이 불일치. Figma 원본 유지.

### Products Spacing
> ※ 스케일 ID가 실제 px값과 다름 (Figma 내부 인덱스)

| Figma 변수명 | CSS 변수 | 값 |
|---|---|---|
| `products/spacing10` | `--products-spacing-10` | `8px` |
| `products/spacing20` | `--products-spacing-20` | `10px` |
| `products/spacing40` | `--products-spacing-40` | `14px` |
| `products/spacing50` | `--products-spacing-50` | `16px` |
| `products/spacing60` | `--products-spacing-60` | `20px` |
| `products/spacing80` | `--products-spacing-80` | `60px` |

### Component Spacing

| Figma 변수명 | CSS 변수 | 값 |
|---|---|---|
| `top_appbar/left_margin` | `--top-appbar-left-margin` | `20px` |

### Font Weight

| Figma 변수명 | CSS 변수 | 값 |
|---|---|---|
| `font/weight/regular` | `--font-weight-regular` | `400` |
| `font/weight/medium` | `--font-weight-medium` | `500` |
| `font/weight/semibold` | `--font-weight-semibold` | `600` |

### Elevation / Shadow

| Figma 변수명 | CSS 변수 | 값 |
|---|---|---|
| `elevation/3dp/position x` | `--elevation-3dp-x` | `0px` |
| `elevation/3dp/position y` | `--elevation-3dp-y` | `3px` |
| `elevation/3dp/blur` | `--elevation-3dp-blur` | `21px` |
| `elevation/3dp/spread` | `--elevation-3dp-spread` | `3px` |
| `elevation/3dp/color` | `--elevation-3dp-color` | `#0000001a` |
| `elevation/glow/position x` | `--elevation-glow-x` | `0px` |
| `elevation/glow/position y` | `--elevation-glow-y` | `3px` |
| `elevation/glow/blur` | `--elevation-glow-blur` | `20px` |
| `elevation/glow/spread` | `--elevation-glow-spread` | `3px` |
| `elevation/glow/color` | `--elevation-glow-color` | `#00000008` |
| `shadow/3dp` (합성) | `--shadow-3dp` | `box-shadow` 단축값 |
| `shadow/glow` (합성) | `--shadow-glow` | `box-shadow` 단축값 |

---

## 제외된 변수

다음 변수들은 CSS로 변환하지 않았습니다:

| Figma 변수명 | 제외 이유 |
|---|---|
| `typeset_*` 복합 Font 변수 | CSS에서 단일 값으로 표현 불가 (Font 복합 타입) |
| `surface/badge/frist`, `time`, `new` | 값이 비어 있음 (미정의) |
| `iOS/Materials/Chrome` | 플랫폼 전용 blur 이펙트 (CSS backdrop-filter로 별도 구현 필요) |
| `top_appbar/title` | boolean 값, CSS 토큰 불필요 |
| `color/token fontfamily`, `color/token text/surface` | Storybook 문서 전용 |

---

## 네이밍 변환 규칙

| Figma | CSS | 예시 |
|---|---|---|
| `/` 구분자 | `-` | `color/brand/primary` → `--color-brand-primary` |
| 스페이스 | `-` | `SP black` → `sp-black` |
| 언더스코어 `_` | `-` | `SP_black` → `sp-black` |
| 한글 변수명 | 의미 번역 | `시스템 컬러/서브/1 Pink` → `--primitive-system-sub-pink` |
| 대문자 | 소문자 | `SP_black` → `sp-black` |
| Primitive 접두어 | `--primitive-*` | 직접 hex 값을 가진 변수 |
| Semantic 접두어 | `--color-*` | Primitive를 참조하는 의미 변수 |
| Component 접두어 | 컴포넌트명 prefix | `--filled-*`, `--top-appbar-*` |
