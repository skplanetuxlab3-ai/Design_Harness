import Button from '../Button'
import type { StampCardItem, StampCardProps, StampCardType } from './StampCard.types'
// Figma: StampCard 19550:129785 / Stamp progress 19570:147339 · 19570:147320
import checkShopping from '../../assets/icon-stamp-check-shopping_19284-238763.svg'
import checkCoupang from '../../assets/icon-stamp-check-coupang_19284-238780.svg'
import prizeIcon from '../../assets/icon-stamp-ecoupon_19245-152483.svg'

const ACCENT: Record<StampCardType, string> = {
  Shopping: 'var(--primitive-shopping-purple-700)',
  Coupang: 'var(--primitive-system-sub-pink)',
}
const BAR: Record<StampCardType, string> = {
  Shopping: 'var(--primitive-shopping-purple-600)',
  Coupang: 'var(--primitive-system-sub-pink)',
}
const CHECK: Record<StampCardType, string> = {
  Shopping: checkShopping,
  Coupang: checkCoupang,
}

/** Elements / Stamp — 찍힘(체크) · 미획득(번호) · 경품 세 상태 */
function Stamp({
  type,
  filled,
  label,
  prize,
}: {
  type: StampCardType
  filled: boolean
  label: number
  prize: boolean
}) {
  return (
    <div className="relative z-[1] flex shrink-0 flex-col items-center justify-center rounded-[var(--radius-max)] size-[var(--stamp-size)]">
      {prize ? (
        <div className="relative shrink-0 overflow-clip size-[var(--stamp-size)]">
          <img
            src={prizeIcon}
            alt=""
            aria-hidden
            className="absolute block max-w-none -translate-x-1/2 -translate-y-1/2"
            style={{ left: '50%', top: 'calc(50% + 0.2px)', width: '25.444px', height: '22px' }}
          />
        </div>
      ) : filled ? (
        <img src={CHECK[type]} alt="" aria-hidden className="block shrink-0 size-[var(--stamp-num-size)]" />
      ) : (
        <div className="flex shrink-0 flex-col items-center justify-center rounded-[var(--radius-max)] bg-[var(--primitive-black-800)] size-[var(--stamp-num-size)]">
          <span className="whitespace-nowrap text-center text-[length:var(--typeset-xs-size)] leading-[var(--typeset-xs-lh)] font-semibold text-[var(--primitive-blueblack-300)] tracking-[0]">
            {label}
          </span>
        </div>
      )}
    </div>
  )
}

function StampProgress({ type, count, slots, startAt, prizeAt }: Required<Omit<StampCardItem, 'title' | 'actionLabel' | 'onAction' | 'prizeAt'>> & { prizeAt: number | null }) {
  const filled = Math.max(0, Math.min(slots, count - startAt + 1))
  /**
   * 활성 바는 "찍힌 마지막 스탬프의 중심" 까지 찬다 (Figma: 쇼핑 63.258/162, 쿠팡 98/162).
   * 스탬프는 px 패딩 안에서 justify-between 이므로 i 번째 중심은
   *   pad + size/2 + i * (W - 2*pad - size) / (slots-1)
   * 이다. W 를 모르므로 calc 로 그대로 옮긴다.
   */
  const PAD = 'var(--stampcard-inner-px)'
  const SZ = 'var(--stamp-size)'
  const activeWidth =
    filled === 0
      ? '0px'
      : slots > 1
        ? `calc(${PAD} + ${SZ} / 2 + ${filled - 1} * ((100% - 2 * ${PAD} - ${SZ}) / ${slots - 1}))`
        : `calc(${PAD} + ${SZ} / 2)`

  return (
    <div className="relative flex w-full items-center justify-between px-[var(--stampcard-inner-px)]">
      <div
        className="absolute left-0 right-0 -translate-y-1/2 bg-[var(--primitive-black-800)]"
        style={{ top: '50%', height: 'var(--stamp-bar-h)' }}
        aria-hidden
      />
      <div
        className="absolute left-0 -translate-y-1/2"
        style={{ top: '50%', height: 'var(--stamp-bar-h)', width: activeWidth, backgroundColor: BAR[type] }}
        aria-hidden
      />
      {Array.from({ length: slots }, (_, i) => {
        const num = startAt + i
        return (
          <Stamp
            key={i}
            type={type}
            filled={i < filled}
            label={num}
            prize={prizeAt != null && num === prizeAt}
          />
        )
      })}
    </div>
  )
}

const DEFAULT_ITEMS: StampCardItem[] = [
  { type: 'Shopping', title: '쇼핑 스탬프', count: 2, slots: 4, startAt: 1, actionLabel: '보기' },
  { type: 'Coupang', title: '쿠팡 스탬프', count: 10, slots: 4, startAt: 8, prizeAt: 10, actionLabel: '뽑기' },
]

export default function StampCard({ items = DEFAULT_ITEMS, className }: StampCardProps) {
  return (
    <div
      className={
        className ??
        'flex w-full items-center gap-[var(--stampcard-gap)] pb-[var(--stampcard-pb)] px-[var(--stampcard-px)]'
      }
    >
      {items.map((raw, i) => {
        const it = {
          type: 'Shopping' as StampCardType,
          count: 0,
          slots: 4,
          startAt: 1,
          prizeAt: null as number | null,
          ...raw,
        }
        return (
          <div
            key={i}
            className="flex flex-1 min-w-0 flex-col justify-center gap-[var(--stampcard-inner-gap)] items-start rounded-[var(--stampcard-r)] border border-[var(--primitive-black-opacity-50)] bg-[var(--primitive-white)] py-[var(--stampcard-inner-px)]"
            style={{
              boxShadow:
                'var(--elevation-glow-x) var(--elevation-glow-y) var(--elevation-glow-blur) var(--elevation-glow-spread) var(--elevation-glow-color)',
            }}
          >
            <div className="flex w-full items-start justify-between px-[var(--stampcard-inner-px)]">
              <div className="flex min-w-0 flex-col items-start">
                <p className="whitespace-nowrap text-[length:var(--typeset-md-size)] leading-[var(--typeset-md-lh)] font-medium text-[var(--primitive-sp-black)] tracking-[0]">
                  {it.title}
                </p>
                <p
                  className="whitespace-nowrap text-[length:var(--typeset-3xl-size)] leading-[var(--typeset-3xl-lh)] font-bold tracking-[0]"
                  style={{ color: ACCENT[it.type] }}
                >
                  {it.count}개
                </p>
              </div>
              {it.actionLabel && (
                <Button
                  label={it.actionLabel}
                  size="xs"
                  tone={it.type === 'Coupang' ? 'primary' : 'grey'}
                  onClick={it.onAction}
                />
              )}
            </div>
            <StampProgress
              type={it.type}
              count={it.count}
              slots={it.slots}
              startAt={it.startAt}
              prizeAt={it.prizeAt ?? null}
            />
          </div>
        )
      })}
    </div>
  )
}
