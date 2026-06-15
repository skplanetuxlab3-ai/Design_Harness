import type { TabProps } from './Tab.types'

function GotoChevron({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="12"
      height="12"
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
  className,
}: TabProps) {
  const isIcon = type === 'Icon'

  const containerCls =
    className ??
    [
      'relative flex gap-[2px] h-[42px] items-center',
      active ? 'flex-col pb-[5px] pt-3' : 'justify-center pt-[2px]',
    ].join(' ')

  const textCls = [
    'text-[14px] leading-[20px] tracking-[0] whitespace-nowrap text-center text-[var(--primitive-white)]',
    active ? 'font-bold' : 'font-normal opacity-60',
  ].join(' ')

  return (
    <div className={containerCls} role="tab" aria-selected={active}>
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

      {/* 활성 인디케이터 점 */}
      {active && (
        <span
          className="shrink-0 size-[3px] rounded-full bg-[var(--primitive-white)]"
          aria-hidden="true"
        />
      )}

      {/* 서브 레이블 — absolute, OCB 핑크 11px */}
      {showSubLabel && (
        <span className="absolute left-1/2 -translate-x-1/2 top-[calc(50%-15.5px)] -translate-y-1/2 text-[11px] leading-[11px] text-[var(--color-brand-ocb-pink)] font-normal whitespace-nowrap overflow-hidden text-ellipsis text-center pointer-events-none">
          {sublabel}
        </span>
      )}
    </div>
  )
}
