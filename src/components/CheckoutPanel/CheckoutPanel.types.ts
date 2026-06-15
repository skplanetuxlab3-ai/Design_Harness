export type CheckoutState = 'default' | 'pointFull' | 'pointLow'

export interface CheckoutPanelProps {
  state?: CheckoutState
  productName?: string
  imageUrl?: string
  quantity?: number
  /** 원가 e.g. "1,000,000원" (취소선) */
  originalPrice?: string
  /** 결제금액 e.g. "997,000원" */
  finalPrice?: string
  /** 포인트 할인 e.g. "-10,570P" */
  pointDiscount?: string
  /** 포인트 잔액 e.g. "10,570P" */
  pointBalance?: string
  /** 휴대폰 번호 e.g. "010-***-1234" */
  phoneNumber?: string
  onClose?: () => void
  onQuantityChange?: (quantity: number) => void
  onPointCharge?: () => void
  onPointExchange?: () => void
  onAgreeAndPay?: () => void
  onViewOtherProducts?: () => void
  className?: string
}
