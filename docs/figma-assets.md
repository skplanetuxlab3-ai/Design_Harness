# Figma 에셋 현황

> **결정 (2026-08-31)**: 남은 항목은 디자인 시스템 에셋이 아니라 **예시/더미 이미지**다.
> 복구하지 않는다. 디자인 시스템 구성요소(아이콘·로고·마스크)는 모두 `src/assets/`로 옮겼다.

> 코드에 박힌 Figma MCP 임시 에셋 URL **29개**. 전부 만료(404)되어 이미지가 깨진 상태다.
> URL의 UUID는 MCP가 그때그때 발급한 임시 ID라 Figma 노드로 역추적이 **불가능**하다.
> 아래 변수명과 사용 문맥을 단서로 Figma에서 다시 찾아 `src/assets/`로 export할 것.

> 파일명에 node ID를 넣어두면 다음엔 출처가 끊기지 않는다 — `icon-fire_20312-39355.svg`


## BrandsFilter (1개)

Figma 참고 노드: `20312-39385` (BrandBar), `20312-39394` (BrandScrollBar)

| ☐ | 변수명 | 종류 | 사용 문맥 | 위치 |
|---|--------|------|-----------|------|
| ☐ | `LINE_ACTIVE` | shape | <src> | BrandsFilter/BrandsFilter.tsx:5 |

## CategoryFilter (2개)

Figma 참고 노드: `20312-39355` (CategoryBar)

| ☐ | 변수명 | 종류 | 사용 문맥 | 위치 |
|---|--------|------|-----------|------|
| ☐ | `FIRE_ICON` | icon | <src> | CategoryFilter/CategoryFilter.tsx:4 |
| ☐ | `ARROW_DOWN_ICON` | icon | <src> | CategoryFilter/CategoryFilter.tsx:5 |

## Chip (1개)

Figma 참고 노드: `20312-39355` (CategoryBar), `20312-56390` (EventChip)

| ☐ | 변수명 | 종류 | 사용 문맥 | 위치 |
|---|--------|------|-----------|------|
| ☐ | `FIRE_ICON_URL` | icon | <src> | Chip/Chip.tsx:4 |

## GroupbuyingHome (10개)

Figma 참고 노드: `20312-41966` (Groupbuying List 배치 — 공동구매 딜 카드 컨테이너), `20341-19611` (공동구매 화면 (SP02,)

| ☐ | 변수명 | 종류 | 사용 문맥 | 위치 |
|---|--------|------|-----------|------|
| ☐ | `BANNER.bill` | image | <src> | GroupbuyingHome/GroupbuyingHome.tsx:7 |
| ☐ | `BANNER.circle1` | image | <src> | GroupbuyingHome/GroupbuyingHome.tsx:8 |
| ☐ | `BANNER.base` | image | <src> | GroupbuyingHome/GroupbuyingHome.tsx:9 |
| ☐ | `BANNER.circle2` | image | <src> | GroupbuyingHome/GroupbuyingHome.tsx:10 |
| ☐ | `DEAL_IMG.shinsegae` | image | — | GroupbuyingHome/GroupbuyingHome.tsx:13 |
| ☐ | `DEAL_IMG.soldout` | image | — | GroupbuyingHome/GroupbuyingHome.tsx:14 |
| ☐ | `DEAL_IMG.dongwon` | image | — | GroupbuyingHome/GroupbuyingHome.tsx:15 |
| ☐ | `DEAL_IMG.icecream` | image | — | GroupbuyingHome/GroupbuyingHome.tsx:16 |
| ☐ | `DEAL_IMG.starbucks` | image | — | GroupbuyingHome/GroupbuyingHome.tsx:17 |
| ☐ | `COMINGSOON_IMG` | image | <src> | GroupbuyingHome/GroupbuyingHome.tsx:19 |

## ProductCard (2개)

Figma 참고 노드: `20312-39754` (ProductCard)

| ☐ | 변수명 | 종류 | 사용 문맥 | 위치 |
|---|--------|------|-----------|------|
| ☐ | `STAR_ICON` | icon | <src> | ProductCard/ProductCard.tsx:6 |
| ☐ | `EGG_ICON` | icon | <src> | ProductCard/ProductCard.tsx:7 |

## SocialDealCard (3개)

Figma 참고 노드: `20312-40570` (SocialDeal 카드 스펙)

| ☐ | 변수명 | 종류 | 사용 문맥 | 위치 |
|---|--------|------|-----------|------|
| ☐ | `EYE_ICON` | icon | <src> | SocialDealCard/SocialDealCard.tsx:4 |
| ☐ | `LOGO_MASK_YELLOW` | mask | CSS mask | SocialDealCard/SocialDealCard.tsx:5 |
| ☐ | `LOGO_MASK_PINK` | mask | CSS mask | SocialDealCard/SocialDealCard.tsx:6 |

## TodayDealHome (8개)

Figma 참고 노드: `20343-20693` (오늘특가 화면 (SP03,)

| ☐ | 변수명 | 종류 | 사용 문맥 | 위치 |
|---|--------|------|-----------|------|
| ☐ | `BANNER.light` | image | <src> | TodayDealHome/TodayDealHome.tsx:6 |
| ☐ | `BANNER.light1` | image | <src> | TodayDealHome/TodayDealHome.tsx:7 |
| ☐ | `BANNER.oneulman` | image | CSS mask | TodayDealHome/TodayDealHome.tsx:8 |
| ☐ | `BANNER.ellipse1` | image | <src> | TodayDealHome/TodayDealHome.tsx:9 |
| ☐ | `BANNER.ellipse2` | image | <src> | TodayDealHome/TodayDealHome.tsx:10 |
| ☐ | `BANNER.vector1` | image | <src> | TodayDealHome/TodayDealHome.tsx:11 |
| ☐ | `BANNER.vector2` | image | <src> | TodayDealHome/TodayDealHome.tsx:12 |
| ☐ | `BANNER.vector3` | image | <src> | TodayDealHome/TodayDealHome.tsx:13 |

## TopBanner (1개)

Figma 참고 노드: `20327-20530` (Top Banner 배치 — 풀블리드 비주얼 배너)

| ☐ | 변수명 | 종류 | 사용 문맥 | 위치 |
|---|--------|------|-----------|------|
| ☐ | `DEFAULT_BANNER_IMG` | image | — | TopBanner/TopBanner.tsx:4 |

## TopNavBar (1개)

Figma 참고 노드: `20312-39339` (TopNavBar)

| ☐ | 변수명 | 종류 | 사용 문맥 | 위치 |
|---|--------|------|-----------|------|
| ☐ | `MY_SHOPPING_ICON` | icon | <src> | TopNavBar/TopNavBar.tsx:8 |
