import type { ButtonProps } from './Button.types'

// ─── Figma: btn / sm / filled ─────────────────────────────────
// sm = h32 / 12px bold,  xs = h26 w40 / 11px bold

const SIZE = {
  sm: 'h-[var(--btn-sm-h)] px-[var(--btn-sm-px)] py-[var(--btn-sm-py)] rounded-[var(--btn-sm-r)] text-[length:var(--typeset-sm-size)] leading-[var(--typeset-sm-lh)]',
  xs: 'h-[var(--btn-xs-h)] rounded-[var(--btn-xs-r)] text-[length:var(--typeset-xs-size)] leading-[var(--typeset-xs-lh)]',
} as const

const TONE = {
  primary:   'bg-[var(--filled-primary-surface)] text-[var(--filled-primary-label)]',
  secondary: 'bg-[var(--filled-secondary-surface)] text-[var(--primitive-blueblack-100)]',
  grey:      'bg-[var(--primitive-black-800)] text-[var(--primitive-blueblack-100)]',
} as const

export default function Button({
  label,
  size = 'sm',
  tone = 'secondary',
  fixedWidth = true,
  disabled = false,
  onClick,
  className,
}: ButtonProps) {
  const width = size === 'xs' && fixedWidth ? 'w-[var(--btn-xs-w)]' : ''
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onClick}
      className={
        className ??
        `inline-flex shrink-0 items-center justify-center overflow-clip whitespace-nowrap font-bold tracking-[0] disabled:opacity-40 ${SIZE[size]} ${TONE[tone]} ${width}`
      }
    >
      {label}
    </button>
  )
}
