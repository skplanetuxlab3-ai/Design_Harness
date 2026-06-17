import { useState } from 'react'
import ProductCard from '../ProductCard'
import type { AIRecommendSectionProps, RecommendItem } from './AIRecommendSection.types'

// ─── 기본 mock 데이터 (5개) ────────────────────────────────────────
const DEFAULT_ITEMS: RecommendItem[] = [
  {
    id: 'r1',
    type: 'Gifticon',
    cardProps: {
      brand: '이니스프리',
      title: '그린티 씨드 세럼 80ml',
      showDiscount: true,
      discount: '41%',
      price: '18,900원',
      showBadge: true,
      badgeLabel: 'e쿠폰',
    },
    reason: '자주 구매하신 뷰티 e쿠폰이에요',
  },
  {
    id: 'r2',
    type: 'HotDeal',
    cardProps: {
      title: '올리브영\n수분크림+세럼 듀오',
      discount: '15%',
      price: '35,700원',
      daysLeft: '3일 남음',
    },
    reason: '포인트 사용 가능한 공동구매예요',
  },
  {
    id: 'r3',
    type: 'GifticonOffering',
    cardProps: {
      brand: '스타벅스',
      title: '아메리카노 Tall',
      color: 'Mint',
      mdTag: '오늘특가',
    },
    reason: '자주 이용하시는 카페 혜택이에요',
  },
  {
    id: 'r4',
    type: 'Movie',
    cardProps: {
      brand: '인사이드 아웃 2',
      filmRating: '12',
      eggRating: '96%',
      bookingRate: '예매율 41.2%',
      rank: '1',
    },
    reason: '오늘 특가 영화 혜택이에요',
  },
  {
    id: 'r5',
    type: 'Outbound',
    cardProps: {
      title: '다이슨 슈퍼소닉 헤어드라이어',
      showDiscount: true,
      discount: '33%',
      price: '399,000원',
      showRating: true,
      rating: '4.8',
      reviewCount: '1,234',
      showTag: true,
      pointLabel: '7,980P 적립',
    },
    reason: '최근 관심 보이신 가전이에요',
  },
]

// ─── Sparkle 아이콘 (AI 표식) ─────────────────────────────────────
function SparkleIcon() {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      className="shrink-0"
    >
      <path
        d="M12 2L14.09 8.26L21 9L15.55 14.14L17.18 21L12 17.77L6.82 21L8.45 14.14L3 9L9.91 8.26L12 2Z"
        fill="var(--color-brand-ocb-pink)"
      />
    </svg>
  )
}

// ─── 피드백 드롭다운 ──────────────────────────────────────────────
function FeedbackMenu({
  onDismiss,
  onSimilar,
  onClose,
}: {
  onDismiss: () => void
  onSimilar: () => void
  onClose: () => void
}) {
  return (
    <div
      role="dialog"
      aria-label="카드 피드백"
      className="absolute bottom-full right-0 mb-[4px] z-30 overflow-hidden rounded-[var(--radius-md)] bg-[var(--primitive-white)] border border-[var(--primitive-blueblack-700)]"
      style={{ boxShadow: '0 4px 16px rgba(0,0,0,0.12)', minWidth: '144px' }}
    >
      <button
        type="button"
        onClick={() => { onDismiss(); onClose() }}
        className="block w-full px-[16px] py-[11px] text-left text-[13px] font-medium text-[var(--primitive-blueblack)] border-b border-[var(--primitive-blueblack-700)] hover:bg-[var(--primitive-black-900)] cursor-pointer"
      >
        관심 없음
      </button>
      <button
        type="button"
        onClick={() => { onSimilar(); onClose() }}
        className="block w-full px-[16px] py-[11px] text-left text-[13px] font-medium text-[var(--primitive-blueblack)] hover:bg-[var(--primitive-black-900)] cursor-pointer"
      >
        비슷한 혜택 더 보기
      </button>
    </div>
  )
}

// ─── 단일 카드 슬롯 ───────────────────────────────────────────────
function CardSlot({
  item,
  rank,
  onCardClick,
  onDismiss,
  onSimilar,
}: {
  item: RecommendItem
  rank: number
  onCardClick: (item: RecommendItem, rank: number) => void
  onDismiss: (item: RecommendItem, rank: number) => void
  onSimilar: (item: RecommendItem, rank: number) => void
}) {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <div className="relative shrink-0 w-[152px] flex flex-col gap-[8px]">
      {/* ProductCard — 이미지 없음 → 컴포넌트 내 투명 플레이스홀더 */}
      <button
        type="button"
        onClick={() => onCardClick(item, rank)}
        aria-label={`${item.cardProps.brand ?? ''} ${item.cardProps.title ?? ''} 상세 보기`}
        className="w-full text-left cursor-pointer bg-transparent border-none p-0"
      >
        <ProductCard type={item.type} {...item.cardProps} />
      </button>

      {/* 추천 이유 문구 + 피드백 버튼 */}
      <div className="flex items-center justify-between gap-[4px] px-[2px]">
        <div className="flex items-center gap-[3px] min-w-0">
          <SparkleIcon />
          <span className="text-[11px] leading-[15px] font-normal text-[var(--primitive-blueblack-300)] overflow-hidden text-ellipsis whitespace-nowrap">
            {item.reason}
          </span>
        </div>

        {/* ⋮ 피드백 버튼 */}
        <div className="relative shrink-0">
          <button
            type="button"
            onClick={() => setMenuOpen(v => !v)}
            aria-label="피드백 메뉴 열기"
            aria-expanded={menuOpen}
            className="flex items-center justify-center size-[20px] rounded-full bg-[var(--primitive-black-800)] border border-[var(--primitive-blueblack-700)] cursor-pointer"
          >
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <circle cx="12" cy="5" r="2" fill="var(--primitive-blueblack-300)" />
              <circle cx="12" cy="12" r="2" fill="var(--primitive-blueblack-300)" />
              <circle cx="12" cy="19" r="2" fill="var(--primitive-blueblack-300)" />
            </svg>
          </button>

          {menuOpen && (
            <>
              {/* 바깥 클릭으로 닫기 */}
              <div
                role="presentation"
                className="fixed inset-0 z-20"
                onClick={() => setMenuOpen(false)}
              />
              <FeedbackMenu
                onDismiss={() => onDismiss(item, rank)}
                onSimilar={() => onSimilar(item, rank)}
                onClose={() => setMenuOpen(false)}
              />
            </>
          )}
        </div>
      </div>
    </div>
  )
}

// ─── Main Component ───────────────────────────────────────────────
export default function AIRecommendSection({
  title = '나를 위한 추천 상품',
  reasoningText = '최근 뷰티 쇼핑 패턴과 넉넉한 OK캐쉬백 포인트를 분석해, 지금 바로 쓰기 좋은 혜택을 골랐어요.',
  items = DEFAULT_ITEMS,
  onCardClick,
  onDismiss,
  onSimilar,
  className,
}: AIRecommendSectionProps) {
  const [dismissedIds, setDismissedIds] = useState<Set<string>>(new Set())

  const visibleItems = items.filter(i => !dismissedIds.has(i.id))

  function handleDismiss(item: RecommendItem, rank: number) {
    setDismissedIds(prev => new Set([...prev, item.id]))
    onDismiss?.(item, rank)
  }

  function handleSimilar(item: RecommendItem, rank: number) {
    onSimilar?.(item, rank)
  }

  function handleCardClick(item: RecommendItem, rank: number) {
    onCardClick?.(item, rank)
  }

  return (
    <section
      aria-labelledby="ai-recommend-title"
      className={className}
    >
      {/* 섹션 헤더 */}
      <div className="flex flex-col gap-[6px] px-[16px] pt-[16px] pb-[14px]">
        {/* AI 배지 */}
        <div
          className="inline-flex items-center gap-[4px] self-start px-[8px] py-[3px] rounded-[var(--radius-max)]"
          style={{ background: 'linear-gradient(90deg, var(--primitive-system-bg-pink), var(--primitive-system-bg-purple))' }}
        >
          <SparkleIcon />
          <span className="text-[11px] leading-[15px] font-bold text-[var(--color-brand-ocb-pink)] tracking-[0.2px]">
            AI 개인화 추천
          </span>
        </div>

        {/* 타이틀 */}
        <h2
          id="ai-recommend-title"
          className="text-[18px] leading-[24px] font-bold text-[var(--primitive-blueblack)] tracking-[-0.4px]"
        >
          {title}
        </h2>

        {/* AI 통합 근거 문구 */}
        <p className="text-[13px] leading-[19px] font-normal text-[var(--primitive-blueblack-300)]">
          {reasoningText}
        </p>
      </div>

      {/* 카드 캐러셀 (좌우 스와이프 — 좌측 정렬, 마진 16px) */}
      <div
        role="list"
        aria-label="AI 추천 상품 목록"
        className="flex items-start gap-[8px] overflow-x-auto pb-[16px]"
        style={{
          marginInline: '16px',
          msOverflowStyle: 'none',
          scrollbarWidth: 'none',
          WebkitOverflowScrolling: 'touch',
        } as React.CSSProperties}
      >
        {visibleItems.length === 0 ? (
          <div className="flex items-center justify-center w-full py-[32px]">
            <p className="text-[13px] text-[var(--primitive-blueblack-300)]">
              표시할 추천이 없어요.
            </p>
          </div>
        ) : (
          visibleItems.map((item, idx) => (
            <div
              key={item.id}
              role="listitem"
            >
              <CardSlot
                item={item}
                rank={idx + 1}
                onCardClick={handleCardClick}
                onDismiss={handleDismiss}
                onSimilar={handleSimilar}
              />
            </div>
          ))
        )}
      </div>
    </section>
  )
}
