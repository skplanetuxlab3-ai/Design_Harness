import { useState } from 'react'
import type { NoticeAccordionProps } from './NoticeAccordion.types'
// Figma: 유의사항 19532:140294 (OC19_쇼핑몰 브릿지)
import dropdownIcon from '../../assets/icon-dropdown-up_19532-140300.svg'

/** 접히는 유의사항 목록. 열림 상태에서 불릿 항목이 나온다. */
export default function NoticeAccordion({
  title,
  items,
  defaultOpen = true,
  className,
}: NoticeAccordionProps) {
  const [open, setOpen] = useState(defaultOpen)
  return (
    <div className={className ?? 'flex w-full flex-col items-start gap-[var(--bridge-notice-gap)]'}>
      <button
        type="button"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-start justify-between py-[var(--bridge-accordion-py)] text-left"
      >
        <span className="min-w-0 flex-1 text-[length:var(--typeset-md-compact-size)] leading-[var(--typeset-md-compact-lh)] font-normal text-[var(--semantic-label-strong)] tracking-[0]">
          {title}
        </span>
        <span className="relative flex shrink-0 items-center justify-center size-[var(--bridge-accordion-icon)]">
          <img
            src={dropdownIcon}
            alt=""
            aria-hidden
            className="block size-[var(--bridge-dropdown-icon)] transition-transform motion-reduce:transition-none"
            style={{ transform: open ? 'none' : 'rotate(180deg)' }}
          />
        </span>
      </button>
      {open && (
        <ul className="flex w-full flex-col items-start gap-[var(--bridge-bullet-gap)]">
          {items.map((it, i) => (
            <li
              key={i}
              className="flex w-full items-start gap-[var(--products-spacing-04)] text-[length:var(--typeset-sm-size)] leading-[var(--typeset-sm-lh)] font-normal text-[var(--semantic-label-alternative)] tracking-[0]"
            >
              <span aria-hidden className="shrink-0">·</span>
              <span className="min-w-0 flex-1">{it}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
