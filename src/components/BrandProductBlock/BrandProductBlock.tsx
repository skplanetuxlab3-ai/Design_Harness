import ProductCard from '../ProductCard'
import type { BrandProductBlockProps } from './BrandProductBlock.types'

/**
 * Figma: contents1~5 (19449:147691 …) — 제휴처 타이틀 + 3열 상품
 *
 * Figma 문서(type=brand_solid): "배경색이 있는 반전색 로고 / 바닥색과의
 * 구분을 위해 overlay 필수" — 그래서 로고 위에 scrim 오버레이를 깐다.
 */
export default function BrandProductBlock({
  brand,
  label,
  logo,
  logoBackground,
  items,
  onClick,
  className,
}: BrandProductBlockProps) {
  return (
    <section className={className ?? 'flex w-full flex-col items-start'} aria-label={brand}>
      <button
        type="button"
        onClick={onClick}
        className="flex w-full items-center gap-[var(--brandblock-title-gap)] py-[var(--brandblock-title-py)] px-[var(--plist-px)] text-left"
      >
        <span
          className="relative block shrink-0 overflow-clip rounded-[var(--brandblock-logo-r)] size-[var(--brandblock-logo)]"
          style={{ background: logoBackground ?? 'var(--primitive-black-800)' }}
        >
          {logo && <img src={logo} alt="" aria-hidden className="absolute inset-0 block size-full" />}
          {/* 반전색 로고와 바닥색을 구분하는 필수 오버레이 */}
          <span
            aria-hidden
            className="absolute inset-0 block"
            style={{ backgroundColor: 'var(--primitive-scrim-thumb-overlay)' }}
          />
        </span>
        <span className="flex items-center gap-[var(--brandblock-text-gap)] whitespace-nowrap">
          <span className="text-[length:var(--typeset-lg-compact-size)] leading-[var(--typeset-lg-compact-lh)] font-medium text-[var(--primitive-blueblack-100)] tracking-[0]">
            {brand}
          </span>
          {label && (
            <span className="text-center text-[length:var(--typeset-xs-size)] leading-[var(--typeset-xs-lh)] font-bold text-[var(--primitive-shopping-purple-700)] tracking-[0]">
              {label}
            </span>
          )}
        </span>
      </button>

      {/* 3coulnm — plist 그리드 토큰 재사용 */}
      <div className="flex w-full px-[var(--plist-px)]" style={{ columnGap: 'var(--plist-gutter)' }}>
        {[0, 1, 2].map((ci) => (
          <div key={ci} className="flex min-w-0 flex-1 flex-col" style={{ rowGap: 'var(--plist-gutter)' }}>
            {items.filter((_, i) => i % 3 === ci).map((card, i) => (
              <ProductCard key={i} {...card} />
            ))}
          </div>
        ))}
      </div>
    </section>
  )
}
