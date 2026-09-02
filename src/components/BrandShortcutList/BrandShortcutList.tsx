import type { BrandShortcutItem, BrandShortcutListProps } from './BrandShortcutList.types'
// Figma: brand_shortcut 18894:161635 / brand_list_item 19550:129832
import newBadge from '../../assets/icon-badge-new_19382-163647.svg'
import favIcon from '../../assets/icon-brand-fav_19382-166507.svg'
import logoYes24 from '../../assets/logo-yes24_19434-294711.svg'
import logoStamp from '../../assets/logo-shoppingstamp_18894-161627.svg'

/** 쇼핑스탬프 제휴처 로고 배경 — 브랜드가 아니라 스탬프 프로그램 표식이라 토큰이다 */
export const STAMP_LOGO_BG = 'var(--brand-stamp-gradient)'
export const STAMP_LOGO = logoStamp
export const YES24_LOGO = logoYes24

const DEFAULT_ITEMS: BrandShortcutItem[] = [
  { brand: '11번가', benefit: '최대 2% 적립 + 스탬프', logo: logoStamp, logoBackground: STAMP_LOGO_BG, logoInset: '35% 15.04% 35% 15.06%', showNew: true, pill: '3번 구매' },
  { brand: 'YES24', benefit: '최대 3% 적립', logo: logoYes24, logoInset: '36.58% 12.5%' },
  { brand: '롯데온', benefit: '최대 1.5% 적립' },
  { brand: 'G마켓', benefit: '최대 2% 적립' },
  { brand: '옥션', benefit: '최대 2% 적립' },
  { brand: 'SSG', benefit: '최대 1% 적립' },
  { brand: '위메프', benefit: '최대 2.5% 적립' },
  { brand: '인터파크', benefit: '최대 2% 적립' },
  { brand: '티몬', benefit: '최대 3% 적립', showFav: true },
  { brand: '쿠팡', benefit: '최대 2% 적립 + 스탬프', logo: logoStamp, logoBackground: STAMP_LOGO_BG, logoInset: '35% 15.04% 35% 15.06%' },
]

function BrandShortcut({ item }: { item: BrandShortcutItem }) {
  return (
    <button
      type="button"
      onClick={item.onClick}
      className="relative flex shrink-0 items-center gap-[var(--brand-shortcut-gap)] text-left w-[var(--brand-shortcut-w)]"
    >
      <div
        className="relative shrink-0 overflow-clip rounded-[var(--brand-shortcut-logo-r)] size-[var(--brand-shortcut-logo)]"
        style={{ background: item.logoBackground ?? 'var(--primitive-black-800)' }}
      >
        {item.logo && (
          <img
            src={item.logo}
            alt=""
            aria-hidden
            className="absolute block max-w-none size-full"
            style={{ inset: item.logoInset ?? '30%' }}
          />
        )}
      </div>

      <div className="flex min-w-0 flex-col justify-center gap-[var(--products-spacing-02)] items-start">
        <div className="flex items-center">
          <span className="whitespace-nowrap text-[length:var(--typeset-sm-size)] leading-[var(--typeset-sm-lh)] font-normal text-[var(--primitive-black-300)] tracking-[0]">
            {item.brand}
          </span>
          {item.showNew && (
            <span className="relative shrink-0 size-[var(--brand-new-badge)]">
              <img
                src={newBadge}
                alt="새로 추가된 제휴처"
                className="absolute left-1/2 top-1/2 block max-w-none -translate-x-1/2 -translate-y-1/2 size-[var(--brand-new-badge-icon)]"
              />
            </span>
          )}
        </div>
        <span className="whitespace-nowrap text-[length:var(--typeset-md-size)] leading-[var(--typeset-md-lh)] font-bold text-[var(--primitive-blueblack-100)] tracking-[0]">
          {item.benefit}
        </span>
      </div>

      {item.pill && (
        <span
          className="absolute flex flex-col items-center justify-center rounded-[var(--brand-pill-r)] px-[var(--brand-pill-px)] py-px whitespace-nowrap text-center text-[length:var(--typeset-3xs-size)] leading-[var(--typeset-3xs-lh)] font-bold text-[var(--primitive-white)] tracking-[0]"
          style={{ left: 'calc(50% - 72.5px)', top: 'calc(50% - 24px)', transform: 'translate(-50%, -50%)', backgroundImage: 'var(--brand-pill-gradient)' }}
        >
          {item.pill}
        </span>
      )}

      {item.showFav && (
        <img
          src={favIcon}
          alt=""
          aria-hidden
          className="absolute block max-w-none size-[var(--brand-fav-size)]"
          style={{ left: 'var(--brand-fav-left)', top: 'var(--brand-fav-top)' }}
        />
      )}
    </button>
  )
}

export default function BrandShortcutList({
  items = DEFAULT_ITEMS,
  perColumn = 5,
  onSelect,
  className,
}: BrandShortcutListProps) {
  const columns: BrandShortcutItem[][] = []
  for (let i = 0; i < items.length; i += perColumn) columns.push(items.slice(i, i + perColumn))

  return (
    <div
      className={
        className ??
        'flex w-full gap-[var(--brand-col-gap)] overflow-x-auto px-[var(--products-spacing-14)] pt-[var(--products-spacing-08)]'
      }
      style={{ msOverflowStyle: 'none', scrollbarWidth: 'none' } as React.CSSProperties}
    >
      {columns.map((col, ci) => (
        <div
          key={ci}
          className="flex shrink-0 flex-col gap-[var(--brand-shortcut-row-gap)] w-[var(--brand-col-w)]"
        >
          {col.map((it, i) => (
            <BrandShortcut key={i} item={{ ...it, onClick: it.onClick ?? (() => onSelect?.(it.brand)) }} />
          ))}
        </div>
      ))}
    </div>
  )
}
