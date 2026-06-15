import type { BrandsFilterProps, BrandItem } from './BrandsFilter.types'

// ─── Figma CDN 에셋 (7일 만료 — TODO: src/assets/ 로컬 교체) ───
// 활성 브랜드 컬러 링 (Default 변형)
const LINE_ACTIVE = 'https://www.figma.com/api/mcp/asset/38e528ec-c6eb-477c-81d5-7f9c8a04ffeb'

const DEFAULT_BRANDS: BrandItem[] = [
  { label: '메가커피' },
  { label: '스타벅스' },
  { label: '컴포즈커피' },
  { label: '이디야' },
  { label: '파스쿠치' },
  { label: '할리스' },
  { label: '투썸플레이스' },
  { label: '폴바셋' },
]

// ─── Default 변형: 원형 로고 + 이름 레이블 ──────────────────────
function DefaultBrandItem({
  brand,
  isActive,
  onClick,
}: {
  brand: BrandItem
  isActive: boolean
  onClick?: () => void
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex flex-col gap-[5px] items-center shrink-0 w-[64px]"
    >
      {/* 로고 원형 */}
      <div className="relative size-[48px] shrink-0">
        <div
          className="size-[48px] rounded-full overflow-hidden"
          style={{ border: '0.5px solid var(--primitive-shopping-border)' }}
        >
          {brand.imageUrl ? (
            <img
              src={brand.imageUrl}
              alt={brand.label}
              className="w-full h-full object-cover pointer-events-none"
            />
          ) : (
            <div className="w-full h-full bg-[var(--primitive-black-800)]" />
          )}
        </div>
        {/* 활성 컬러 링 */}
        {isActive && (
          <img
            src={LINE_ACTIVE}
            alt=""
            aria-hidden
            className="absolute pointer-events-none"
            style={{ width: '54px', height: '54px', top: '-3px', left: '5px' }}
          />
        )}
      </div>
      {/* 이름 */}
      <p
        className={`text-[12px] leading-[16px] tracking-[0] text-center overflow-hidden text-ellipsis w-full ${
          isActive
            ? 'font-bold text-[var(--primitive-sp-black)]'
            : 'font-normal text-[var(--primitive-blueblack-200)]'
        }`}
      >
        {brand.label}
      </p>
    </button>
  )
}

// ─── Scroll 변형: 텍스트 탭 + 언더라인 ─────────────────────────
function ScrollBrandItem({
  brand,
  isActive,
  onClick,
}: {
  brand: BrandItem
  isActive: boolean
  onClick?: () => void
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex flex-col h-[44px] items-center justify-center shrink-0"
      style={
        isActive
          ? { borderBottom: '2px solid var(--primitive-sp-black)' }
          : undefined
      }
    >
      <p
        className={`text-[14px] leading-[20px] tracking-[0] whitespace-nowrap overflow-hidden text-ellipsis ${
          isActive
            ? 'font-bold text-[var(--primitive-sp-black)]'
            : 'font-normal text-[var(--primitive-blueblack-200)]'
        }`}
      >
        {brand.label}
      </p>
    </button>
  )
}

// ─── Main Export ────────────────────────────────────────────────
export default function BrandsFilter({
  variant = 'Default',
  brands = DEFAULT_BRANDS,
  activeIndex = 0,
  className,
  onSelect,
}: BrandsFilterProps) {
  if (variant === 'Scroll') {
    return (
      <div
        className={`relative flex w-full ${className ?? ''}`}
        style={{
          backgroundColor: 'var(--primitive-white)',
          paddingInline: '14px',
          gap: '16px',
          overflowX: 'auto',
          scrollbarWidth: 'none',
        }}
      >
        {/* 하단 구분선 */}
        <div
          className="absolute bottom-0 left-0 right-0 h-px"
          style={{ backgroundColor: 'var(--primitive-black-800)' }}
          aria-hidden
        />
        {brands.map((brand, i) => (
          <ScrollBrandItem
            key={i}
            brand={brand}
            isActive={activeIndex === i}
            onClick={() => onSelect?.(i)}
          />
        ))}
      </div>
    )
  }

  // Default variant
  return (
    <div
      className={`flex w-full ${className ?? ''}`}
      style={{
        backgroundColor: 'var(--primitive-white)',
        paddingTop: '12px',
        paddingBottom: '8px',
        paddingInline: '14px',
        overflowX: 'auto',
        scrollbarWidth: 'none',
      }}
    >
      {brands.map((brand, i) => (
        <DefaultBrandItem
          key={i}
          brand={brand}
          isActive={activeIndex === i}
          onClick={() => onSelect?.(i)}
        />
      ))}
    </div>
  )
}
