import type { ChipMenuProps, EventChipItem } from './ChipMenu.types'

// ─── Figma CDN 에셋 (node 20327-20543, 7일 만료 — TODO: src/assets/ 로컬 교체 필요) ───
const IMG = {
  bera:       'https://www.figma.com/api/mcp/asset/5245515e-bb28-49d9-9722-4c4f427a3911',
  groupbuy:   'https://www.figma.com/api/mcp/asset/2809764e-038d-4ce5-97fa-145411864883',
  lowest:     'https://www.figma.com/api/mcp/asset/e1575d5f-553c-4db0-94ca-992414c68a72',
  movie:      'https://www.figma.com/api/mcp/asset/077eb944-2298-470a-b3b2-b93df8d18ac9',
  byprice:    'https://www.figma.com/api/mcp/asset/726c0572-257a-403b-8956-b4710da40e34',
  okcashbag:  'https://www.figma.com/api/mcp/asset/006c7c08-80bb-4569-9035-181b77b79e59',
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
