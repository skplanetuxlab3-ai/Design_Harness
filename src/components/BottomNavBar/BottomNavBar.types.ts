/** 아이콘 레이어 — Figma 24px 박스 내 inset 포지셔닝 (단일/복수 레이어 지원) */
export interface BottomNavIconLayer {
  /** 아이콘 에셋 URL */
  src: string
  /** 24px 박스 기준 inset (CSS top right bottom left). 미지정 시 박스 전체 */
  inset?: string
  /** 레이어 내부 추가 inset (음수 = 확대) */
  innerInset?: string
}

export interface BottomNavItem {
  label: string
  /** 아이콘 레이어 목록 (쇼핑 active 등은 2개 레이어로 합성) */
  icon: BottomNavIconLayer[]
}

export interface BottomNavBarProps {
  items?: BottomNavItem[]
  activeIndex?: number
  className?: string
  onSelect?: (index: number) => void
}
