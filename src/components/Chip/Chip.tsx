import type { ChipProps } from './Chip.types'

// TODO: 7일 후 만료 — 로컬 SVG 에셋으로 교체 필요
const FIRE_ICON_URL = 'https://www.figma.com/api/mcp/asset/a30b20fb-cef0-420f-860b-92d0d75c424b'

export default function Chip({
  active = true,
  showIcon = false,
  label = '메뉴명',
  onClick,
  className,
}: ChipProps) {
  const containerCls =
    className ??
    [
      'inline-flex h-8 items-center justify-center px-[10px] rounded-[var(--radius-max)] cursor-pointer',
      active
        ? 'bg-[var(--primitive-sp-black)]'
        : 'bg-[var(--primitive-white)] border border-[var(--primitive-blueblack-700)]',
    ].join(' ')

  const textCls = [
    'text-[14px] leading-[20px] tracking-[0] whitespace-nowrap text-center shrink-0',
    active
      ? 'font-bold text-[var(--primitive-white)]'
      : 'font-normal text-[var(--primitive-black-200)]',
  ].join(' ')

  return (
    <button
      type="button"
      className={containerCls}
      onClick={onClick}
      aria-pressed={active}
    >
      {active && showIcon && (
        <img
          src={FIRE_ICON_URL}
          alt=""
          aria-hidden="true"
          className="size-5 shrink-0 mr-[2px]"
        />
      )}
      <span className={textCls}>{label}</span>
    </button>
  )
}
