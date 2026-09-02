export interface SearchResultItemProps {
  /** 제휴처 e.g. '쿠팡' */
  brand: string
  title: string
  /** 할인율 e.g. '20%' — 없으면 가격만 */
  discount?: string
  price: string
  imageUrl?: string
  /** 이미지 우상단 포인트 배지 e.g. '1P' */
  point?: string
  /** 가격 아래 스탬프 문구 e.g. '최대 스탬프 2개' */
  stampLabel?: string
  onClick?: () => void
  className?: string
}
