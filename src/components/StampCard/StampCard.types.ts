/** Figma variant: Elements / Stamp — type=Shopping|Coupang */
export type StampCardType = 'Shopping' | 'Coupang'

export interface StampCardItem {
  type?: StampCardType
  /** 카드 제목 e.g. '쇼핑 스탬프' */
  title?: string
  /** 모은 개수 — 진행바와 스탬프 표시의 기준 */
  count?: number
  /** 진행바에 보여줄 스탬프 칸 수 (Figma 기준 4칸) */
  slots?: number
  /** 첫 칸에 붙는 번호 (누적 스탬프판이라 1부터가 아닐 수 있다) */
  startAt?: number
  /** 경품이 걸린 스탬프 번호. 그 칸은 체크 대신 경품 아이콘으로 표시된다. */
  prizeAt?: number
  actionLabel?: string
  onAction?: () => void
}

export interface StampCardProps {
  items?: StampCardItem[]
  className?: string
}
