import { useState } from 'react'
import type { SearchInputProps } from './SearchInput.types'
// Figma: search_input 19550:129839
import searchIcon from '../../assets/icon-search-28_5214-9824.svg'

export default function SearchInput({
  placeholder = '상품을 검색해 보세요',
  value,
  onChange,
  onSubmit,
  className,
}: SearchInputProps) {
  const [inner, setInner] = useState('')
  const v = value ?? inner

  const set = (next: string) => {
    if (value === undefined) setInner(next)
    onChange?.(next)
  }

  return (
    <form
      onSubmit={(e) => { e.preventDefault(); onSubmit?.(v) }}
      className={
        className ??
        'flex w-full items-center gap-[var(--search-input-gap)] rounded-[var(--search-input-r)] bg-[var(--primitive-black-800)] pl-[var(--search-input-pl)] pr-[var(--search-input-pr)] py-[var(--search-input-py)]'
      }
    >
      <input
        type="search"
        value={v}
        onChange={(e) => set(e.target.value)}
        placeholder={placeholder}
        aria-label="상품 검색"
        className="min-w-0 flex-1 bg-transparent outline-none focus-visible:ring-2 focus-visible:ring-[var(--primitive-shopping-purple-600)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--primitive-black-800)] rounded-[var(--radius-050)] text-[length:var(--typeset-md-size)] leading-[var(--typeset-md-lh)] font-normal text-[var(--primitive-blueblack-100)] placeholder:text-[var(--primitive-black-300)]"
      />
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
    </form>
  )
}
