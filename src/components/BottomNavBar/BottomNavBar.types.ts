export interface BottomNavItem {
  /** 24×24 아이콘 이미지 URL */
  iconUrl: string
  label: string
}

export interface BottomNavBarProps {
  items?: BottomNavItem[]
  activeIndex?: number
  className?: string
  onSelect?: (index: number) => void
}
