export interface PromoBannerProps {
  /** 윗줄 — 작은 회색 문구 */
  caption?: string
  /** 아랫줄 — 보라색 굵은 문구 */
  title?: string
  /** 닫기 버튼 노출 */
  dismissible?: boolean
  onClick?: () => void
  onDismiss?: () => void
  className?: string
}
