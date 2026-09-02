import type { SearchChipProps } from './SearchChip.types'
import closeIcon from '../../assets/icon-close-12_19449-147667.svg'

// Figma: Chip 19449:147665 (recent) / tag 19449:147680 (recommended)
// 공통 — h32 / px12 / py7 / 13:18 medium

const VARIANT = {
  recent:
    'bg-[var(--primitive-white)] border border-solid border-[var(--primitive-blueblack-700)] text-[var(--primitive-black-100)]',
  recommended:
    'bg-[var(--primitive-shopping-purple-900)] text-[var(--primitive-shopping-purple-700)]',
} as const

export default function SearchChip({
  label,
  variant = 'recent',
  onClick,
  onRemove,
  className,
}: SearchChipProps) {
  return (
    <span
      className={
        className ??
        `inline-flex shrink-0 items-center justify-center gap-[var(--search-chip-gap)] h-[var(--search-chip-h)] px-[var(--search-chip-px)] py-[var(--search-chip-py)] rounded-[var(--search-chip-r)] ${VARIANT[variant]}`
      }
    >
      <button
        type="button"
        onClick={onClick}
        className="whitespace-nowrap text-[length:var(--typeset-md-compact-size)] leading-[var(--typeset-md-compact-lh)] font-medium tracking-[0]"
      >
        {label}
      </button>
      {onRemove && (
        <button
          type="button"
          onClick={onRemove}
          aria-label={`${label} 삭제`}
          className="shrink-0 size-[var(--search-chip-close)]"
        >
          <img src={closeIcon} alt="" aria-hidden className="block size-full" />
        </button>
      )}
    </span>
  )
}
