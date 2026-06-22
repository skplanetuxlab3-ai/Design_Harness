import { useState } from 'react'
import type { CategorySheetProps, CategoryGroup } from './CategorySheet.types'

export const DEFAULT_GROUPS: CategoryGroup[] = [
  { name: '카페', brands: ['스타벅스', '메가커피', '컴포즈커피', '이디야', '투썸플레이스', '폴바셋', '할리스', '파스쿠치', '빽다방', '커피빈', '엔젤리너스', '탐앤탐스', '더벤티'] },
  { name: '베이커리', brands: ['파리바게뜨', '뚜레쥬르', '파리크라상', '던킨', '노티드', '성심당', '김영모'] },
  { name: '치킨', brands: ['굽네치킨', 'BBQ치킨', 'BHC치킨', '교촌치킨', '60계치킨'] },
  { name: '피자∙버거', brands: ['도미노피자', '피자헛', '맘스터치', '버거킹', '롯데리아'] },
  { name: '생활', brands: ['올리브영', '다이소'] },
  { name: '아이스크림', brands: ['배스킨라빈스', '나뚜루'] },
  { name: '편의점/마트', brands: ['GS25', 'CU', '세븐일레븐', '이마트24'] },
]

function ShortcutItem({ label }: { label: string }) {
  return (
    <div className="flex flex-col items-center shrink-0" style={{ width: 'var(--ecoupon-shortcut-item-w)', gap: 'var(--ecoupon-shortcut-gap)' }}>
      <span
        className="rounded-full overflow-hidden shrink-0"
        style={{
          width: 'var(--ecoupon-shortcut-circle)',
          height: 'var(--ecoupon-shortcut-circle)',
          backgroundColor: 'var(--ecoupon-shortcut-circle)',
          border: '0.5px solid var(--ecoupon-shortcut-border)',
        }}
      />
      <span
        className="text-center w-full"
        style={{
          fontSize: 'var(--typeset-sm-size)', lineHeight: 'var(--typeset-sm-lh)', color: 'var(--ecoupon-shortcut-label)',
          display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden',
        }}
      >
        {label}
      </span>
    </div>
  )
}

export default function CategorySheet({
  open,
  groups = DEFAULT_GROUPS,
  activeIndex,
  onSelect,
  onClose,
}: CategorySheetProps) {
  const [internalIndex, setInternalIndex] = useState(0)
  const active = activeIndex ?? internalIndex
  const select = onSelect ?? setInternalIndex

  if (!open) return null

  return (
    <div className="absolute inset-0 z-50 flex items-end justify-center" role="dialog" aria-modal="true" aria-label="카테고리별 브랜드">
      {/* 딤 배경 */}
      <div className="absolute inset-0" style={{ backgroundColor: 'var(--catsheet-backdrop)' }} onClick={onClose} aria-hidden />

      {/* 시트 패널 */}
      <div
        className="relative flex flex-col overflow-hidden"
        style={{
          width: 'var(--catsheet-panel-w)',
          marginBottom: 'var(--catsheet-mb)',
          borderRadius: 'var(--catsheet-r)',
          backgroundColor: 'var(--catsheet-surface)',
        }}
      >
        {/* 타이틀 바 */}
        <div
          className="relative flex items-start shrink-0"
          style={{ paddingTop: 'var(--catsheet-title-pt)', paddingBottom: 'var(--catsheet-title-pb)', paddingLeft: 'var(--catsheet-title-pl)', paddingRight: 'var(--catsheet-title-pr)' }}
        >
          <p className="flex-1 min-w-0 font-bold" style={{ fontSize: 'var(--typeset-xl-size)', lineHeight: 'var(--typeset-xl-lh)', color: 'var(--catsheet-title-text)' }}>
            카테고리별 브랜드
          </p>
          <button
            type="button"
            onClick={onClose}
            aria-label="닫기"
            className="absolute flex items-center justify-center"
            style={{ top: '8px', right: '8px', width: 'var(--catsheet-close-touch)', height: 'var(--catsheet-close-touch)' }}
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
              <path d="M4 4L12 12M12 4L4 12" stroke="var(--catsheet-close-icon)" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        {/* 컨텐츠: 좌측 칩 + 우측 카테고리 */}
        <div className="flex" style={{ height: 'var(--catsheet-contents-h)' }}>
          {/* 좌측 세로 칩 */}
          <div
            className="flex flex-col shrink-0 overflow-y-auto"
            style={{ width: 'var(--catsheet-chip-col-w)', gap: 'var(--catsheet-chip-gap)', paddingLeft: 'var(--ecoupon-shortcut-px)', scrollbarWidth: 'none' } as React.CSSProperties}
          >
            {groups.map((g, i) => {
              const isActive = i === active
              return (
                <button
                  key={i}
                  type="button"
                  onClick={() => select(i)}
                  className="flex h-[32px] items-center justify-center px-[10px] rounded-[var(--radius-max)] shrink-0 self-start"
                  style={
                    isActive
                      ? { backgroundColor: 'var(--category-chip-active-surface)' }
                      : { backgroundColor: 'var(--category-chip-inactive-surface)', border: '1px solid var(--category-chip-inactive-border)' }
                  }
                >
                  <span
                    className={isActive ? 'font-bold' : 'font-normal'}
                    style={{
                      fontSize: 'var(--typeset-md-size)', lineHeight: 'var(--typeset-md-lh)', whiteSpace: 'nowrap',
                      color: isActive ? 'var(--primitive-white)' : 'var(--primitive-black-200)',
                    }}
                  >
                    {g.name}
                  </span>
                </button>
              )
            })}
          </div>

          {/* 우측 카테고리 섹션 (스크롤) */}
          <div
            className="flex-1 min-w-0 overflow-y-auto"
            style={{ width: 'var(--catsheet-cat-w)', scrollbarWidth: 'none' } as React.CSSProperties}
          >
            {groups.map((g, gi) => (
              <div key={gi}>
                <div style={{ paddingBottom: gi === groups.length - 1 ? '20px' : 'var(--catsheet-section-gap)' }}>
                  <p className="font-bold" style={{ fontSize: 'var(--typeset-md-size)', lineHeight: 'var(--typeset-md-lh)', color: 'var(--catsheet-section-title)', paddingBottom: 'var(--catsheet-section-title-gap)' }}>
                    {g.name}
                  </p>
                  <div
                    className="grid"
                    style={{ gridTemplateColumns: 'repeat(3, var(--ecoupon-shortcut-item-w))', columnGap: 'var(--catsheet-grid-col-gap)', rowGap: 'var(--catsheet-grid-row-gap)' }}
                  >
                    {g.brands.map((b, bi) => <ShortcutItem key={bi} label={b} />)}
                  </div>
                </div>
                {gi < groups.length - 1 && (
                  <div className="w-full h-px mb-[20px]" style={{ backgroundColor: 'var(--catsheet-divider)' }} aria-hidden />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
