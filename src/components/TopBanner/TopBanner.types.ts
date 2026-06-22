export interface TopBannerProps {
  /** 배경 이미지 URL */
  imageUrl?: string
  /** 카피 (줄바꿈은 \n) */
  title?: string
  /** CTA 버튼 라벨 */
  buttonLabel?: string
  /** 페이지네이션 총 개수 (max 4, 1개면 미노출) */
  total?: number
  /** 현재 활성 인덱스 (0-base) */
  activeIndex?: number
  /** CTA 클릭 핸들러 */
  onButtonClick?: () => void
  className?: string
}
