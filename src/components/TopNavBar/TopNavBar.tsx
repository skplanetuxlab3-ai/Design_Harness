import type { TopNavBarProps, NavTabItem } from './TopNavBar.types'

// ─── Figma CDN 에셋 (7일 만료 — TODO: src/assets/ 로컬 교체) ───
const MY_SHOPPING_ICON = 'https://www.figma.com/api/mcp/asset/34dd19c6-5264-4c85-bf32-034c75bc8d01'
const NOTIFICATION_ICON = 'https://www.figma.com/api/mcp/asset/e844ffb1-0c94-4fde-abdf-c62a9541fd40'

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

// ─── goto chevron (right-pointing) ─────────────────────────────
function GotoChevron() {
  return (
    <svg
      width="9"
      height="10"
      viewBox="0 0 9 10"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
      className="shrink-0"
      style={{ opacity: 0.6 }}
    >
      <path
        d="M3 2L6.5 5L3 8"
        stroke="white"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
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
      className="flex h-[42px] items-center justify-between overflow-hidden w-full"
      style={{ backgroundColor: 'var(--filled-primary-surface)', paddingInline: '20px' }}
    >
      {regularTabs.map((tab, i) => {
        const isActive = activeIndex === i
        return (
          <button
            key={i}
            type="button"
            onClick={() => onTabChange?.(i)}
            className="flex-1 h-full flex flex-col items-center justify-end pb-[5px] pt-[12px] gap-[2px] min-w-0"
          >
            <span
              className={`text-[14px] leading-[20px] tracking-[0] whitespace-nowrap text-[var(--primitive-white)] ${isActive ? 'font-bold' : 'font-normal opacity-60'}`}
            >
              {tab.label}
            </span>
            {isActive ? <ActiveDot /> : <div className="size-[3px] shrink-0" />}
          </button>
        )
      })}

      {/* Trailing BTN */}
      {trailingTab && (
        <button
          type="button"
          onClick={onMoreClick}
          className="flex-1 h-full flex items-center justify-center gap-px pt-[2px]"
        >
          <span className="text-[14px] leading-[20px] font-normal tracking-[0] text-[var(--primitive-white)] opacity-60 whitespace-nowrap">
            {trailingTab.label}
          </span>
          <GotoChevron />
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
      className="flex h-[52px] items-center justify-between w-full overflow-hidden shrink-0"
      style={{
        backgroundColor: 'var(--filled-primary-surface)',
        paddingLeft: 'var(--top-appbar-left-margin, 20px)',
        paddingRight: '8px',
      }}
    >
      {/* 타이틀 */}
      <span className="flex-1 min-w-0 text-[20px] leading-[28px] font-bold tracking-[0] text-[var(--primitive-white)] overflow-hidden text-ellipsis whitespace-nowrap">
        {title}
      </span>
      {/* 아이콘 영역 */}
      <div className="flex items-center">
        {/* 마이쇼핑 아이콘 */}
        <button
          type="button"
          onClick={onMyShoppingClick}
          className="flex items-center justify-center size-[40px] shrink-0"
          aria-label="마이쇼핑"
        >
          <div className="relative size-[24px]">
            <img
              src={MY_SHOPPING_ICON}
              alt=""
              aria-hidden
              className="absolute inset-0 w-full h-full object-contain pointer-events-none"
            />
          </div>
        </button>
        {/* 알림 아이콘 */}
        <button
          type="button"
          onClick={onNotificationClick}
          className="flex items-center justify-center size-[40px] shrink-0"
          aria-label="알림"
        >
          <div className="relative size-[24px]">
            <img
              src={NOTIFICATION_ICON}
              alt=""
              aria-hidden
              className="absolute inset-0 w-full h-full object-contain pointer-events-none"
            />
          </div>
        </button>
      </div>
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
