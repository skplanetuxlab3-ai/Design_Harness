import type { QuantityControlProps } from './QuantityControl.types'

function MinusIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
      <path d="M3 7H11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  )
}

function PlusIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
      <path d="M7 3V11M3 7H11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  )
}

export default function QuantityControl({
  type = 'minus',
  active = true,
  onClick,
  className,
}: QuantityControlProps) {
  const colorCls = active
    ? 'text-[var(--primitive-blueblack)]'
    : 'text-[var(--primitive-black-500)]'

  const containerCls =
    className ??
    [
      'relative size-[14px] flex items-center justify-center flex-shrink-0',
      active ? 'cursor-pointer' : 'cursor-not-allowed',
      colorCls,
    ].join(' ')

  return (
    <button
      type="button"
      className={containerCls}
      onClick={active ? onClick : undefined}
      disabled={!active}
      aria-label={type === 'plus' ? '수량 증가' : '수량 감소'}
    >
      {type === 'minus' ? <MinusIcon /> : <PlusIcon />}
    </button>
  )
}
