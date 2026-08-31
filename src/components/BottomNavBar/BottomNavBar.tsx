import type { BottomNavBarProps, BottomNavItem, BottomNavIconLayer } from './BottomNavBar.types'

import icoApptech from '../../assets/icon-apptech_1472-11343.svg'
import icoWallet from '../../assets/icon-wallet_1472-11343.svg'
import icoHome from '../../assets/icon-home_1472-11343.svg'
import icoShopping from '../../assets/icon-shopping_1472-11343.svg'
import icoAllmenu from '../../assets/icon-allmenu_1472-11343.svg'

// ─── 로컬 에셋 (Figma bottom_appbar, node 1472:11343) ───
// 전부 24×24 풀프레임 SVG라 inset 보정이 필요 없다.
// (기존 CDN 에셋은 잘린 조각이라 inset으로 위치를 맞춰야 했다)

export const DEFAULT_BOTTOM_NAV_ITEMS: BottomNavItem[] = [
  { label: '적립', icon: [{ src: icoApptech }] },
  { label: '사용', icon: [{ src: icoWallet }] },
  { label: '홈',   icon: [{ src: icoHome }] },
  { label: '쇼핑', icon: [{ src: icoShopping }] },
  { label: '메뉴', icon: [{ src: icoAllmenu }] },
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
