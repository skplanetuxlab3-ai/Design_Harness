import type { BottomNavBarProps, BottomNavItem, BottomNavIconLayer } from './BottomNavBar.types'

// ─── Figma CDN 에셋 (node 20312-39617, 7일 만료 — TODO: src/assets/ 로컬 교체) ───
const ICO_APPTECH      = 'https://www.figma.com/api/mcp/asset/4d73e3f5-fe62-4b85-83e4-b944ca62eb36'
const ICO_WALLET       = 'https://www.figma.com/api/mcp/asset/e93569b5-8a31-4747-8788-22675dc75c41'
const ICO_HOME         = 'https://www.figma.com/api/mcp/asset/e254e0f0-018c-4b19-8476-c3ec4ac34271'
const ICO_SHOP_BODY    = 'https://www.figma.com/api/mcp/asset/64c54a5b-0759-4291-8dc8-113da8f13221'
const ICO_SHOP_HANDLE  = 'https://www.figma.com/api/mcp/asset/ca3f26da-cb97-4a7e-befd-a9a4d0fc7ea1'
const ICO_ALLMENU      = 'https://www.figma.com/api/mcp/asset/fbe85f06-f313-4a9b-8e1e-6c51f5a5efbd'

// Figma 24px 박스 내 정확한 inset 적용
export const DEFAULT_BOTTOM_NAV_ITEMS: BottomNavItem[] = [
  { label: '적립', icon: [{ src: ICO_APPTECH, inset: '8.33% 10.42% 10.42% 8.33%' }] },
  { label: '사용', icon: [{ src: ICO_WALLET }] },
  { label: '홈',   icon: [{ src: ICO_HOME, inset: '7.71% 9.38% 9.38% 9.38%' }] },
  { label: '쇼핑', icon: [
    { src: ICO_SHOP_BODY, inset: '5.21% 32.81% 60.11% 32.8%', innerInset: '-6.01% -6.06%' },
    { src: ICO_SHOP_HANDLE, inset: '25% 12.51% 12.5% 12.49%' },
  ] },
  { label: '메뉴', icon: [{ src: ICO_ALLMENU, inset: '9.38% 13.07% 13.07% 9.38%' }] },
]

function IconLayer({ layer }: { layer: BottomNavIconLayer }) {
  const img = (
    <img
      src={layer.src}
      alt=""
      aria-hidden
      className="absolute inset-0 w-full h-full max-w-none pointer-events-none"
    />
  )
  return (
    <div className="absolute" style={{ inset: layer.inset ?? '0' }}>
      {layer.innerInset ? (
        <div className="absolute" style={{ inset: layer.innerInset }}>{img}</div>
      ) : (
        img
      )}
    </div>
  )
}

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
        backgroundColor: 'var(--bottom-appbar-surface)',
        borderTop: 'var(--bottom-appbar-border-w) solid var(--bottom-appbar-border)',
        borderLeft: 'var(--bottom-appbar-border-w) solid var(--bottom-appbar-border)',
        borderRight: 'var(--bottom-appbar-border-w) solid var(--bottom-appbar-border)',
        borderRadius: 'var(--bottom-appbar-radius-top) var(--bottom-appbar-radius-top) 0 0',
        paddingInline: 'var(--bottom-appbar-px)',
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
            className="flex flex-1 flex-col items-center min-w-0"
            style={{
              paddingInline: 'var(--bottom-appbar-item-px)',
              paddingBlock: 'var(--bottom-appbar-item-py)',
            }}
            aria-current={isActive ? 'page' : undefined}
          >
            <div
              className="relative shrink-0 overflow-clip"
              style={{ width: 'var(--bottom-appbar-icon-size)', height: 'var(--bottom-appbar-icon-size)' }}
            >
              {item.icon.map((layer, li) => (
                <IconLayer key={li} layer={layer} />
              ))}
            </div>
            {/* 라벨 — Figma: 활성/비활성 동일 (typeset_xs_regular, color/black, weight 400) */}
            <p
              className="font-normal text-center w-full min-w-full"
              style={{
                fontSize: 'var(--typeset-xs-size)',
                lineHeight: 'var(--typeset-xs-lh)',
                letterSpacing: 'var(--typeset-xs-tracking)',
                color: 'var(--bottom-appbar-label)',
              }}
            >
              {item.label}
            </p>
          </button>
        )
      })}
    </div>
  )
}
