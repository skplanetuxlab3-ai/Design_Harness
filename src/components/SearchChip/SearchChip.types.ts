/**
 * recent      — 최근 검색어. 흰 배경 + 테두리 + 삭제 버튼 (Figma Chip 19449:147665)
 * recommended — 추천 검색어. 보라 배경 (Figma tag 19449:147680)
 */
export type SearchChipVariant = 'recent' | 'recommended'

export interface SearchChipProps {
  label: string
  variant?: SearchChipVariant
  onClick?: () => void
  /** recent 에서만. 지정하면 삭제 버튼이 나온다. */
  onRemove?: () => void
  className?: string
}
