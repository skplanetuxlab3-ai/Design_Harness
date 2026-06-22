import { useState } from 'react'
import TopNavBar from './components/TopNavBar'
import ShoppingHome from './components/ShoppingHome/ShoppingHome'
import GroupbuyingHome from './components/GroupbuyingHome/GroupbuyingHome'
import TodayDealHome from './components/TodayDealHome/TodayDealHome'
import EcouponHome from './components/EcouponHome/EcouponHome'
import CategorySheet from './components/CategorySheet'
import BottomNavBar from './components/BottomNavBar'

const SHOPPING_TABS = [
  { label: '추천' },
  { label: '공동구매' },
  { label: '오늘특가' },
  { label: 'e쿠폰' },
  { label: '영화티켓' },
]

function StatusBar() {
  return (
    <div
      className="flex items-center justify-between px-[20px] shrink-0"
      style={{ height: '44px', backgroundColor: 'var(--primitive-sp-black)' }}
    >
      <span className="text-[15px] font-semibold text-[var(--primitive-white)]">9:41</span>
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
            <GroupbuyingHome />
          ) : activeTab === 2 ? (
            <TodayDealHome />
          ) : activeTab === 3 ? (
            <EcouponHome onExpandCategory={() => setCatSheetOpen(true)} />
          ) : (
            /* 다른 탭 플레이스홀더 */
            <div className="flex flex-col items-center justify-center h-full gap-[8px]">
              <div
                className="size-[48px] rounded-full"
                style={{ backgroundColor: 'var(--primitive-black-800)' }}
                aria-hidden="true"
              />
              <p className="text-[14px] font-semibold text-[var(--primitive-blueblack)]">
                {SHOPPING_TABS[activeTab]?.label}
              </p>
              <p className="text-[13px] text-[var(--primitive-blueblack-300)]">준비 중입니다</p>
            </div>
          )}
        </div>

        {/* 하단 네비게이션 */}
        <BottomNavBar activeIndex={3} />

        {/* 카테고리별 브랜드 바텀시트 (e쿠폰 펼치기) */}
        <CategorySheet open={catSheetOpen} onClose={() => setCatSheetOpen(false)} />
      </div>
    </div>
  )
}
