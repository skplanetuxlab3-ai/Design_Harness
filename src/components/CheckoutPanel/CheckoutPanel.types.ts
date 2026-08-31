export type CheckoutState = 'default' | 'pointFull' | 'pointLow'

/** 주문정보 하단 안내 배너 */
export type CheckoutBanner = 'cashback' | 'pointOnly' | 'none'

export interface CheckoutPanelProps {
  /** 화면 상태 — 포인트 충족/부족에 따라 CTA 가 달라진다 */
  state?: CheckoutState
  /** 상품명 */
  productName?: string
  /** 수량 (초기값) */
  quantity?: number
  /** 최대 구매 수량 */
  maxQuantity?: number
  /** 원가 e.g. "1,000,000원" */
  originalPrice?: string
  /** 총 결제 금액 e.g. "997,000원" */
  finalPrice?: string
  /** 포인트 사용액 e.g. "-10,570P" */
  pointDiscount?: string
  /** 포인트 자동충전 ON 표시 여부 */
  pointAutoCharge?: boolean
  /** 안내 배너 종류 — cashback: "목표 달성 시 800P 캐쉬백", pointOnly: "포인트로만 구매 가능한 상품입니다", none: 숨김 */
  bannerType?: CheckoutBanner
  /** 캐쉬백 배너의 강조 금액 e.g. "800P" */
  cashbackText?: string
  /** 포인트 부족액 e.g. "1,000P" — 지정 시 "1,000P 부족", 미지정 시 "포인트 부족" */
  pointShortage?: string
  /** 수량 컨트롤 표시 여부 (단품은 숨김) */
  showQuantity?: boolean
  /** 쿠폰 받을 번호 e.g. "010-****-1234" */
  phoneNumber?: string
  /** "목표 미달 시 지금 가격으로 구매" 행 표시 여부 (공동구매 전용) */
  showRetryPayment?: boolean
  /** 약관 동의 문구 표시 여부 */
  showAgreement?: boolean

  onClose?: () => void
  onQuantityChange?: (quantity: number) => void
  onPointCharge?: () => void
  onPointExchange?: () => void
  onAgreeAndPay?: () => void
  /** 포인트 "상세" 버튼 */
  onPointDetail?: () => void

  className?: string
}
