import { useState } from 'react'
import TopNavBar from './components/TopNavBar'
import ShoppingHome from './components/ShoppingHome/ShoppingHome'
import GroupbuyingHome from './components/GroupbuyingHome/GroupbuyingHome'
import EcouponHome from './components/EcouponHome/EcouponHome'
import JeoklipHome from './components/JeoklipHome'
import ScrollPromptBanner from './components/ScrollPromptBanner'
import SearchHome from './components/SearchHome'
import SearchTyping from './components/SearchTyping'
import SearchResults from './components/SearchResults'
import ShoppingBridge from './components/ShoppingBridge'
import ShoppingGuide from './components/ShoppingGuide'
import type { SearchResultItemProps } from './components/SearchResultItem/SearchResultItem.types'

/** SP08_1 → SP08_2 → SP08_3 검색 흐름 */
type SearchStep = null | 'home' | 'typing' | 'results'

const SEARCH_RESULTS: SearchResultItemProps[] = [
  { brand: '쿠팡',    title: '카페 아메리카노 T+탕종 파마산 치즈 베이글', discount: '20%', price: '38,200원', point: '1P', stampLabel: '최대 스탬프 2개' },
  { brand: 'G마켓',   title: '마그네틱 카드수납 아이폰 케이스', discount: '31%', price: '18,700원', stampLabel: '최대 스탬프 1개' },
  { brand: 'SSG',    title: '실리콘 슬림핏 아이폰케이스', discount: '18%', price: '9,800원', point: '3P' },
  { brand: '이마트몰', title: '가죽 플립 아이폰 케이스 6종', discount: '27%', price: '24,500원' },
  { brand: '오늘의집', title: '충격흡수 범퍼 아이폰케이스', discount: '15%', price: '14,200원', stampLabel: '최대 스탬프 2개' },
  { brand: '쿠팡',    title: '투명 아크릴 아이폰 하드케이스', discount: '35%', price: '7,900원', point: '2P' },
]
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
  const [search, setSearch] = useState<SearchStep>(null)
  const [query, setQuery] = useState('')
  const [bridge, setBridge] = useState<string | null>(null)
  const [guide, setGuide] = useState(false)
  // 상단 배너 S/L 전환 — 디자인 확인용 토글
  const [bannerL, setBannerL] = useState(true)

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
            <JeoklipHome
              onOpenSearch={() => setSearch('home')}
              onOpenBridge={setBridge}
              onOpenGuide={() => setGuide(true)}
              bannerType={bannerL ? 'L' : 'S'}
            />
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

        {/* 배너 S/L 전환 — 하네스 확인용 */}
        {activeTab === 1 && !guide && !bridge && !search && (
          <button
            type="button"
            onClick={() => setBannerL((v) => !v)}
            className="absolute right-[var(--products-spacing-08)] top-[var(--products-spacing-08)] z-30 rounded-[var(--radius-max)] bg-[var(--primitive-blueblack)] px-[var(--products-spacing-08)] py-[var(--products-spacing-02)] text-[length:var(--typeset-2xs-size)] leading-[var(--typeset-2xs-lh)] font-bold text-[var(--primitive-white)]"
          >
            배너 {bannerL ? 'L' : 'S'}
          </button>
        )}

        {/* 이용가이드 SP08_4 */}
        {guide && (
          <div
            className="absolute inset-0 z-20 flex flex-col overflow-y-auto"
            style={{ msOverflowStyle: 'none', scrollbarWidth: 'none' } as React.CSSProperties}
          >
            <ShoppingGuide
              onClose={() => setGuide(false)}
              onSearch={() => { setGuide(false); setSearch('home') }}
            />
          </div>
        )}

        {/* 쇼핑몰 브릿지 OC19 — 제휴처로 나가기 직전 */}
        {bridge && (
          <div
            className="absolute inset-0 z-20 flex flex-col overflow-y-auto"
            style={{ msOverflowStyle: 'none', scrollbarWidth: 'none' } as React.CSSProperties}
          >
            <ShoppingBridge brand={bridge} onClose={() => setBridge(null)} onGo={() => setBridge(null)} />
          </div>
        )}

        {/* 검색 흐름 SP08_1~3 — 프레임 전체를 덮는 오버레이 */}
        {search && (
          <div
            className="absolute inset-0 z-10 flex flex-col overflow-y-auto bg-[var(--primitive-white)]"
            style={{ msOverflowStyle: 'none', scrollbarWidth: 'none' } as React.CSSProperties}
          >
            {search === 'home' ? (
              <SearchHome
                onBack={() => setSearch(null)}
                onFocusSearch={() => { setQuery('아이폰'); setSearch('typing') }}
                onSelectKeyword={(k) => { setQuery(k); setSearch('results') }}
              />
            ) : search === 'typing' ? (
              <SearchTyping
                query={query}
                onBack={() => setSearch('home')}
                onChange={setQuery}
                onSelect={(k) => { setQuery(k); setSearch('results') }}
              />
            ) : (
              <SearchResults
                query={query}
                items={query.includes('아이폰') ? SEARCH_RESULTS : []}
                onBack={() => setSearch('home')}
                onEditQuery={() => setSearch('typing')}
              />
            )}
          </div>
        )}

        {/* 카테고리별 브랜드 바텀시트 (e쿠폰 펼치기) */}
        <CategorySheet open={catSheetOpen} onClose={() => setCatSheetOpen(false)} />
      </div>
    </div>
  )
}
