export interface CategoryItem {
  label: string
  /** 첫 번째 칩(인기)에 Fire 아이콘 표시 여부 */
  showFire?: boolean
}

export interface CategoryFilterProps {
  items?: CategoryItem[]
  activeIndex?: number
  /** 우측 펼치기 버튼 표시 여부 */
  showExpandBtn?: boolean
  className?: string
  onSelect?: (index: number) => void
  onExpand?: () => void
}
