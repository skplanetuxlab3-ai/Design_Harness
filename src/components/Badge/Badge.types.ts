/** Figma `Elements / Badge` (node 937:27083) 의 variant 이름과 1:1 대응한다 */
export type BadgeType = 'Timer' | 'New' | 'First' | 'Ranking' | 'OkiClub' | 'Primary'
export type BadgeSize = 'feed' | 'detail'

export interface BadgeProps {
  type?: BadgeType
  size?: BadgeSize
  /** New·First·Primary 배지의 텍스트 레이블. 미지정 시 타입별 기본값 */
  label?: string
  /** Timer 배지의 카운트다운 (형식: HH:MM:SS) */
  time?: string
  /** Ranking 배지의 순위 번호 */
  rank?: string
  className?: string
}
