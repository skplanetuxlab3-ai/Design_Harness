import type { CategoryFilterProps, CategoryItem } from './CategoryFilter.types'

// ─── Figma CDN 에셋 (7일 만료 — TODO: src/assets/ 로컬 교체) ───
const FIRE_ICON = 'https://www.figma.com/api/mcp/asset/3eaa46e0-e28c-41e3-984d-3ace998c3d42'
const ARROW_DOWN_ICON = 'https://www.figma.com/api/mcp/asset/2f4786d0-2362-4bfa-9f5b-d85d362be56d'

const DEFAULT_ITEMS: CategoryItem[] = [
  { label: '인기', showFire: true },
  { label: '카페' },
  { label: '베이커리' },
  { label: '치킨' },
  { label: '피자·버거' },
  { label: '생활' },
  { label: '아이스크림' },
  { label: '편의점/마트' },
]

// ─── 펼치기 버튼 (28px) ─────────────────────────────────────────
function ExpandButton({ onClick }: { onClick?: () => void }) {
  return (
    <div
      className="absolute right-0 top-0 bottom-0 flex items-center pl-[28px] pr-[14px]"
      style={{
        background: 'linear-gradient(to right, rgba(255,255,255,0) 0%, #ffffff 38.571%)',
      }}
      aria-hidden={!onClick}
    >
      <button
        type="button"
        onClick={onClick}
        aria-label="카테고리 더보기"
        className="flex items-center justify-center size-[28px] rounded-[var(--radius-max)] shrink-0"
        style={{
          backgroundColor: 'var(--primitive-black-800)',
          border: '1px solid var(--primitive-shopping-border)',
        }}
      >
        <img src={ARROW_DOWN_ICON} alt="" aria-hidden className="size-[12px] object-contain pointer-events-none" />
      </button>
    </div>
  )
}

export default function CategoryFilter({
  items = DEFAULT_ITEMS,
  activeIndex = 0,
  showExpandBtn = true,
  className,
  onSelect,
  onExpand,
}: CategoryFilterProps) {
  return (
    <div
      className={`relative flex items-center gap-[6px] overflow-x-auto w-full ${className ?? ''}`}
      style={{
        backgroundColor: 'var(--primitive-white)',
        paddingBlock: '12px',
        paddingInline: '14px',
        scrollbarWidth: 'none',
      }}
    >
      {items.map((item, i) => {
        const isActive = activeIndex === i
        return (
          <button
            key={i}
            type="button"
            onClick={() => onSelect?.(i)}
            className={`flex h-[32px] items-center justify-center gap-[2px] px-[10px] rounded-[var(--radius-max)] shrink-0 max-h-[32px] ${
              isActive
                ? 'bg-[var(--primitive-sp-black)]'
                : 'bg-[var(--primitive-white)]'
            }`}
            style={
              isActive
                ? undefined
                : { border: '1px solid var(--primitive-blueblack-700)' }
            }
          >
            {item.showFire && isActive && (
              <div className="relative size-[20px] shrink-0">
                <img src={FIRE_ICON} alt="" aria-hidden className="absolute inset-0 w-full h-full object-contain pointer-events-none" />
              </div>
            )}
            <span
              className={`text-[14px] leading-[20px] tracking-[0] whitespace-nowrap ${
                isActive
                  ? 'font-bold text-[var(--primitive-white)]'
                  : 'font-normal text-[var(--primitive-blueblack-200)]'
              }`}
            >
              {item.label}
            </span>
          </button>
        )
      })}

      {/* 펼치기 버튼 */}
      {showExpandBtn && <ExpandButton onClick={onExpand} />}
    </div>
  )
}
