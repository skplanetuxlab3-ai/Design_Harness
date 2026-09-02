import type { BannerLProps } from './BannerL.types'
// Figma: BannerL / 2 (21551:41039)
// 같은 자리의 S 타입은 PromoBanner (S-2 그레이 19550:129762) 다.
// S 는 한 줄 알림, L 은 CTA 버튼과 일러스트를 가진 카드다.
import circleBg from '../../assets/banner-l-circle-bg_21551-41040.svg'
import closeBg from '../../assets/banner-l-close-bg_21551-41046.svg'
import closeIcon from '../../assets/banner-l-close_21551-41048.svg'
import artStamp from '../../assets/banner-l-stamp_21361-59107.png'
import artSeal from '../../assets/banner-l-seal_21361-59108.png'

export default function BannerL({
  eyebrow = '쇼핑 스탬프',
  title,
  ctaLabel,
  hideArt = false,
  dismissible = true,
  onClick,
  onDismiss,
  className,
}: BannerLProps) {
  return (
    <div
      className={
        className ??
        'relative flex w-full flex-col items-start justify-center gap-[var(--banner-l-gap)] overflow-clip rounded-[var(--banner-l-r)] border border-solid border-[var(--primitive-black-opacity-50)] pt-[var(--banner-l-pt)] pb-[var(--banner-l-pb)] px-[var(--banner-l-px)]'
      }
      style={{
        backgroundImage: 'var(--banner-l-gradient)',
        boxShadow:
          'var(--elevation-glow-x) var(--elevation-glow-y) var(--elevation-glow-blur) var(--elevation-glow-spread) var(--elevation-glow-color)',
      }}
    >
      {/* Circle BG — 우상단으로 빠져나가는 장식 원 */}
      <img
        src={circleBg}
        alt=""
        aria-hidden
        className="pointer-events-none absolute block max-w-none"
        style={{ left: '65px', top: '-141px', width: '288px', height: '194px' }}
      />

      {/* 우상단 일러스트 */}
      {!hideArt && (
        <span
          className="pointer-events-none absolute overflow-clip"
          style={{ right: '-1px', top: '-1px', width: 'var(--banner-l-art-w)', height: 'var(--banner-l-art-h)' }}
          aria-hidden
        >
          <img
            src={artStamp}
            alt=""
            className="absolute block max-w-none -translate-x-1/2 -translate-y-1/2 object-cover"
            style={{ left: 'calc(50% - 3px)', top: 'calc(50% + 10.15px)', width: '88.258px', height: '68px' }}
          />
          <img
            src={artSeal}
            alt=""
            className="absolute block max-w-none object-cover"
            style={{ left: '61.96px', top: '59.04px', width: '41.687px', height: '41.687px' }}
          />
        </span>
      )}

      {/* Title 21551:41041 */}
      <div className="relative flex w-full items-center justify-center gap-[var(--products-spacing-08)]">
        <div className="flex min-w-0 flex-1 flex-col justify-center gap-[var(--banner-l-text-gap)] items-start pl-[var(--banner-l-text-pl)]">
          {eyebrow && (
            <p className="w-full text-[length:var(--typeset-md-size)] leading-[var(--typeset-md-lh)] font-normal text-[var(--primitive-m3-neutral-50)] tracking-[0]">
              {eyebrow}
            </p>
          )}
          <p className="whitespace-nowrap text-[length:var(--typeset-xl-size)] leading-[var(--typeset-xl-lh)] font-bold text-[var(--primitive-black)] tracking-[0]">
            {title}
          </p>
        </div>
        {dismissible && (
          <button
            type="button"
            onClick={(e) => { e.stopPropagation(); onDismiss?.() }}
            aria-label="배너 닫기"
            className="absolute size-[var(--banner-l-close-area)]"
            style={{ right: 'var(--banner-l-close-right)', top: 'var(--banner-l-close-top)' }}
          >
            <img
              src={closeBg}
              alt=""
              aria-hidden
              className="absolute block size-[var(--banner-l-close-bg)]"
              style={{ left: 'var(--banner-l-close-bg-inset)', top: 'var(--banner-l-close-bg-inset)' }}
            />
            <img
              src={closeIcon}
              alt=""
              aria-hidden
              className="absolute left-1/2 top-1/2 block -translate-x-1/2 -translate-y-1/2 size-[var(--banner-l-close-icon)]"
            />
          </button>
        )}
      </div>

      {/* CTA 21551:41049 — Figma 는 px-148 로 가운데를 잡지만, w-full + justify-center 로 같은 결과다 */}
      <button
        type="button"
        onClick={onClick}
        className="relative flex w-full items-center justify-center rounded-[var(--banner-l-cta-r)] py-[var(--banner-l-cta-py)] text-center text-[length:var(--typeset-lg-compact-size)] leading-[var(--typeset-lg-compact-lh)] font-bold text-[var(--primitive-m3-white)] tracking-[0] whitespace-nowrap"
        style={{ backgroundColor: 'var(--primitive-banner-l-cta)' }}
      >
        {ctaLabel}
      </button>
    </div>
  )
}
