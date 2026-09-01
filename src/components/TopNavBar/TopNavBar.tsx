import type { TopNavBarProps, NavTabItem } from './TopNavBar.types'

import Tab from '../Tab'
import icoNotification from '../../assets/icon-notification_2038-252.svg'

// 로컬 에셋 — OCB PDS 3.0, ico / 24 / notification (node 2038:252)

// TODO: MY쇼핑 아이콘은 아직 Figma에서 원본을 못 찾음 (PDS 파일에 없음)
const MY_SHOPPING_ICON = 'https://www.figma.com/api/mcp/asset/9a12debd-5f26-460e-98e7-8f72a5e12e5c'

const DEFAULT_TABS: NavTabItem[] = [
  { label: '메뉴명' },
  { label: '메뉴명' },
  { label: '메뉴명' },
  { label: '메뉴명' },
  { label: '메뉴명' },
]

// ─── 탭 바 ─────────────────────────────────────────────────────
// Figma `Navigation bar` (2474:116649) = Tab 인스턴스 4개 + Trailing BTN.
// Trailing BTN(2474:116630)은 Tab 의 Type=Icon variant 인스턴스다 — 별도 구현이 아니다.
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
      role="tablist"
      className="flex items-center overflow-hidden w-full"
      style={{
        height: 'var(--top-nav-bar-height)',
        backgroundColor: 'var(--top-appbar-surface, var(--filled-primary-surface))',
        paddingInline: 'var(--top-nav-padding-inline)',
        gap: 'var(--top-nav-tab-gap)',
      }}
    >
      {regularTabs.map((tab, i) => (
        <Tab
          key={i}
          label={tab.label}
          active={activeIndex === i}
          fill
          onClick={() => onTabChange?.(i)}
        />
      ))}

      {trailingTab && (
        <Tab
          type="Icon"
          label={trailingTab.label}
          active={false}
          fill
          onClick={() => onMoreClick?.()}
        />
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
        <p className="flex-[1_0_0] min-w-px text-[length:var(--typeset-2xl-size)] leading-[var(--typeset-2xl-lh)] font-bold tracking-[0] text-[var(--primitive-white)] overflow-hidden text-ellipsis whitespace-nowrap">
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
            <div className="absolute left-0 top-[var(--top-appbar-icon-offset-y)] w-full h-[18px]">
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

      {/* 알림 아이콘 — 40×40 touch target, 24×24 풀프레임 아이콘 */}
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
          <img
            src={icoNotification}
            alt=""
            aria-hidden
            className="absolute inset-0 w-full h-full pointer-events-none"
          />
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
