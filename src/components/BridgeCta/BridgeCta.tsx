import type { BridgeCtaProps } from './BridgeCta.types'
// Figma: btn/btn_floating_fixed 19532:140322 (OC19)
import starIcon from '../../assets/icon-star-solid_19532-140330.svg'
import arrowIcon from '../../assets/icon-tooltip-arrow_19532-140338.svg'

/** 브릿지 하단 고정 CTA — 즐겨찾기 별 + 주 버튼, 별 위에 툴팁 */
export default function BridgeCta({
  label,
  notice = '적립을 위한 개인정보 국외이전 동의',
  favorite = false,
  tooltip,
  onFavorite,
  onClick,
  className,
}: BridgeCtaProps) {
  return (
    <div
      className={
        className ??
        'relative flex w-full flex-col items-center gap-[var(--products-spacing-08)] bg-[var(--primitive-white)] pt-[var(--bridge-cta-pt)] pb-[var(--bridge-cta-pb)] px-[var(--bridge-cta-px)]'
      }
    >
      {notice && (
        <p className="text-[length:var(--typo-b7-400-size)] leading-[var(--typo-b7-400-lh)] font-normal text-[var(--primitive-neutral-gray-750)] tracking-[0]">
          {notice}
        </p>
      )}

      <div className="relative flex w-full items-center justify-end gap-[var(--bridge-cta-gap)]">
        {/* 즐겨찾기 — btn / md / filled / inactive */}
        <div className="relative shrink-0">
          {tooltip && (
            <span className="absolute bottom-full left-1/2 mb-[var(--bridge-tooltip-arrow-h)] flex -translate-x-1/2 flex-col items-center">
              <span
                className="flex items-start whitespace-nowrap rounded-[var(--bridge-tooltip-r)] px-[var(--bridge-tooltip-px)] py-px text-[length:var(--typeset-xs-size)] leading-[var(--typeset-xs-lh)] font-normal text-[var(--primitive-white)] tracking-[0]"
                style={{ backgroundColor: 'var(--primitive-bridge-tooltip)' }}
              >
                {tooltip}
              </span>
              <img
                src={arrowIcon}
                alt=""
                aria-hidden
                className="block"
                style={{ width: 'var(--bridge-tooltip-arrow-w)', height: 'var(--bridge-tooltip-arrow-h)' }}
              />
            </span>
          )}
          <button
            type="button"
            onClick={onFavorite}
            aria-pressed={favorite}
            aria-label="즐겨찾기"
            className="flex items-center justify-center rounded-[var(--radius-max)] size-[var(--bridge-fav-size)]"
            style={{
              backgroundColor: favorite
                ? 'var(--primitive-system-bg-yellow, var(--primitive-black-800))'
                : 'var(--primitive-blueblack-700)',
            }}
          >
            <img
              src={starIcon}
              alt=""
              aria-hidden
              className="block"
              style={{ width: 'var(--bridge-fav-icon)', height: 'var(--bridge-fav-icon)' }}
            />
          </button>
        </div>

        {/* 주 버튼 — btn/btn_stamp */}
        <button
          type="button"
          onClick={onClick}
          className="flex min-w-0 flex-1 items-center justify-center rounded-[var(--radius-max)] px-[var(--products-spacing-10)] py-[var(--products-spacing-14)] text-[length:var(--typo-b6-700-size)] leading-[var(--typo-b6-700-lh)] font-bold text-[var(--semantic-static-white)] tracking-[0]"
          style={{
            height: 'var(--bridge-cta-h)',
            backgroundColor: 'var(--semantic-primary-strong)',
            maxWidth: 'var(--bridge-max-w)',
          }}
        >
          <span className="truncate">{label}</span>
        </button>
      </div>
    </div>
  )
}
