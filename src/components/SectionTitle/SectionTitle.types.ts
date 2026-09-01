export interface SectionTitleProps {
  title: string
  /** 제목 옆 배지 (Figma `title+badge` 슬롯) */
  badge?: React.ReactNode
  /** 우측 전체보기 버튼 */
  viewAllLabel?: string
  onViewAll?: () => void
  className?: string
}
