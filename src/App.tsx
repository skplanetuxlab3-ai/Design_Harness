import { useState } from 'react'
import TopNavBar from './components/TopNavBar'
import ShoppingHome from './components/ShoppingHome/ShoppingHome'
import GroupbuyingHome from './components/GroupbuyingHome/GroupbuyingHome'
import EcouponHome from './components/EcouponHome/EcouponHome'
import JeoklipHome from './components/JeoklipHome'
import ScrollPromptBanner from './components/ScrollPromptBanner'
import CategorySheet from './components/CategorySheet'
import BottomNavBar from './components/BottomNavBar'

// Figma SP08_적립쇼핑 (19550:129755) 기준. 마지막 항목은 Trailing BTN 으로 렌더된다.
const SHOPPING_TABS = [
  { label: '추천' },
  { label: '적립쇼핑', sublabel: 'NEW' },
  { label: '공동구매', sublabel: '최저가' },
  { label: 'e쿠폰' },
  { label: '영화티켓', sublabel: '4천원 할인' },
]

function StatusBar() {
  return (
    <div
      className="flex items-center justify-between px-[var(--spacing-5)] shrink-0"
      style={{ height: '44px', backgroundColor: 'var(--primitive-sp-black)' }}
    >
      <span className="text-[length:var(--typeset-lg-compact-size)] font-semibold text-[var(--primitive-white)]">9:41</span>
      <div className="flex items-center gap-[6px]">
        {/* 시그널 아이콘 플레이스홀더 */}
        <div className="w-[16px] h-[10px] rounded-[2px] bg-[var(--primitive-white-opacity-800)]" aria-hidden="true" />
        <div className="w-[15px] h-[10px] rounded-[2px] bg-[var(--primitive-white-opacity-800)]" aria-hidden="true" />
        <div className="w-[25px] h-[12px] rounded-[3px] border border-[var(--primitive-white-opacity-800)] bg-transparent relative" aria-hidden="true">
          <div className="absolute inset-[2px] left-[2px] right-[4px] bg-[var(--primitive-white-opacity-800)] rounded-[1px]" />
        </div>
      </div>
    </div>
  )
}

export default function App() {
  const [activeTab, setActiveTab] = useState(0)
  const [catSheetOpen, setCatSheetOpen] = useState(false)

  return (
    <div className="min-h-screen bg-[var(--primitive-black-800)] flex items-center justify-center p-[var(--spacing-8)]">
      {/* 모바일 프레임 */}
      <div
        className="relative bg-[var(--primitive-white)] flex flex-col overflow-hidden"
        style={{
          width: '375px',
          height: '812px',
          borderRadius: '44px',
          boxShadow: '0 24px 64px rgba(0,0,0,0.24), 0 0 0 1px rgba(0,0,0,0.1)',
        }}
      >
        {/* 상태바 */}
        <StatusBar />

        {/* TopNavBar — 하네스 컴포넌트 */}
        <TopNavBar
          variant="Default"
          title="쇼핑"
          tabs={SHOPPING_TABS}
          activeIndex={activeTab}
          onTabChange={setActiveTab}
        />

        {/* 탭 콘텐츠 영역 */}
        <div
          className="flex-1 overflow-y-auto"
          style={{
            backgroundColor: 'var(--color-theme-bg-light)',
            msOverflowStyle: 'none',
            scrollbarWidth: 'none',
          } as React.CSSProperties}
        >
          {activeTab === 0 ? (
            <ShoppingHome />
          ) : activeTab === 1 ? (
            <JeoklipHome />
          ) : activeTab === 2 ? (
            <GroupbuyingHome />
          ) : activeTab === 3 ? (
            <EcouponHome onExpandCategory={() => setCatSheetOpen(true)} />
          ) : (
            /* 다른 탭 플레이스홀더 */
            <div className="flex flex-col items-center justify-center h-full gap-[var(--spacing-2)]">
              <div
                className="size-[48px] rounded-full"
                style={{ backgroundColor: 'var(--primitive-black-800)' }}
                aria-hidden="true"
              />
              <p className="text-[length:var(--typeset-md-size)] font-semibold text-[var(--primitive-blueblack)]">
                {SHOPPING_TABS[activeTab]?.label}
              </p>
              <p className="text-[length:var(--typeset-md-compact-size)] text-[var(--primitive-blueblack-300)]">준비 중입니다</p>
            </div>
          )}
        </div>

        {/* Bottom group 19550:129843 — 적립쇼핑에만 뜨는 하단 오버레이 */}
        {activeTab === 1 && (
          <>
            <div
              className="pointer-events-none absolute left-0 right-0"
              style={{
                bottom: 'var(--bottom-appbar-h, 56px)',
                height: 'var(--scroll-fade-h)',
                background: 'var(--scroll-fade-gradient)',
              }}
              aria-hidden
            />
            <div
              className="absolute left-1/2 -translate-x-1/2"
              style={{ bottom: 'var(--scroll-prompt-bottom)' }}
            >
              <ScrollPromptBanner />
            </div>
          </>
        )}

        {/* 하단 네비게이션 */}
        <BottomNavBar activeIndex={3} />

        {/* 카테고리별 브랜드 바텀시트 (e쿠폰 펼치기) */}
        <CategorySheet open={catSheetOpen} onClose={() => setCatSheetOpen(false)} />
      </div>
    </div>
  )
}
