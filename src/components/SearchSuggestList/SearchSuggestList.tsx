import type { SearchSuggestListProps } from './SearchSuggestList.types'
// Figma: list 19449:147730 (SP08_2_검색중)
import searchIcon from '../../assets/icon-search-24_19449-147733.svg'

const DEFAULT_ITEMS = ['아이폰케이스', '아이폰16', '아이폰 프로', '아이폰 배경화면', '아이폰17 프로']

/** 입력한 부분만 보라색으로 — Figma 는 접두어만 강조한다 */
function Highlighted({ text, query }: { text: string; query: string }) {
  if (!query || !text.startsWith(query)) return <>{text}</>
  return (
    <>
      <span className="text-[var(--search-match-text)]">{query}</span>
      <span>{text.slice(query.length)}</span>
    </>
  )
}

export default function SearchSuggestList({
  items = DEFAULT_ITEMS,
  query = '아이폰',
  onSelect,
  className,
}: SearchSuggestListProps) {
  return (
    <div
      className={
        className ??
        'flex w-full flex-1 flex-col items-start gap-[var(--suggest-gap)] p-[var(--suggest-p)]'
      }
      role="listbox"
      aria-label="검색어 제안"
    >
      {items.map((it) => (
        <button
          key={it}
          type="button"
          role="option"
          aria-selected={false}
          onClick={() => onSelect?.(it)}
          className="flex w-full shrink-0 items-center gap-[var(--suggest-row-gap)] text-left"
        >
          <span className="flex shrink-0 items-center justify-center size-[var(--suggest-icon)]">
            <img src={searchIcon} alt="" aria-hidden className="block size-full" />
          </span>
          <span className="whitespace-nowrap text-[length:var(--typeset-md-size)] leading-[var(--typeset-md-lh)] font-normal text-[var(--primitive-black-100)] tracking-[0]">
            <Highlighted text={it} query={query} />
          </span>
        </button>
      ))}
    </div>
  )
}
