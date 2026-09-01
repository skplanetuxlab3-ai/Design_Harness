import type { SectionTitleProps } from './SectionTitle.types'

// Figma: Contents / SectionTitle 19550:129827
// ※ 이 인스턴스의 제목 색은 color/black(#000000)인데 레포 토큰
//    --section-title-color 는 #181818 이다. 기존 섹션과 맞추려고 토큰을 쓴다.

export default function SectionTitle({
  title,
  badge,
  viewAllLabel,
  onViewAll,
  className,
}: SectionTitleProps) {
  return (
    <div
      className={
        className ??
        'flex w-full flex-col justify-end gap-[var(--section-title-gap)] items-start pt-[var(--section-title-pt)] pb-[var(--section-title-pb)] px-[var(--section-title-px)]'
      }
    >
      <div className="flex w-full items-end justify-between">
        <div className="flex min-w-0 flex-1 flex-col justify-center items-start">
          <div className="flex h-[var(--typeset-xl-lh)] w-full items-center gap-[var(--section-title-badge-gap)]">
            <p
              className="overflow-hidden text-ellipsis whitespace-nowrap font-bold"
              style={{
                fontSize: 'var(--section-title-size)',
                lineHeight: 'var(--section-title-lh)',
                letterSpacing: 'var(--section-title-tracking)',
                color: 'var(--section-title-color)',
              }}
            >
              {title}
            </p>
            {badge}
          </div>
        </div>
        {viewAllLabel && (
          <button
            type="button"
            onClick={onViewAll}
            className="shrink-0 text-[length:var(--typeset-sm-size)] leading-[var(--typeset-sm-lh)] font-normal text-[var(--primitive-blueblack-300)]"
          >
            {viewAllLabel}
          </button>
        )}
      </div>
    </div>
  )
}
