import type { ScrollPromptBannerProps } from './ScrollPromptBanner.types'
// Figma: Scroll Prompt Banner 19550:129846
import pointIcon from '../../assets/icon-point-20_19550-129848.svg'
import arrowDown from '../../assets/icon-arrow-down_19550-129852.svg'

/**
 * 아래로 더 볼 게 있다고 알리는 알약 배너.
 *
 * ※ Figma 주석: 화살표는 ico_20_arrowdown_lottie.json 로 반복 재생한다.
 *   Lottie 를 아직 안 쓰므로 정지 SVG 로 두고 prefers-reduced-motion 을
 *   존중하는 CSS 바운스만 얹었다.
 */
export default function ScrollPromptBanner({
  label = '적립이 가장 많은 상품은?',
  onClick,
  className,
}: ScrollPromptBannerProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={
        className ??
        'flex items-center justify-center rounded-[var(--scroll-prompt-r)] bg-[var(--primitive-white)] px-[var(--scroll-prompt-px)] py-[var(--scroll-prompt-py)]'
      }
      style={{
        boxShadow:
          'var(--elevation-3dp-x) var(--elevation-3dp-y) var(--elevation-3dp-blur) var(--elevation-3dp-spread) var(--elevation-3dp-color)',
      }}
    >
      <span className="flex shrink-0 items-center">
        <img src={pointIcon} alt="" aria-hidden className="block shrink-0 size-[var(--scroll-prompt-icon)]" />
        <span className="whitespace-nowrap text-right text-[length:var(--typeset-md-size)] leading-[var(--typeset-md-lh)] font-medium text-[var(--primitive-black)] tracking-[0]">
          {label}
        </span>
      </span>
      <span className="relative block shrink-0 size-[var(--scroll-prompt-icon)]">
        <img
          src={arrowDown}
          alt=""
          aria-hidden
          className="absolute block max-w-none motion-safe:animate-bounce"
          style={{ inset: '25% 30% 35% 30%' }}
        />
      </span>
    </button>
  )
}
