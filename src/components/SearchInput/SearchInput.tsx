import { useState } from 'react'
import type { SearchInputProps } from './SearchInput.types'
// Figma: search_input 19550:129839 (홈) · search_bar 19449:147729 (검색 화면)
// 컨테이너 스펙은 동일하다 — bg black800 / r12 / pl16 pr12 py8 gap8.
// 다른 건 텍스트 타입셋뿐이다: 플레이스홀더 14/20(md), 입력값 15/20(lg_compact).
import searchIcon from '../../assets/icon-search-28_5214-9824.svg'
import clearIcon from '../../assets/icon-delete-12_7924-105062.svg'

export default function SearchInput({
  placeholder = '상품을 검색해 보세요',
  value,
  showCaret = false,
  clearable = false,
  onChange,
  onSubmit,
  onClear,
  readOnlyDisplay = false,
  className,
}: SearchInputProps) {
  const [inner, setInner] = useState('')
  const v = value ?? inner
  const set = (next: string) => {
    if (value === undefined) setInner(next)
    onChange?.(next)
  }
  const clear = () => { set(''); onClear?.() }

  const typed = v.length > 0
  const textCls = typed
    ? 'text-[length:var(--typeset-lg-compact-size)] leading-[var(--typeset-lg-compact-lh)] text-[var(--primitive-black)]'
    : 'text-[length:var(--typeset-md-size)] leading-[var(--typeset-md-lh)] text-[var(--primitive-blueblack-100)]'

  return (
    <form
      onSubmit={(e) => { e.preventDefault(); onSubmit?.(v) }}
      className={
        className ??
        'flex w-full items-center gap-[var(--search-input-gap)] rounded-[var(--search-input-r)] bg-[var(--primitive-black-800)] pl-[var(--search-input-pl)] pr-[var(--search-input-pr)] py-[var(--search-input-py)]'
      }
    >
      <span className="flex min-w-0 flex-1 items-center gap-[var(--products-spacing-04)]">
        {readOnlyDisplay ? (
          <span className={`min-w-0 truncate font-normal tracking-[0] ${textCls}`}>
            {v || <span className="text-[var(--primitive-black-300)]">{placeholder}</span>}
          </span>
        ) : (
          <input
            type="search"
            value={v}
            onChange={(e) => set(e.target.value)}
            placeholder={placeholder}
            aria-label="상품 검색"
            className={`min-w-0 flex-1 rounded-[var(--radius-050)] bg-transparent font-normal tracking-[0] outline-none placeholder:text-[var(--primitive-black-300)] focus-visible:ring-2 focus-visible:ring-[var(--primitive-shopping-purple-600)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--primitive-black-800)] ${textCls}`}
          />
        )}
        {showCaret && (
          <span
            aria-hidden
            className="block shrink-0 bg-[var(--search-caret)]"
            style={{ width: 'var(--search-caret-w)', height: 'var(--search-caret-h)' }}
          />
        )}
      </span>

      <span className="flex shrink-0 items-center justify-end">
        {clearable && typed && (
          <button
            type="button"
            onClick={clear}
            aria-label="검색어 지우기"
            className="flex shrink-0 items-center justify-center size-[var(--search-clear-area)]"
          >
            <img src={clearIcon} alt="" aria-hidden className="block size-[var(--search-clear-icon)]" />
          </button>
        )}
        <button
          type="submit"
          aria-label="검색"
          className="relative flex shrink-0 items-center justify-center size-[var(--search-input-icon-area)]"
        >
          <img
            src={searchIcon}
            alt=""
            aria-hidden
            className="absolute left-1/2 top-1/2 block max-w-none -translate-x-1/2 -translate-y-1/2 size-[var(--search-input-icon)]"
          />
        </button>
      </span>
    </form>
  )
}
