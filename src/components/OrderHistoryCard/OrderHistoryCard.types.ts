export type OrderStatus =
  | 'completed'        // 구매 완료
  | 'cancelRequested'  // 구매 취소 (진행 중)
  | 'cancelled'        // 취소 완료
  | 'refundRequested'  // 환불 신청
  | 'refunded'         // 환불 완료

export interface OrderItem {
  imageUrl?: string
  /** 상품명 e.g. "할인공구 상품 명 (서비스타입 · 카테고리)" */
  name: string
  /** 가격 e.g. "37,000원" */
  price: string
  /** 수량 e.g. 2 */
  quantity?: number
}

export interface OrderHistoryCardProps {
  /** 주문 날짜 e.g. "OO.25(수)" */
  orderDate?: string
  status?: OrderStatus
  /** 상품 목록 (최대 3개) */
  items?: OrderItem[]
  onOrderDetail?: () => void
  className?: string
}
