import PromoBanner from '../PromoBanner'
import PointSummary from '../PointSummary'
import StampCard from '../StampCard'
import SectionTitle from '../SectionTitle'
import CategoryFilter from '../CategoryFilter'
import BrandShortcutList from '../BrandShortcutList'
import NotificationSetting from '../NotificationSetting'
import SearchInput from '../SearchInput'
import ProductCard from '../ProductCard'
import type { ProductCardProps } from '../ProductCard/ProductCard.types'

/**
 * SP08_적립쇼핑 — Figma node 19550:129755 (360×2409)
 *
 *   Header(TopNavBar 재사용) · Monthly Stats · Store Categories
 *   notification · Bonus Shopping · footer · Bottom group
 */

const STORE_CATEGORIES = [
  { label: '인기', showFire: true },
  { label: '패션' },
  { label: '뷰티' },
  { label: '리빙' },
  { label: '가전' },
  { label: '식품' },
]

const BONUS_CATEGORIES = [
  { label: '전체' },
  { label: '패션의류' },
  { label: '뷰티' },
  { label: '식품' },
  { label: '가전' },
  { label: '생활' },
]

// Secondary List (19550:129841) — Elements / Items / 3grid 12개
const BONUS_ITEMS: ProductCardProps[] = [
  { type: 'Outbound', title: '완벽세척 통세척 살균 가습기 HUB300A', showDiscount: true, discount: '24%', price: '88,000원', showRating: true, rating: '4.1', reviewCount: '368', showTag: true, pointLabel: '1,640P 적립' },
  { type: 'Outbound', title: '스마일 옐로우 9종 굿즈 기프트 세트', showDiscount: true, discount: '30%', price: '27,000원', showRating: true, rating: '4.9', reviewCount: '2,387', showTag: true, pointLabel: '520P 적립' },
  { type: 'Outbound', title: '무선 핸디 선풍기 3단 풍속', showDiscount: true, discount: '15%', price: '12,900원', showRating: true, rating: '4.5', reviewCount: '921', showTag: true, pointLabel: '250P 적립' },
  { type: 'Outbound', title: '스트라이프 코튼 바스타월 70x140cm', showDiscount: true, discount: '25%', price: '5,300원', showRating: true, rating: '4.3', reviewCount: '764', showTag: true, pointLabel: '180P 적립' },
  { type: 'Outbound', title: '아이깨끗해 세퓨마 핸드솝 1+1', showDiscount: true, discount: '12%', price: '6,210원', showRating: true, rating: '5.0', reviewCount: '1,881', showTag: true, pointLabel: '210P 적립' },
  { type: 'Outbound', title: '보온보냉 스테인리스 텀블러 500ml', showDiscount: true, discount: '35%', price: '19,800원', showRating: true, rating: '4.7', reviewCount: '540', showTag: true, pointLabel: '600P 적립' },
  { type: 'Outbound', title: '접이식 알루미늄 빨래건조대', showDiscount: true, discount: '20%', price: '32,000원', showRating: true, rating: '4.2', reviewCount: '312', showTag: true, pointLabel: '900P 적립' },
  { type: 'Outbound', title: '유기농 아기 기저귀 대형 4팩', showDiscount: true, discount: '18%', price: '45,900원', showRating: true, rating: '4.8', reviewCount: '2,104', showTag: true, pointLabel: '1,300P 적립' },
  { type: 'Outbound', title: '캠핑용 LED 랜턴 충전식', showDiscount: true, discount: '28%', price: '23,400원', showRating: true, rating: '4.6', reviewCount: '688', showTag: true, pointLabel: '700P 적립' },
  { type: 'Outbound', title: '실리콘 주방 조리도구 6종 세트', showDiscount: true, discount: '22%', price: '16,700원', showRating: true, rating: '4.4', reviewCount: '455', showTag: true, pointLabel: '480P 적립' },
  { type: 'Outbound', title: '겨울 극세사 침구 세트 퀸', showDiscount: true, discount: '40%', price: '59,000원', showRating: true, rating: '4.9', reviewCount: '1,247', showTag: true, pointLabel: '1,700P 적립' },
  { type: 'Outbound', title: '휴대용 미니 가습기 USB', showDiscount: true, discount: '33%', price: '9,900원', showRating: true, rating: '4.0', reviewCount: '203', showTag: true, pointLabel: '290P 적립' },
]

/** Secondary List — 3컬럼 그리드. ShoppingHome 은 2컬럼이라 별개다. */
function BonusList({ items }: { items: ProductCardProps[] }) {
  const cols: ProductCardProps[][] = [[], [], []]
  items.forEach((it, i) => cols[i % 3].push(it))
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
      {cols.map((col, ci) => (
        <div key={ci} className="flex min-w-0 flex-1 flex-col" style={{ rowGap: 'var(--plist-gutter)' }}>
          {col.map((card, i) => (
            <ProductCard key={i} {...card} />
          ))}
        </div>
      ))}
    </div>
  )
}

export default function JeoklipHome({ onOpenSearch }: { onOpenSearch?: () => void } = {}) {
  return (
    <div className="flex w-full flex-col items-start bg-[var(--primitive-white)]">
      {/* ── Monthly Stats 19550:129760 ───────────────────────── */}
      <section className="flex w-full flex-col items-start" aria-label="이달의 적립 현황">
        <PromoBanner />
        <PointSummary />
        <StampCard />
      </section>

      {/* ── Store Categories 19550:129826 ────────────────────── */}
      <section className="flex w-full flex-col items-start" aria-label="쇼핑몰 바로가기">
        <SectionTitle title="쇼핑몰 바로가기" />
        <CategoryFilter items={STORE_CATEGORIES} activeIndex={0} showExpandBtn />
        <BrandShortcutList />
      </section>

      {/* ── notification area 19960:176168 ───────────────────── */}
      <div className="w-full px-[var(--products-spacing-14)] py-[var(--products-spacing-08)]">
        <NotificationSetting />
      </div>

      {/* ── Bonus Shopping 19550:129836 ──────────────────────── */}
      <section className="flex w-full flex-col items-start" aria-label="보너스 적립쇼핑">
        <SectionTitle title="보너스 적립쇼핑" />
        <div className="w-full px-[var(--products-spacing-14)] py-[var(--products-spacing-08)]" onClick={onOpenSearch}>
          <SearchInput readOnlyDisplay />
        </div>
        <CategoryFilter items={BONUS_CATEGORIES} activeIndex={0} showExpandBtn />
        <BonusList items={BONUS_ITEMS} />
      </section>
    </div>
  )
}
