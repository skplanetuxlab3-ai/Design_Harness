export interface EventChipItem {
  /** 칩 라벨 */
  text: string
  /** 썸네일 이미지 URL (없으면 빈 배경) */
  imageUrl?: string
}

export interface ChipMenuProps {
  /** 이벤트 칩 목록 */
  items?: EventChipItem[]
  /** 칩 클릭 핸들러 */
  onChipClick?: (item: EventChipItem, index: number) => void
  className?: string
}
