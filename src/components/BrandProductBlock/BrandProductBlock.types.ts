import type { ProductCardProps } from '../ProductCard/ProductCard.types'

export interface BrandProductBlockProps {
  /** 제휴처 이름 e.g. 'G마켓' */
  brand: string
  /** 적립률 문구 e.g. '~5% 적립' */
  label?: string
  /** 브랜드 로고. 제휴처마다 다른 데이터라 컴포넌트가 들고 있지 않는다. */
  logo?: string
  /** 로고 배경 (반전색 로고면 브랜드 컬러) */
  logoBackground?: string
  items: ProductCardProps[]
  onClick?: () => void
  className?: string
}
