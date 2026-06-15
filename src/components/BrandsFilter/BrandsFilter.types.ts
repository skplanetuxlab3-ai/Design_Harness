export type BrandsFilterVariant = 'Default' | 'Scroll'

export interface BrandItem {
  /** 브랜드 로고 이미지 URL (Default 변형에서 사용) */
  imageUrl?: string
  /** 브랜드 이름 */
  label: string
}

export interface BrandsFilterProps {
  /** Default: 원형 로고 + 이름 / Scroll: 텍스트 탭 */
  variant?: BrandsFilterVariant
  brands?: BrandItem[]
  activeIndex?: number
  className?: string
  onSelect?: (index: number) => void
}
