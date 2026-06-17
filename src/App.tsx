import { useState } from 'react'
import TopNavBar from './components/TopNavBar'
import AIRecommendSection from './components/AIRecommendSection'

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
            /* 추천 탭 — AI 개인화 추천 영역 최상단 배치 */
            <div>
              <div className="bg-[var(--primitive-white)]">
                <AIRecommendSection
                  onCardClick={(item, rank) =>
                    console.log('[AI추천 클릭]', { rank, item_id: item.id, type: item.type })
                  }
                  onDismiss={(item, rank) =>
                    console.log('[관심없음]', { rank, item_id: item.id })
                  }
                  onSimilar={(item, rank) =>
                    console.log('[비슷한혜택]', { rank, item_id: item.id })
                  }
                />
              </div>

              {/* 하단 기타 콘텐츠 플레이스홀더 */}
              <div className="mt-[8px] bg-[var(--primitive-white)] px-[16px] py-[20px]">
                <p className="text-[14px] font-bold text-[var(--primitive-blueblack)] mb-[12px]">오늘의 기획전</p>
                <div
                  className="w-full rounded-[var(--radius-lg)] flex items-center justify-center"
                  style={{ height: '140px', backgroundColor: 'var(--primitive-black-800)' }}
                  aria-label="배너 이미지 영역 (디자인 에셋 준비 중)"
                >
                  <span className="text-[12px] text-[var(--primitive-blueblack-300)]">배너 이미지 영역</span>
                </div>
              </div>

              <div className="mt-[8px] bg-[var(--primitive-white)] px-[16px] py-[20px]">
                <p className="text-[14px] font-bold text-[var(--primitive-blueblack)] mb-[12px]">인기 브랜드</p>
                <div className="flex gap-[12px] overflow-x-hidden">
                  {['나이키', '올리브영', '스타벅스', 'CGV'].map(name => (
                    <div key={name} className="flex flex-col items-center gap-[6px] shrink-0">
                      <div
                        className="size-[56px] rounded-full"
                        style={{ backgroundColor: 'var(--primitive-black-800)' }}
                        aria-label={`${name} 로고 영역`}
                      />
                      <span className="text-[11px] font-medium text-[var(--primitive-blueblack-300)]">{name}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
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
      </div>
    </div>
  )
}
