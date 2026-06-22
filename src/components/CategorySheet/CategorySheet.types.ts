export interface CategoryGroup {
  /** 카테고리명 (섹션 제목 & 좌측 칩 라벨) */
  name: string
  /** 브랜드 이름 목록 */
  brands: string[]
}

export interface CategorySheetProps {
  /** 열림 여부 */
  open: boolean
  /** 카테고리 그룹 목록 */
  groups?: CategoryGroup[]
  /** 활성(좌측 선택) 카테고리 인덱스 */
  activeIndex?: number
  /** 좌측 칩 선택 */
  onSelect?: (index: number) => void
  /** 닫기 */
  onClose?: () => void
}
