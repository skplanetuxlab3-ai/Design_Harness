export interface GuideCardProps {
  /** 제목 — 두 줄까지 온다 */
  title: React.ReactNode
  /** 본문 설명 */
  body?: React.ReactNode
  /** 일러스트 */
  image: string
  imageAlt?: string
  /** 아래쪽 액션 버튼 (Bonus 카드에만) */
  actions?: { label: string; onClick?: () => void }[]
  /** 버튼 아래 안내 문구 */
  note?: React.ReactNode
  className?: string
}
