export type ProductCardType =
  | 'Gifticon'
  | 'Outbound'
  | 'DiscountDeal'
  | 'DiscountDeal_Soldout'
  | 'HotDeal'
  | 'HotDeal_Soldout'
  | 'Movie'
  | 'ListRanking'
  | 'GifticonOffering'
  | 'Banner'
  | 'Upcoming'

export type FilmRating = 'All' | '12' | '15' | '19'

export type GifticonOfferingColor =
  | 'Blue' | 'Pink' | 'Mint' | 'Purple' | 'Orange'
  | 'LightPink' | 'Green' | 'Grey' | 'Yellow' | 'SkyBlue'

export interface RankingItem {
  imageUrl: string
  name: string
}

export interface ProductCardProps {
  type?: ProductCardType
  className?: string

  /** 상품 이미지 URL (Gifticon·Outbound·DiscountDeal·HotDeal·Movie·Banner) */
  imageUrl?: string

  /** 브랜드명 (Gifticon·Outbound·GifticonOffering) */
  brand?: string
  /** 상품명 / 타이틀 */
  title?: string

  /** 할인율 표시 여부 */
  showDiscount?: boolean
  /** 할인율 문자열 e.g. '30%' */
  discount?: string
  /** 가격 문자열 e.g. '27,000원' */
  price?: string

  // ─ Gifticon ────────────────────────────────────────────────────
  /** Badge(New 등) 표시 여부 */
  showBadge?: boolean
  /** Badge 라벨 텍스트 */
  badgeLabel?: string
  /** Sold out 상태 (중앙 오버레이) */
  soldout?: boolean

  // ─ Outbound ────────────────────────────────────────────────────
  /** 별점 표시 여부 */
  showRating?: boolean
  /** 별점 e.g. '4.7' */
  rating?: string
  /** 리뷰 수 e.g. '387' */
  reviewCount?: string
  /** 태그 영역 표시 여부 */
  showTag?: boolean
  /** 포인트 태그 금액 e.g. '540P 적립' */
  pointLabel?: string

  // ─ DiscountDeal · HotDeal (+ Soldout) ─────────────────────────
  /** 타이머 문자열 e.g. '88:88:88' (DiscountDeal) */
  timer?: string
  /** 남은 기간 e.g. '3일 남음' (HotDeal) */
  daysLeft?: string
  /** 참여중 필 표시 여부 */
  showJoining?: boolean

  // ─ Movie ───────────────────────────────────────────────────────
  filmRating?: FilmRating
  /** 황금달걀 지수 e.g. '97%' */
  eggRating?: string
  /** 예매율 e.g. '예매율 53.95%' */
  bookingRate?: string
  /** 순위 숫자 e.g. '1' */
  rank?: string

  // ─ ListRanking ─────────────────────────────────────────────────
  /** 리스트 상단 타이틀 */
  listTitle?: string
  /** 4개 랭킹 아이템 */
  items?: RankingItem[]

  // ─ GifticonOffering ────────────────────────────────────────────
  color?: GifticonOfferingColor
  /** 카테고리 태그 e.g. 'MD 추천' */
  mdTag?: string

  // ─ Banner ──────────────────────────────────────────────────────
  /** 배너 상단 서브텍스트 e.g. '최대 30%' */
  bannerSubtitle?: string
  /** 배너 타이틀 이미지 URL */
  bannerTitleImage?: string
  /** CTA 태그 텍스트 e.g. '바로가기' */
  bannerTag?: string

  // ─ Upcoming ────────────────────────────────────────────────────
  /** D-day e.g. 'D-3' */
  countdown?: string
  /** 오픈 날짜 e.g. '2월 13일' */
  openDate?: string
  /** 오픈 시각 e.g. '12:00' */
  openTime?: string
}
