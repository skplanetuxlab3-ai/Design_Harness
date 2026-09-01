/** btn / sm / filled — Figma 컴포넌트 (OCB_PDS3.0 · OCB_적립) */
export type ButtonSize = 'sm' | 'xs'

/**
 * 면 색. primary/secondary 는 Figma 변수 filled/primary|secondary/surface 에서 온 이름이다.
 * grey 는 color/black/black800 을 쓰는 세 번째 쓰임으로, Figma variant 이름을 확인하지 못했다.
 */
export type ButtonTone = 'primary' | 'secondary' | 'grey'

export interface ButtonProps {
  label: string
  size?: ButtonSize
  tone?: ButtonTone
  /** xs 는 Figma 상 40px 고정폭이다. 라벨이 길면 이걸 꺼라. */
  fixedWidth?: boolean
  disabled?: boolean
  onClick?: () => void
  className?: string
}
