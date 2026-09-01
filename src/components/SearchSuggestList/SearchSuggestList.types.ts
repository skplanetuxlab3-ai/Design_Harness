export interface SearchSuggestListProps {
  /** 제안 검색어 목록 */
  items?: string[]
  /** 사용자가 입력한 부분. 각 항목에서 이 접두어가 강조된다. */
  query?: string
  onSelect?: (keyword: string) => void
  className?: string
}
