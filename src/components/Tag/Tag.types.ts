export type TagType = 'Point' | 'Basic' | 'Benefit' | 'OkiClub' | 'Other' | 'Type6'

export interface TagProps {
  type?: TagType
  /** Basic, Other 타입의 태그 텍스트 */
  label?: string
  /** Point, Type6 타입의 포인트 표시 (예: "540P 적립") */
  point?: string
  /** Benefit 타입의 혜택 텍스트 */
  benefit?: string
  className?: string
}
