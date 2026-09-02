export interface BridgeCtaProps {
  /** 주 버튼 라벨 e.g. 'G마켓 인기상품 보러가기' */
  label: string
  /** 버튼 위 안내 문구 */
  notice?: string
  /** 즐겨찾기 등록 여부 — 별 버튼의 상태 */
  favorite?: boolean
  /** 별 버튼 위에 뜨는 툴팁 */
  tooltip?: string
  onFavorite?: () => void
  onClick?: () => void
  className?: string
}
