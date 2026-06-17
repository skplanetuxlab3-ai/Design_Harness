import type { TopNavBarProps, NavTabItem } from './TopNavBar.types'

// ─── Figma CDN 에셋 (7일 만료 — TODO: src/assets/ 로컬 교체) ───
const MY_SHOPPING_ICON = 'https://www.figma.com/api/mcp/asset/9a12debd-5f26-460e-98e7-8f72a5e12e5c'
const NOTIFICATION_ICON = 'https://www.figma.com/api/mcp/asset/afc806a1-f8af-4d27-ba2b-8eaad3bc7176'

const DEFAULT_TABS: NavTabItem[] = [
  { label: '메뉴명' },
  { label: '메뉴명' },
  { label: '메뉴명' },
  { label: '메뉴명' },
  { label: '메뉴명' },
]

// ─── Active 탭 언더 도트 ────────────────────────────────────────
function ActiveDot() {
  return (
    <div
      className="shrink-0 size-[3px] rounded-full"
      style={{ backgroundColor: 'var(--color-brand-ocb-pink)' }}
      aria-hidden
    />
  )
}

// ─── Goto chevron (Trailing BTN 전용, 12×12) ───────────────────
function GotoChevron() {
  return (
    <div
      className="shrink-0 opacity-60 overflow-clip"
      style={{
        width: 'var(--top-nav-trailing-icon-size)',
        height: 'var(--top-nav-trailing-icon-size)',
      }}
      aria-hidden
    >
      <svg
        width="9"
        height="10"
        viewBox="0 0 9 10"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ display: 'block', margin: '1px 1.5px' }}
      >
        <path
          d="M3 2L6.5 5L3 8"
          stroke="white"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  )
}

// ─── 탭 바 ─────────────────────────────────────────────────────
function NavBar({
  tabs,
  activeIndex,
  onTabChange,
  onMoreClick,
}: {
  tabs: NavTabItem[]
  activeIndex: number
  onTabChange?: (i: number) => void
  onMoreClick?: () => void
}) {
  const regularTabs = tabs.slice(0, -1)
  const trailingTab = tabs[tabs.length - 1]

  return (
    <div
      className="flex items-center overflow-hidden w-full"
      style={{
        height: 'var(--top-nav-bar-height)',
        backgroundColor: 'var(--top-appbar-surface, var(--filled-primary-surface))',
        paddingInline: 'var(--top-nav-padding-inline)',
        gap: 'var(--top-nav-tab-gap)',
      }}
    >
      {/* 일반 탭 */}
      {regularTabs.map((tab, i) => {
        const isActive = activeIndex === i
        return (
          <button
            key={i}
            type="button"
            onClick={() => onTabChange?.(i)}
            className="flex-1 h-full min-w-0"
          >
            {isActive ? (
              /* Active: flex-col, label + dot 스택 */
              <div
                className="flex flex-col items-center size-full"
                style={{
                  paddingTop: 'var(--top-nav-tab-pt)',
                  paddingBottom: 'var(--top-nav-tab-pb)',
                  gap: 'var(--top-nav-tab-dot-gap)',
                }}
              >
                <span className="text-[14px] leading-[20px] font-bold tracking-[0] whitespace-nowrap text-[var(--primitive-white)]">
                  {tab.label}
                </span>
                <ActiveDot />
              </div>
            ) : (
              /* Inactive: flex-row, 중앙 정렬 */
              <div
                className="flex items-center justify-center size-full"
                style={{ paddingTop: 'var(--top-nav-inactive-tab-pt)' }}
              >
                <span className="text-[14px] leading-[20px] font-normal tracking-[0] whitespace-nowrap text-[var(--primitive-white)] opacity-60">
                  {tab.label}
                </span>
              </div>
            )}
          </button>
        )
      })}

      {/* Trailing BTN */}
      {trailingTab && (
        <button
          type="button"
          onClick={onMoreClick}
          className="flex-1 h-full min-w-0"
        >
          <div
            className="flex items-center justify-center size-full"
            style={{ paddingTop: 'var(--top-nav-inactive-tab-pt)' }}
          >
            <div className="flex items-center" style={{ gap: '1px' }}>
              <span className="text-[14px] leading-[20px] font-normal tracking-[0] whitespace-nowrap text-[var(--primitive-white)] opacity-60">
                {trailingTab.label}
              </span>
              <GotoChevron />
            </div>
          </div>
        </button>
      )}
    </div>
  )
}

// ─── Top Appbar (타이틀 + 아이콘) ──────────────────────────────
function TopAppbar({
  title = '쇼핑',
  onMyShoppingClick,
  onNotificationClick,
}: {
  title?: string
  onMyShoppingClick?: () => void
  onNotificationClick?: () => void
}) {
  return (
    <div
      className="flex items-center justify-end w-full shrink-0"
      style={{
        height: 'var(--top-appbar-height)',
        backgroundColor: 'var(--top-appbar-surface, var(--filled-primary-surface))',
        paddingLeft: 'var(--top-nav-padding-inline)',
        paddingRight: 'var(--top-appbar-pr)',
      }}
    >
      {/* 타이틀 영역 — flex-[1_0_0] + min-w-px (Figma 스펙) */}
      <div className="flex flex-[1_0_0] items-center min-w-px">
        <p className="flex-[1_0_0] min-w-px text-[20px] leading-[28px] font-bold tracking-[0] text-[var(--primitive-white)] overflow-hidden text-ellipsis whitespace-nowrap">
          {title}
        </p>
      </div>

      {/* 마이쇼핑 아이콘 — 40×40 touch target, 24×24 icon, 이미지 18px h, top-[3px] */}
      <button
        type="button"
        onClick={onMyShoppingClick}
        className="flex items-center justify-center overflow-clip shrink-0"
        style={{ width: 'var(--top-appbar-icon-touch)', height: 'var(--top-appbar-icon-touch)' }}
        aria-label="마이쇼핑"
      >
        <div
          className="relative shrink-0"
          style={{ width: 'var(--top-appbar-icon-size)', height: 'var(--top-appbar-icon-size)' }}
        >
          <div className="absolute -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2"
            style={{ width: 'var(--top-appbar-icon-size)', height: 'var(--top-appbar-icon-size)' }}
          >
            <div className="absolute left-0 top-[3px] w-full h-[18px]">
              <img
                src={MY_SHOPPING_ICON}
                alt=""
                aria-hidden
                className="absolute inset-0 w-full h-full object-contain pointer-events-none"
              />
            </div>
          </div>
        </div>
      </button>

      {/* 알림 아이콘 — 40×40 touch target, 24×24 icon, inset % 포지셔닝 */}
      <button
        type="button"
        onClick={onNotificationClick}
        className="flex items-center justify-center overflow-clip shrink-0"
        style={{ width: 'var(--top-appbar-icon-touch)', height: 'var(--top-appbar-icon-touch)' }}
        aria-label="알림"
      >
        <div
          className="relative shrink-0"
          style={{ width: 'var(--top-appbar-icon-size)', height: 'var(--top-appbar-icon-size)' }}
        >
          <div className="absolute" style={{ inset: '8.98% 11.14% 13% 12.11%' }}>
            <img
              src={NOTIFICATION_ICON}
              alt=""
              aria-hidden
              className="absolute inset-0 w-full h-full object-contain pointer-events-none"
            />
          </div>
        </div>
      </button>
    </div>
  )
}

// ─── Main Export ────────────────────────────────────────────────
export default function TopNavBar({
  variant = 'Default',
  title = '쇼핑',
  tabs = DEFAULT_TABS,
  activeIndex = 0,
  className,
  onTabChange,
  onMoreClick,
  onMyShoppingClick,
  onNotificationClick,
}: TopNavBarProps) {
  return (
    <div className={`flex flex-col w-full ${className ?? ''}`}>
      {variant === 'Default' && (
        <TopAppbar
          title={title}
          onMyShoppingClick={onMyShoppingClick}
          onNotificationClick={onNotificationClick}
        />
      )}
      <NavBar
        tabs={tabs}
        activeIndex={activeIndex}
        onTabChange={onTabChange}
        onMoreClick={onMoreClick}
      />
    </div>
  )
}
