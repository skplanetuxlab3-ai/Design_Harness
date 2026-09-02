import AppBar from '../../components/AppBar'
import SearchInput from '../../components/SearchInput'
import SearchSuggestList from '../../components/SearchSuggestList'
import KeyboardMock from '../../components/KeyboardMock'

/**
 * SP08_2_검색중 — Figma node 19449:147721 (360×780)
 *
 *   top_appbar · search_bar · 제안 목록 · 키보드
 */
export default function SearchTyping({
  query = '아이폰',
  onBack,
  onSelect,
  onChange,
}: {
  query?: string
  onBack?: () => void
  onSelect?: (keyword: string) => void
  onChange?: (value: string) => void
}) {
  return (
    <div className="flex h-full w-full flex-col items-start bg-[var(--primitive-white)]">
      <AppBar onBack={onBack} />

      {/* Search bar 19449:147728 */}
      <div className="flex w-full shrink-0 flex-col items-center justify-center px-[var(--search-bar-px)] pb-[var(--search-bar-pb)] bg-[var(--primitive-white)]">
        <SearchInput value={query} onChange={onChange} showCaret clearable onClear={() => onChange?.('')} />
      </div>

      <SearchSuggestList query={query} onSelect={onSelect} />
      <KeyboardMock />
    </div>
  )
}
