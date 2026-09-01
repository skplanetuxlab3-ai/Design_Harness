import type { TabProps } from './Tab.types'

// OCB_쇼핑 `Elements / Tab` (node 2220:97063) 구현.
// variant 4종 = Type(Basic|Icon) × State(active|inactive).
// Navigation bar(2474:116649)는 이 컴포넌트의 인스턴스 4개 + Trailing BTN(Type=Icon) 으로 구성된다.

/** Figma `Elements / Tab` > Type=Goto (2646:83338) — 12×12 */
function GotoChevron({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="12"
      height="12"
      style={{
        width: 'var(--top-nav-trailing-icon-size)',
        height: 'var(--top-nav-trailing-icon-size)',
      }}
      viewBox="0 0 12 12"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M4 2.5L8 6L4 9.5"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export default function Tab({
  type = 'Basic',
  active = true,
  label = '메뉴명',
  sublabel = '서브문구',
  showDot = false,
  showSubLabel = false,
  fill = false,
  onClick,
  className,
}: TabProps) {
  const isIcon = type === 'Icon'

  const containerCls = [
    'relative flex gap-[var(--top-nav-tab-dot-gap)] h-[var(--top-nav-bar-height)] items-center',
    active
      ? 'flex-col pb-[var(--top-nav-tab-pb)] pt-[var(--top-nav-tab-pt)]'
      : 'justify-center pt-[var(--top-nav-inactive-tab-pt)]',
    fill && 'flex-1 min-w-0',
    className,
  ]
    .filter(Boolean)
    .join(' ')

  const textCls = [
    'text-[length:var(--typeset-md-size)] leading-[var(--typeset-md-lh)] tracking-[0] whitespace-nowrap text-center text-[var(--primitive-white)]',
    active ? 'font-bold' : 'font-normal opacity-60',
  ].join(' ')

  const body = (
    <>
      {isIcon ? (
        <div className="flex gap-px items-center shrink-0">
          <span className={textCls}>{label}</span>
          <GotoChevron
            className={[
              'text-[var(--primitive-white)] shrink-0',
              !active && 'opacity-60',
            ]
              .filter(Boolean)
              .join(' ')}
          />
        </div>
      ) : (
        <div className="relative shrink-0">
          <span className={textCls}>{label}</span>
          {showDot && (
            <span
              className="absolute -right-[9px] top-2 size-2 rounded-full bg-[var(--color-brand-ocb-pink)]"
              aria-label="알림"
            />
          )}
        </div>
      )}

      {/* 활성 인디케이터 점 — Figma ActiveDot(2474:69982) 3×3 #ffffff */}
      {active && (
        <span
          className="shrink-0 size-[var(--top-nav-tab-dot-size)] rounded-full bg-[var(--primitive-white)]"
          aria-hidden="true"
        />
      )}

      {/* 서브 레이블 — absolute, OCB 핑크 11px */}
      {showSubLabel && (
        <span className="absolute left-1/2 -translate-x-1/2 top-[calc(50%-15.5px)] -translate-y-1/2 text-[length:var(--typeset-xs-size)] leading-[11px] text-[var(--color-brand-ocb-pink)] font-normal whitespace-nowrap overflow-hidden text-ellipsis text-center pointer-events-none">
          {sublabel}
        </span>
      )}
    </>
  )

  if (onClick) {
    return (
      <button
        type="button"
        className={containerCls}
        role="tab"
        aria-selected={active}
        onClick={onClick}
      >
        {body}
      </button>
    )
  }

  return (
    <div className={containerCls} role="tab" aria-selected={active}>
      {body}
    </div>
  )
}
