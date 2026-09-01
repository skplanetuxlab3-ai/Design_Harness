import PromoBanner from '../PromoBanner'
import PointSummary from '../PointSummary'
import StampCard from '../StampCard'

/**
 * SP08_적립쇼핑 — Figma node 19550:129755 (360×2409)
 *
 * 섹션 구성
 *   Header · Monthly Stats(배너·포인트요약·스탬프카드) · Store Categories
 *   notification · Bonus Shopping(검색·리스트) · footer · Bottom group
 */
export default function JeoklipHome() {
  return (
    <div className="flex w-full flex-col items-start bg-[var(--primitive-white)]">
      {/* ── Monthly Stats 19550:129760 ───────────────────────── */}
      <section className="flex w-full flex-col items-start" aria-label="이달의 적립 현황">
        <PromoBanner />
        <PointSummary />
        <StampCard />
      </section>
    </div>
  )
}
