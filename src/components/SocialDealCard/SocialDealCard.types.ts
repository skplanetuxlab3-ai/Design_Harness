export type SocialDealAccent = 'yellow' | 'pink'
export type SocialDealBadgeType = 'timer' | 'days'

export interface SocialDealCardProps {
  /** 배경 이미지 URL */
  imageUrl?: string
  /** 타이틀 (줄바꿈 \n, 최대 2줄) */
  title?: string
  /** 가격 칩 라벨 */
  goalLabel?: string
  /** 할인율 e.g. '40%' */
  discount?: string
  /** 목표가 e.g. '14,100원' */
  price?: string
  /** 강조색 — 할인공구(yellow) / 특템공구(pink) */
  accent?: SocialDealAccent
  /** 진행률 0~1 */
  progress?: number
  /** 소셜 프루프 텍스트 e.g. '2,103명이 보고 있어요' */
  watching?: string
  /** 목표 수량 e.g. '500개 목표' */
  goalCount?: string
  /** 배지 타입 — 타이머(timer) / D-day(days) */
  badgeType?: SocialDealBadgeType
  /** 배지 라벨 e.g. '88:88:88' / '3일 남음' */
  badgeLabel?: string
  /** 참여중 칩 표시 */
  joining?: boolean
  /** 완판 오버레이 */
  soldout?: boolean
  className?: string
}
