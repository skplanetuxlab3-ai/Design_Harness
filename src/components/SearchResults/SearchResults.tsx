import AppBar from '../AppBar'
import SearchInput from '../SearchInput'
import CategoryFilter from '../CategoryFilter'
import ProductCard from '../ProductCard'
import NoData from '../NoData'
import type { ProductCardProps } from '../ProductCard/ProductCard.types'

/**
 * SP08_3_검색 결과 — Figma node 19449:147767 (750×780)
 *
 * Figma 프레임에 결과 있음 / 없음 두 상태가 나란히 놓여 있다.
 * 여기서는 items 유무로 갈린다.
 *
 *   top_appbar · search_bar · Category Filter · Primary List | nodata
 */

const CATEGORIES = [
  { label: '전체' },
  { label: '패션의류' },
  { label: '뷰티' },
  { label: '식품' },
  { label: '가전' },
  { label: '생활' },
]

/** Primary List — 2컬럼 매스너리 (Figma 162px 아이템). ShoppingHome 과 같은 배치다. */
function PrimaryList({ items }: { items: ProductCardProps[] }) {
  const left = items.filter((_, i) => i % 2 === 0)
  const right = items.filter((_, i) => i % 2 === 1)
  return (
    <div
      className="flex w-full"
      style={{
        paddingInline: 'var(--plist-px)',
        paddingTop: 'var(--products-spacing-08)',
        paddingBottom: 'var(--plist-pb)',
        columnGap: 'var(--plist-gutter)',
      }}
    >
      {[left, right].map((col, ci) => (
        <div key={ci} className="flex min-w-0 flex-1 flex-col" style={{ rowGap: 'var(--plist-gutter)' }}>
          {col.map((card, i) => (
            <ProductCard key={i} {...card} />
          ))}
        </div>
      ))}
    </div>
  )
}

export default function SearchResults({
  query = '아이폰케이스',
  items = [],
  onBack,
  onEditQuery,
}: {
  query?: string
  items?: ProductCardProps[]
  onBack?: () => void
  onEditQuery?: () => void
}) {
  return (
    <div className="flex w-full flex-col items-start bg-[var(--primitive-white)]">
      <AppBar onBack={onBack} />

      <div className="flex w-full shrink-0 flex-col items-center justify-center px-[var(--search-bar-px)] pb-[var(--search-bar-pb)]">
        <div onClick={onEditQuery}>
          <SearchInput value={query} readOnlyDisplay clearable />
        </div>
      </div>

      <CategoryFilter items={CATEGORIES} activeIndex={0} showExpandBtn />

      {items.length > 0 ? <PrimaryList items={items} /> : <NoData />}
    </div>
  )
}
