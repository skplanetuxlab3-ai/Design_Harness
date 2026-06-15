import type { BottomNavBarProps, BottomNavItem } from './BottomNavBar.types'

// ─── Figma CDN 에셋 (7일 만료 — TODO: src/assets/ 로컬 교체) ───
const ICON_EARN    = 'https://www.figma.com/api/mcp/asset/115b61e4-1d3a-492f-b264-bf6949daf6bb'
const ICON_WALLET  = 'https://www.figma.com/api/mcp/asset/67b43d94-7a0e-481b-bd70-1b2039721a49'
const ICON_HOME    = 'https://www.figma.com/api/mcp/asset/724e5fec-4b2d-44f7-8cce-f04653993c3a'
const ICON_SHOPPING_ACTIVE = 'https://www.figma.com/api/mcp/asset/378667b3-377f-494f-a25c-223217d6ca37'
const ICON_MENU    = 'https://www.figma.com/api/mcp/asset/a5037cd0-3eb3-4554-88fb-2ebcea94acad'

export const DEFAULT_BOTTOM_NAV_ITEMS: BottomNavItem[] = [
  { iconUrl: ICON_EARN,    label: '적립' },
  { iconUrl: ICON_WALLET,  label: '사용' },
  { iconUrl: ICON_HOME,    label: '홈' },
  { iconUrl: ICON_SHOPPING_ACTIVE, label: '쇼핑' },
  { iconUrl: ICON_MENU,    label: '메뉴' },
]

export default function BottomNavBar({
  items = DEFAULT_BOTTOM_NAV_ITEMS,
  activeIndex = 3,
  className,
  onSelect,
}: BottomNavBarProps) {
  return (
    <div
      className={`flex items-center w-full ${className ?? ''}`}
      style={{
        backgroundColor: 'var(--primitive-white)',
        borderTop: '0.5px solid var(--primitive-shopping-border)',
        borderLeft: '0.5px solid var(--primitive-shopping-border)',
        borderRight: '0.5px solid var(--primitive-shopping-border)',
        borderRadius: `var(--radius-250) var(--radius-250) 0 0`,
        paddingInline: '8px',
      }}
      role="navigation"
      aria-label="하단 네비게이션"
    >
      {items.map((item, i) => {
        const isActive = activeIndex === i
        return (
          <button
            key={i}
            type="button"
            onClick={() => onSelect?.(i)}
            className="flex flex-1 flex-col items-center min-w-0 px-[4px] py-[8px]"
            aria-current={isActive ? 'page' : undefined}
          >
            <div className="relative size-[24px] shrink-0">
              <img
                src={item.iconUrl}
                alt=""
                aria-hidden
                className="absolute inset-0 w-full h-full object-contain pointer-events-none"
              />
            </div>
            <p
              className={`text-[11px] leading-[16px] tracking-[0] text-center w-full min-w-full ${
                isActive
                  ? 'font-bold text-[var(--primitive-sp-black)]'
                  : 'font-normal text-[var(--primitive-black)]'
              }`}
            >
              {item.label}
            </p>
          </button>
        )
      })}
    </div>
  )
}
