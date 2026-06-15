export type TopNavBarVariant = 'Default' | 'Scroll'

export interface NavTabItem {
  label: string
}

export interface TopNavBarProps {
  /** Default: 앱바(52px) + 탭바(42px) / Scroll: 탭바(42px)만 */
  variant?: TopNavBarVariant
  /** 앱바 타이틀 텍스트 */
  title?: string
  /** 탭 목록 (마지막은 Trailing 버튼으로 렌더링) */
  tabs?: NavTabItem[]
  /** 활성 탭 인덱스 (0-based) */
  activeIndex?: number
  className?: string
  onTabChange?: (index: number) => void
  /** Trailing BTN(마지막 탭 우측 화살표) 클릭 */
  onMoreClick?: () => void
  onMyShoppingClick?: () => void
  onNotificationClick?: () => void
}
