import PromoBanner from '../PromoBanner'
import PointSummary from '../PointSummary'
import StampCard from '../StampCard'
import SectionTitle from '../SectionTitle'
import CategoryFilter from '../CategoryFilter'
import BrandShortcutList from '../BrandShortcutList'
import NotificationSetting from '../NotificationSetting'

/**
 * SP08_적립쇼핑 — Figma node 19550:129755 (360×2409)
 *
 * 섹션 구성
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

export default function JeoklipHome() {
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
    </div>
  )
}
