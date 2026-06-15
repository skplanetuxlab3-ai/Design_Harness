export type BadgeType = 'Timer' | 'New' | 'First' | 'Rank' | 'OkiClub'
export type BadgeSize = 'feed' | 'detail'

export interface BadgeProps {
  type?: BadgeType
  size?: BadgeSize
  /** New, First 배지의 텍스트 레이블 */
  label?: string
  /** Timer 배지의 카운트다운 (형식: HH:MM:SS) */
  time?: string
  /** Rank 배지의 순위 번호 */
  rank?: string
  className?: string
}
