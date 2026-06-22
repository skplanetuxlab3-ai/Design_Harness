import { useState } from 'react'
import ProductCard from '../ProductCard'
import type { ProductCardProps } from '../ProductCard/ProductCard.types'
import CategoryFilter from '../CategoryFilter'

// ── 큐레이션 Offering 데이터 ───────────────────────────────────
const CURATION: ProductCardProps[] = [
  { type: 'GifticonOffering', brand: '파리바게트', title: '파리바게뜨에\n두쫀쿠 재고 있음!', mdTag: 'MD 추천', color: 'Blue' },
  { type: 'GifticonOffering', brand: '파리크라상', title: '밥 먹어도\n빵배는 따로잖아요', mdTag: 'MD 추천', color: 'Pink' },
  { type: 'GifticonOffering', brand: '스타벅스', title: '여름 한정\n신메뉴 출시', mdTag: 'MD 추천', color: 'Mint' },
  { type: 'GifticonOffering', brand: '배스킨라빈스', title: '이달의 맛\n지금 만나보세요', mdTag: 'MD 추천', color: 'Orange' },
]

// ── 브랜드 숏컷 (5×2) ──────────────────────────────────────────
const BRANDS = [
  '올리브영', '메가커피', '배스킨라빈스', '굽네치킨', '도미노피자',
  'BBQ치킨', '스타벅스 여름 한정', 'BHC치킨', '이디야', '컴포즈커피',
]

// ── 헤더 하단 카테고리 서브탭 (Filter 1depth) ──────────────────
const DEPTH1 = [
  { label: '인기', showFire: true },
  { label: '카페' },
  { label: '베이커리' },
  { label: '치킨' },
  { label: '피자∙버거' },
  { label: '생활' },
  { label: '아이스크림' },
  { label: '편의점/마트' },
]

// ── 가격대별 카테고리 필터 (node 20343-21499) ──────────────────
const CATEGORIES = [
  { label: '3천~5천원' },
  { label: '5천~1만원' },
  { label: '1만~2만원' },
  { label: '2만~5만원' },
  { label: '편의점/마트' },
]

// ── 가격대별 인기 상품 (3열 Secondary List) ────────────────────
const PRODUCTS: ProductCardProps[] = [
  { type: 'Outbound', title: '카페 아메리카노 T+탕종 파마산 치즈 베이글', discount: '30%', price: '27,000원', showRating: false, showTag: false },
  { type: 'Outbound', title: '일이삼사오육칠팔구일', discount: '10%', price: '99,000원', showRating: false, showTag: false },
  { type: 'Outbound', title: '일이삼사오육칠팔구일이삼사오육칠팔구', discount: '5%', price: '999,999원', showRating: false, showTag: false },
  { type: 'Outbound', title: '카페 아메리카노 T+탕종 파마산 치즈 베이글', discount: '30%', price: '27,000원', showRating: false, showTag: false },
  { type: 'Outbound', title: '일이삼사오육칠팔구일', discount: '10%', price: '99,000원', showRating: false, showTag: false },
  { type: 'Outbound', title: '일이삼사오육칠팔구일이삼사오육칠팔구', discount: '5%', price: '999,999원', showRating: false, showTag: false },
  { type: 'Outbound', title: '카페 아메리카노 T+탕종 파마산 치즈 베이글', discount: '30%', price: '27,000원', showRating: false, showTag: false },
  { type: 'Outbound', title: '일이삼사오육칠팔구일', discount: '10%', price: '99,000원', showRating: false, showTag: false },
  { type: 'Outbound', title: '일이삼사오육칠팔구일이삼사오육칠팔구', discount: '5%', price: '999,999원', showRating: false, showTag: false },
]

function SectionTitle({ title, viewAll }: { title: string; viewAll?: boolean }) {
  return (
    <div
      className="flex items-center justify-between w-full"
      style={{ paddingTop: 'var(--section-title-pt)', paddingBottom: 'var(--section-title-pb)', paddingInline: 'var(--section-title-px)' }}
    >
      <span className="font-bold" style={{ fontSize: 'var(--card-title-size)', lineHeight: 'var(--card-title-lh)', color: 'var(--ecoupon-section-title)' }}>
        {title}
      </span>
      {viewAll && (
        <button type="button" className="font-normal" style={{ fontSize: 'var(--typeset-sm-size)', lineHeight: 'var(--typeset-sm-lh)', color: 'var(--ecoupon-viewall)' }}>
          전체보기
        </button>
      )}
    </div>
  )
}

function ShortcutItem({ label }: { label: string }) {
  return (
    <button type="button" className="flex flex-col items-center shrink-0" style={{ width: 'var(--ecoupon-shortcut-item-w)', gap: 'var(--ecoupon-shortcut-gap)' }}>
      <span
        className="rounded-full overflow-hidden shrink-0"
        style={{
          width: 'var(--ecoupon-shortcut-circle)',
          height: 'var(--ecoupon-shortcut-circle)',
          backgroundColor: 'var(--ecoupon-shortcut-circle)',
          border: '0.5px solid var(--ecoupon-shortcut-border)',
        }}
      />
      <span
        className="text-center w-full"
        style={{
          fontSize: 'var(--typeset-sm-size)',
          lineHeight: 'var(--typeset-sm-lh)',
          color: 'var(--ecoupon-shortcut-label)',
          display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden',
        }}
      >
        {label}
      </span>
    </button>
  )
}

export default function EcouponHome({ onExpandCategory }: { onExpandCategory?: () => void } = {}) {
  const [depth1Index, setDepth1Index] = useState(0)
  const [catIndex, setCatIndex] = useState(0)

  return (
    <div style={{ backgroundColor: 'var(--ecoupon-surface)' }}>
      {/* ⓪ 헤더 하단 카테고리 서브탭 (Filter 1depth) — sticky */}
      <div className="sticky top-0 z-10" style={{ backgroundColor: 'var(--ecoupon-surface)' }}>
        <CategoryFilter items={DEPTH1} activeIndex={depth1Index} onSelect={setDepth1Index} showExpandBtn onExpand={onExpandCategory} />
      </div>

      {/* ① 큐레이션 — Offering 가로 스크롤 */}
      <div
        className="flex overflow-x-auto"
        style={{ paddingTop: 'var(--ecoupon-curation-pt)', paddingInline: 'var(--ecoupon-curation-px)', gap: 'var(--ecoupon-curation-gap)', scrollbarWidth: 'none' } as React.CSSProperties}
      >
        {CURATION.map((card, i) => (
          <div key={i} className="shrink-0" style={{ width: 'var(--ecoupon-curation-card-w)' }}>
            <ProductCard {...card} />
          </div>
        ))}
      </div>

      {/* ② 많이 찾는 브랜드 — 5×2 숏컷 그리드 */}
      <SectionTitle title="많이 찾는 브랜드" />
      <div
        className="grid"
        style={{
          gridTemplateColumns: 'repeat(5, 1fr)',
          justifyItems: 'center',
          paddingInline: 'var(--ecoupon-shortcut-px)',
          columnGap: 'var(--ecoupon-shortcut-col-gap)',
          rowGap: 'var(--ecoupon-shortcut-row-gap)',
        }}
      >
        {BRANDS.map((b, i) => (
          <ShortcutItem key={i} label={b} />
        ))}
      </div>

      {/* ③ 가격대별 인기 상품 */}
      <SectionTitle title="가격대별 인기 상품" viewAll />
      <CategoryFilter items={CATEGORIES} activeIndex={catIndex} onSelect={setCatIndex} showExpandBtn={false} />
      <div
        className="grid"
        style={{
          gridTemplateColumns: '1fr 1fr 1fr',
          gap: 'var(--slist-gutter)',
          paddingInline: 'var(--slist-px)',
          paddingTop: 'var(--slist-pt)',
          paddingBottom: 'var(--slist-pb)',
        }}
      >
        {PRODUCTS.map((card, i) => (
          <ProductCard key={i} {...card} />
        ))}
      </div>
    </div>
  )
}
