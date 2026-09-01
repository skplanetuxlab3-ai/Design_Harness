export type TabType = 'Basic' | 'Icon'

export interface TabProps {
  /** Figma variant `Type` — Basic(레이블) / Icon(레이블 + Goto 셰브론) */
  type?: TabType
  /** Figma variant `State` — active 일 때 ActiveDot 노출 */
  active?: boolean
  label?: string
  sublabel?: string
  /** Figma `Alert` 레이어 (8×8, 기본 hidden) */
  showDot?: boolean
  /** Figma `SubLabel` 레이어 (기본 hidden) */
  showSubLabel?: boolean
  /** 탭바에서 폭을 균등 분할 (Navigation bar 2474:116649 — 탭이 bar 폭을 나눠 가짐) */
  fill?: boolean
  /** 지정하면 <button role="tab"> 으로 렌더 */
  onClick?: () => void
  className?: string
}
