import type { ChipMenuProps, EventChipItem } from './ChipMenu.types'
import imgBera from '../../assets/img-eventchip-bera_16147-35048.png'
import imgGroupbuy from '../../assets/img-eventchip-groupbuy_16147-35048.png'
import imgLowest from '../../assets/img-eventchip-lowest_16147-35048.png'
import imgMovie from '../../assets/img-eventchip-movie_16147-35048.png'
import imgByprice from '../../assets/img-eventchip-byprice_16147-35048.png'
import imgOkcashbag from '../../assets/img-eventchip-okcashbag_16147-35048.png'

// ─── 로컬 에셋 (Figma Chip menu, node 16147:35048) ───
const IMG = {
  bera:      imgBera,
  groupbuy:  imgGroupbuy,
  lowest:    imgLowest,
  movie:     imgMovie,
  byprice:   imgByprice,
  okcashbag: imgOkcashbag,
}

const DEFAULT_ITEMS: EventChipItem[] = [
  { text: '오늘은 베라데이', imageUrl: IMG.bera },
  { text: '오늘 마감 공동구매', imageUrl: IMG.groupbuy },
  { text: '여기서 최저가', imageUrl: IMG.lowest },
  { text: '영화 4,000원 할인', imageUrl: IMG.movie },
  { text: '가격대별로 모았어요', imageUrl: IMG.byprice },
  { text: 'OK캐쉬백에서만!', imageUrl: IMG.okcashbag },
]

function EventChip({ item, onClick }: { item: EventChipItem; onClick?: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex items-center shrink-0 border border-solid"
      style={{
        height: 'var(--event-chip-h)',
        paddingLeft: 'var(--event-chip-pl)',
        paddingRight: 'var(--event-chip-pr)',
        gap: 'var(--event-chip-gap)',
        borderRadius: 'var(--event-chip-r)',
        backgroundColor: 'var(--event-chip-surface)',
        borderColor: 'var(--event-chip-border)',
      }}
    >
      {/* 썸네일 */}
      <span
        className="relative block overflow-hidden shrink-0 rounded-full"
        style={{
          width: 'var(--event-chip-thumb-size)',
          height: 'var(--event-chip-thumb-size)',
          backgroundColor: 'var(--event-chip-thumb-surface)',
          border: 'var(--event-chip-thumb-border-w) solid var(--event-chip-thumb-border)',
        }}
      >
        {item.imageUrl && (
          <img
            src={item.imageUrl}
            alt=""
            aria-hidden
            className="absolute max-w-none object-cover pointer-events-none"
            style={{ inset: '-0.5px' }}
          />
        )}
      </span>
      {/* 텍스트 */}
      <span
        className="font-medium whitespace-nowrap"
        style={{
          color: 'var(--event-chip-text)',
          fontSize: 'var(--typeset-md-compact-size)',
          lineHeight: 'var(--typeset-md-compact-lh)',
          letterSpacing: 'var(--typeset-md-compact-tracking)',
        }}
      >
        {item.text}
      </span>
    </button>
  )
}

export default function ChipMenu({ items = DEFAULT_ITEMS, onChipClick, className }: ChipMenuProps) {
  return (
    <div
      className={className ?? 'grid overflow-x-auto'}
      style={{
        gridAutoFlow: 'column',
        gridTemplateRows: 'repeat(2, auto)',
        gridAutoColumns: 'max-content',
        justifyContent: 'start',
        paddingInline: 'var(--chipmenu-px)',
        columnGap: 'var(--chipmenu-gap)',
        rowGap: 'var(--chipmenu-row-gap)',
        scrollbarWidth: 'none',
      } as React.CSSProperties}
    >
      {items.map((item, i) => (
        <EventChip key={i} item={item} onClick={() => onChipClick?.(item, i)} />
      ))}
    </div>
  )
}
