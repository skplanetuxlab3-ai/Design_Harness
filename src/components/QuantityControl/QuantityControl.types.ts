export type QuantityControlType = 'plus' | 'minus'

export interface QuantityControlProps {
  type?: QuantityControlType
  active?: boolean
  onClick?: () => void
  className?: string
}
