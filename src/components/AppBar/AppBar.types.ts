/** Figma `top_appbar` 의 mode variant */
export type AppBarMode = 'light' | 'dark'

export interface AppBarProps {
  title?: string
  mode?: AppBarMode
  /** history back 버튼. Figma 문서: 있으면 states=active 로 왼쪽 마진이 줄어든다. */
  showBack?: boolean
  onBack?: () => void
  /** 우측 액션 영역 */
  trailing?: React.ReactNode
  className?: string
}
