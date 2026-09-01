export interface BrandShortcutItem {
  /** 제휴처 이름 e.g. '11번가' */
  brand: string
  /** 혜택 문구 e.g. '최대 2% 적립 + 스탬프' */
  benefit: string
  /** 로고 이미지. 없으면 배경색만 깔린다. */
  logo?: string
  /** 로고 배경 (단색 또는 gradient) */
  logoBackground?: string
  /** 로고를 로고 박스 안에서 얼마나 안쪽으로 넣을지 (Figma inset 문자열) */
  logoInset?: string
  /** 브랜드명 옆 NEW 뱃지 */
  showNew?: boolean
  /** 좌상단 즐겨찾기 아이콘 */
  showFav?: boolean
  /** 로고 위에 뜨는 그라디언트 pill e.g. '3번 구매' */
  pill?: string
  onClick?: () => void
}

export interface BrandShortcutListProps {
  items?: BrandShortcutItem[]
  /** 한 컬럼에 들어갈 항목 수 (Figma 기준 5) */
  perColumn?: number
  className?: string
}
