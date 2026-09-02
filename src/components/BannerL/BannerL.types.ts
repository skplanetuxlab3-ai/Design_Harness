export interface BannerLProps {
  /** 윗줄 작은 문구 e.g. '쇼핑 스탬프' */
  eyebrow?: string
  /** 굵은 제목 — 두 줄까지 온다 */
  title: React.ReactNode
  /** CTA 버튼 라벨 */
  ctaLabel: string
  /** 우상단 일러스트를 감춘다 */
  hideArt?: boolean
  dismissible?: boolean
  onClick?: () => void
  onDismiss?: () => void
  className?: string
}
