import Button from '../Button'
import type { PointSummaryProps } from './PointSummary.types'

// Figma: Point Summary 19550:129778

export default function PointSummary({
  label = '총 적립쇼핑 포인트',
  point = '603P',
  pendingPoint = '+9,020P',
  actionLabel = '내역',
  onAction,
  className,
}: PointSummaryProps) {
  return (
    <div
      className={
        className ??
        'flex w-full items-center gap-[var(--point-summary-gap)] pt-[var(--point-summary-pt)] pb-[var(--point-summary-pb)] px-[var(--point-summary-px)]'
      }
    >
      <div className="flex min-w-0 flex-1 flex-col justify-center gap-[var(--products-spacing-04)] items-start">
        <p className="overflow-hidden text-ellipsis whitespace-nowrap text-[length:var(--typeset-md-size)] leading-[var(--typeset-md-lh)] font-normal text-[var(--primitive-blueblack-100)] tracking-[0]">
          {label}
        </p>
        <div className="flex items-center gap-[var(--point-summary-num-gap)]">
          <p className="text-[length:var(--typeset-4xl-size)] leading-[var(--typeset-4xl-lh)] font-bold text-[var(--primitive-black)] tracking-[0] whitespace-nowrap">
            {point}
          </p>
          {pendingPoint && (
            <p className="text-[length:var(--typeset-md-compact-size)] leading-[var(--typeset-md-compact-lh)] font-medium text-[var(--primitive-shopping-purple-700)] tracking-[0] whitespace-nowrap">
              {pendingPoint} 적립 예정
            </p>
          )}
        </div>
      </div>
      <Button label={actionLabel} size="sm" tone="secondary" onClick={onAction} />
    </div>
  )
}
