import type { ProductCardProps, ProductCardType } from '../ProductCard/ProductCard.types'

export interface RecommendItem {
  id: string
  /** ProductCard 변형 타입 */
  type: ProductCardType
  /** ProductCard에 직접 전달되는 props */
  cardProps: ProductCardProps
  /** 카드별 AI 추천 이유 문구 (1줄) */
  reason: string
}

export interface AIRecommendSectionProps {
  /** 영역 타이틀 */
  title?: string
  /** AI 통합 근거 문구 (1~2문장) */
  reasoningText?: string
  /** 추천 아이템 목록 (최대 5개) */
  items?: RecommendItem[]
  /** 카드 클릭 핸들러 */
  onCardClick?: (item: RecommendItem, rank: number) => void
  /** 관심 없음 핸들러 */
  onDismiss?: (item: RecommendItem, rank: number) => void
  /** 비슷한 혜택 더 보기 핸들러 */
  onSimilar?: (item: RecommendItem, rank: number) => void
  className?: string
}
