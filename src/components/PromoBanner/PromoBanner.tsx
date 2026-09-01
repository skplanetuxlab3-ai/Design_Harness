import type { PromoBannerProps } from './PromoBanner.types'
// Figma: S-2 (그레이) 19550:129762 — 로컬 에셋. 만료되는 MCP URL 을 쓰지 않는다.
import stampIcon from '../../assets/icon-banner-stamp_19550-129765.svg'
import pointIcon from '../../assets/icon-banner-point_19550-129771.svg'
import closeIcon from '../../assets/icon-close-16_19550-129777.svg'

/** image / 42 / BannerS — 42×42 안에 스탬프와 포인트 배지가 겹쳐 놓인다 */
function BannerIcon() {
  return (
    <div className="relative shrink-0 size-[var(--promo-banner-img)]">
      <img
        src={stampIcon}
        alt=""
        aria-hidden
        className="absolute block max-w-none"
        style={{ left: '5.25px', top: '5.18px', width: '29.4px', height: '30.319px' }}
      />
      <img
        src={pointIcon}
        alt=""
        aria-hidden
        className="absolute block max-w-none size-full"
        style={{ inset: '64.62% 11.53% 3.31% 56.41%' }}
      />
    </div>
  )
}

export default function PromoBanner({
  caption = '놓치는 포인트 없도록',
  title = '적립캐치 알림 켜고 200P 받기',
  dismissible = true,
  onClick,
  onDismiss,
  className,
}: PromoBannerProps) {
  return (
    <div className={className ?? 'flex flex-col items-start pt-[var(--products-spacing-14)] px-[var(--products-spacing-14)] w-full'}>
      <div
        onClick={onClick}
        className="flex w-full items-center justify-between rounded-[var(--promo-banner-r)] border border-[var(--primitive-black-opacity-50)] bg-[var(--primitive-white)] pl-[var(--promo-banner-pl)] pr-[var(--promo-banner-pr)] py-[var(--promo-banner-py)]"
        style={{
          boxShadow:
            'var(--elevation-glow-x) var(--elevation-glow-y) var(--elevation-glow-blur) var(--elevation-glow-spread) var(--elevation-glow-color)',
        }}
      >
        <div className="flex min-w-0 items-center gap-[var(--promo-banner-gap)]">
          <BannerIcon />
          <div className="flex min-w-0 flex-col gap-[var(--products-spacing-02)] items-start">
            <p className="max-h-[var(--typeset-sm-lh)] overflow-hidden text-ellipsis whitespace-nowrap text-[length:var(--typeset-sm-size)] leading-[var(--typeset-sm-lh)] font-normal text-[var(--primitive-blueblack-200)] tracking-[0]">
              {caption}
            </p>
            <p className="overflow-hidden text-ellipsis whitespace-nowrap text-[length:var(--typeset-lg-size)] leading-[var(--typeset-lg-lh)] font-bold text-[var(--primitive-shopping-purple-700)]">
              {title}
            </p>
          </div>
        </div>
        {dismissible && (
          <button
            type="button"
            aria-label="배너 닫기"
            onClick={(e) => { e.stopPropagation(); onDismiss?.() }}
            className="shrink-0 size-[var(--promo-banner-close)]"
          >
            <img src={closeIcon} alt="" aria-hidden className="block size-full" />
          </button>
        )}
      </div>
    </div>
  )
}
