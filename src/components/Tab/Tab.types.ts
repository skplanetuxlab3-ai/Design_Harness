export type TabType = 'Basic' | 'Icon'

export interface TabProps {
  type?: TabType
  active?: boolean
  label?: string
  sublabel?: string
  showDot?: boolean
  showSubLabel?: boolean
  className?: string
}
