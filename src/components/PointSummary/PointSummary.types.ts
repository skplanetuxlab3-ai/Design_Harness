export interface PointSummaryProps {
  /** 좌측 상단 설명 */
  label?: string
  /** 확정 포인트 e.g. '603P' */
  point?: string
  /** 적립 예정 포인트 e.g. '+9,020P' — 없으면 문구 전체가 숨는다 */
  pendingPoint?: string
  /** 우측 버튼 라벨 */
  actionLabel?: string
  onAction?: () => void
  className?: string
}
