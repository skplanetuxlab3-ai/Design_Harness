import { useState } from 'react'
import type { CheckoutPanelProps, CheckoutState } from './CheckoutPanel.types'

// ─── 로컬 에셋 (Figma Order info 9689:46435 / Order Settings 9689:46512) ───
import icoClose from '../../assets/icon-close-16_9679-49730.svg'
import icoTooltip from '../../assets/icon-tooltip-14_9679-49773.svg'
import icoCheck from '../../assets/icon-check-20_4111-85589.svg'
import icoQtyMinus from '../../assets/icon-qty-minus-14_4721-14278.svg'
import icoQtyPlus from '../../assets/icon-qty-plus-14_4721-14287.svg'
import icoCaution from '../../assets/icon-caution-14_9679-50036.svg'

/** 툴팁 아이콘 — Figma 는 14px 박스 안에 13px 아이콘을 0.5px 오프셋으로 넣는다 */
function TooltipIcon() {
  return (
    <span
      className="inline-flex shrink-0 items-center justify-center"
      style={{ width: 'var(--checkout-tooltip-icon)', height: 'var(--checkout-tooltip-icon)' }}
    >
      {/* 아이콘 원본은 13px — 14px 박스 안에서 중앙정렬한다 (Figma 는 0.5px 오프셋으로 표현) */}
      <img src={icoTooltip} alt="" aria-hidden className="max-w-none" />
    </span>
  )
}

/** 수량 컨트롤 — Figma Quantity Control (4721:14300) */
function QuantityControl({
  quantity,
  max,
  onChange,
}: {
  quantity: number
  max: number
  onChange: (next: number) => void
}) {
  const btnCls = 'flex flex-col items-center justify-center overflow-clip shrink-0'
  const btnStyle = { width: 'var(--checkout-qty-btn-w)', height: 'var(--checkout-qty-btn-h)' }
  const iconStyle = { width: 'var(--checkout-tooltip-icon)', height: 'var(--checkout-tooltip-icon)' }

  return (
    <div
      className="flex flex-col items-center shrink-0"
      style={{ rowGap: 'var(--checkout-quantity-gap)' }}
    >
      <div
        className="flex items-center shrink-0 bg-[var(--primitive-black-800)]"
        style={{ borderRadius: 'var(--products-radius-8)' }}
      >
        <button
          type="button"
          className={btnCls}
          style={btnStyle}
          onClick={() => onChange(quantity - 1)}
          disabled={quantity <= 1}
          aria-label="수량 줄이기"
        >
          <img src={icoQtyMinus} alt="" aria-hidden className="max-w-none" style={iconStyle} />
        </button>

        <span
          className="flex flex-col items-center justify-center overflow-clip shrink-0 bg-[var(--primitive-white)] font-medium text-[var(--primitive-black)]"
          style={{
            width: 'var(--checkout-qty-num-w)',
            height: 'var(--checkout-qty-num-h)',
            borderRadius: 'var(--radius-050)',
            boxShadow: 'var(--shadow-glow)',
            fontSize: 'var(--typeset-md-compact-size)',
            lineHeight: 'var(--typeset-md-compact-lh)',
          }}
          aria-live="polite"
        >
          {quantity}
        </span>

        <button
          type="button"
          className={btnCls}
          style={btnStyle}
          onClick={() => onChange(quantity + 1)}
          disabled={quantity >= max}
          aria-label="수량 늘리기"
        >
          <img src={icoQtyPlus} alt="" aria-hidden className="max-w-none" style={iconStyle} />
        </button>
      </div>

      <span
        className="whitespace-nowrap overflow-hidden text-ellipsis text-[var(--primitive-black-300)] font-normal"
        style={{ fontSize: 'var(--typeset-xs-size)', lineHeight: 'var(--typeset-xs-lh)' }}
      >
        최대 {max}개
      </span>
    </div>
  )
}

/** 포인트 사용 표시 — 좌측 2px 디바이더 + 사용액(+ 부족 경고) */
function PointUsage({ pointDiscount, low, shortage }: { pointDiscount: string; low: boolean; shortage?: string }) {
  return (
    <div className="flex items-center" style={{ columnGap: 'var(--checkout-point-row-gap)' }}>
      <span
        className="self-stretch shrink-0 bg-[var(--primitive-blueblack-700)]"
        style={{ width: 'var(--checkout-point-divider-w)' }}
        aria-hidden
      />
      <span
        className="flex flex-col items-start justify-center"
        style={{ rowGap: 'var(--checkout-point-inner-gap)' }}
      >
        <span
          className="whitespace-nowrap font-medium text-[var(--primitive-shopping-purple-600)]"
          style={{ fontSize: 'var(--typeset-sm-size)', lineHeight: 'var(--typeset-sm-lh)' }}
        >
          OK캐쉬백 포인트 {pointDiscount} 사용
        </span>

        {low && (
          <span
            className="flex items-center"
            style={{ columnGap: 'var(--checkout-point-alert-gap)' }}
          >
            {/* 느낌표는 Figma 에서 벡터가 아니라 흰 사각형 프레임이라 SVG export 에 안 담긴다.
                원본 좌표(13px 박스 기준)를 % 로 환산해 그대로 재현한다. */}
            <span
              className="relative shrink-0 inline-flex items-center justify-center"
              style={{
                width: 'var(--checkout-tooltip-icon)',
                height: 'var(--checkout-tooltip-icon)',
              }}
              aria-hidden
            >
              <img src={icoCaution} alt="" className="max-w-none" />
              <span
                className="absolute bg-[var(--primitive-white)]"
                style={{ left: '48.77%', top: '24.69%', width: '9.72%', height: '38.90%' }}
              />
              <span
                className="absolute bg-[var(--primitive-white)]"
                style={{ left: '48.77%', top: '73.31%', width: '9.72%', height: '9.72%' }}
              />
            </span>
            <span
              className="whitespace-nowrap font-medium text-[var(--color-brand-ocb-pink)]"
              style={{ fontSize: 'var(--typeset-sm-size)', lineHeight: 'var(--typeset-sm-lh)' }}
            >
              {shortage ? `${shortage} 부족` : '포인트 부족'}
            </span>
          </span>
        )}
      </span>
    </div>
  )
}

/** 상태별 CTA 버튼 — Figma Order / CTA (9689:48364) 는 btn/md/filled 가로 배치 */
const CTA_BY_STATE: Record<CheckoutState, { label: string; action: keyof CheckoutPanelProps }[]> = {
  default: [{ label: '동의하고 결제하기', action: 'onAgreeAndPay' }],
  pointFull: [{ label: '동의하고 결제하기', action: 'onAgreeAndPay' }],
  pointLow: [
    { label: '포인트 교환', action: 'onPointExchange' },
    { label: '포인트 충전', action: 'onPointCharge' },
  ],
}

export default function CheckoutPanel({
  state = 'default',
  productName = '스타벅스 아이스 카페 아메리카노 T',
  quantity: initialQuantity = 1,
  maxQuantity = 2,
  originalPrice = '1,000,000원',
  finalPrice = '997,000원',
  pointDiscount = '-10,570P',
  pointAutoCharge = true,
  bannerType = 'cashback',
  cashbackText = '800P',
  pointShortage,
  showQuantity = true,
  phoneNumber = '010-****-1234',
  showRetryPayment = true,
  showAgreement = true,
  onClose,
  onQuantityChange,
  onPointCharge,
  onPointExchange,
  onAgreeAndPay,
  onPointDetail,
  className,
}: CheckoutPanelProps) {
  const [quantity, setQuantity] = useState(initialQuantity)
  const [retryChecked, setRetryChecked] = useState(false)

  function handleQtyChange(next: number) {
    const clamped = Math.min(Math.max(next, 1), maxQuantity)
    setQuantity(clamped)
    onQuantityChange?.(clamped)
  }

  const handlers: Partial<Record<keyof CheckoutPanelProps, (() => void) | undefined>> = {
    onAgreeAndPay,
    onPointCharge,
    onPointExchange,
  }

  const rowCls = 'flex items-center justify-between w-full shrink-0'
  const labelCls = 'whitespace-nowrap font-medium text-[var(--primitive-black-200)]'
  const labelStyle = { fontSize: 'var(--typeset-md-size)', lineHeight: 'var(--typeset-md-lh)' }

  return (
    <div className={className ?? 'flex flex-col w-full bg-[var(--primitive-white)]'}>
      {/* ── Order info ─────────────────────────────────────── */}
      <section
        className="relative flex flex-col items-start w-full bg-[var(--primitive-white)] border-b border-solid border-[var(--primitive-black-800)]"
        style={{
          rowGap: 'var(--checkout-order-info-block-gap)',
          paddingTop: 'var(--checkout-order-info-pt)',
          paddingBottom: 'var(--checkout-order-info-pb)',
          paddingInline: 'var(--checkout-order-info-px)',
          borderTopLeftRadius: 'var(--checkout-sheet-r)',
          borderTopRightRadius: 'var(--checkout-sheet-r)',
        }}
        aria-label="주문 정보"
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="닫기"
          className="absolute flex items-center justify-center"
          style={{
            right: 'var(--spacing-2)',
            top: 'var(--spacing-2)',
            width: 'var(--checkout-close-touch)',
            height: 'var(--checkout-close-touch)',
          }}
        >
          <img
            src={icoClose}
            alt=""
            aria-hidden
            className="max-w-none"
            style={{ width: 'var(--checkout-close-icon)', height: 'var(--checkout-close-icon)' }}
          />
        </button>

        <div
          className="flex flex-col items-start w-full shrink-0"
          style={{ rowGap: 'var(--checkout-order-info-gap)' }}
        >
          {/* 상품명 + 원가 */}
          <div
            className="flex flex-col items-start shrink-0"
            style={{ rowGap: 'var(--checkout-order-info-title-gap)' }}
          >
            <span
              className="font-normal text-[var(--primitive-black-200)]"
              style={{ fontSize: 'var(--typeset-sm-size)', lineHeight: 'var(--typeset-sm-lh)' }}
            >
              {productName}
            </span>
            <span
              className="whitespace-nowrap font-bold text-[var(--primitive-black-100)]"
              style={{ fontSize: 'var(--typeset-md-size)', lineHeight: 'var(--typeset-md-lh)' }}
            >
              {originalPrice}
            </span>
          </div>

          {/* 결제금액 + 수량 컨트롤 */}
          <div
            className="flex items-start w-full shrink-0"
            style={{ columnGap: 'var(--checkout-order-info-details-gap)' }}
          >
            <div
              className="flex flex-col flex-1 min-w-0 items-start"
              style={{ rowGap: 'var(--checkout-order-info-details-gap)' }}
            >
              <div
                className="flex items-center whitespace-nowrap shrink-0"
                style={{ columnGap: 'var(--checkout-price-gap)' }}
              >
                <span
                  className="overflow-hidden text-ellipsis font-bold text-[var(--primitive-black)]"
                  style={{ fontSize: 'var(--typeset-3xl-size)', lineHeight: 'var(--typeset-3xl-lh)' }}
                >
                  {finalPrice}
                </span>
                <span
                  className="font-normal text-[var(--primitive-black-200)]"
                  style={{ fontSize: 'var(--typeset-xs-size)', lineHeight: 'var(--typeset-xs-lh)' }}
                >
                  총 결제 금액
                </span>
              </div>

              <PointUsage pointDiscount={pointDiscount} low={state === 'pointLow'} shortage={pointShortage} />
            </div>

            {showQuantity && (
              <QuantityControl quantity={quantity} max={maxQuantity} onChange={handleQtyChange} />
            )}
          </div>
        </div>

        {/* 안내 배너 — cashback / pointOnly */}
        {bannerType !== 'none' && (
        <div
          className="flex items-center justify-center overflow-clip w-full shrink-0 bg-[var(--primitive-black-800)]"
          style={{
            columnGap: 'var(--products-spacing-02)',
            paddingInline: 'var(--checkout-order-info-banner-px)',
            paddingBlock: 'var(--checkout-order-info-banner-py)',
            borderRadius: 'var(--checkout-order-info-banner-r)',
          }}
        >
          <span
            className="whitespace-nowrap overflow-hidden text-ellipsis text-center text-[var(--primitive-blueblack-100)]"
            style={{ fontSize: 'var(--typeset-sm-size)', lineHeight: 'var(--typeset-sm-lh)' }}
          >
            {bannerType === 'cashback' ? (
              <>
                목표 달성 시{' '}
                <b className="font-bold text-[var(--primitive-black)]">{cashbackText}</b> 캐쉬백
              </>
            ) : (
              <>
                <b className="font-bold text-[var(--color-brand-ocb-pink)]">포인트로만</b> 구매 가능한
                상품입니다
              </>
            )}
          </span>
          {bannerType === 'cashback' && <TooltipIcon />}
        </div>
        )}
      </section>

      {/* ── Order Settings ─────────────────────────────────── */}
      <section
        className="flex flex-col items-start w-full bg-[var(--primitive-white)]"
        style={{
          rowGap: 'var(--checkout-settings-gap)',
          paddingTop: 'var(--checkout-settings-pt)',
          paddingBottom: 'var(--checkout-settings-pb)',
          paddingInline: 'var(--checkout-order-info-px)',
        }}
        aria-label="주문 설정"
      >
        {/* 쿠폰 받을 번호 */}
        <div className={rowCls}>
          <span
            className="flex items-center shrink-0"
            style={{ columnGap: 'var(--checkout-settings-label-gap)' }}
          >
            <span className={labelCls} style={labelStyle}>
              쿠폰 받을 번호
            </span>
            <TooltipIcon />
          </span>
          <span
            className="whitespace-nowrap overflow-hidden text-ellipsis font-medium text-[var(--primitive-black-100)]"
            style={labelStyle}
          >
            {phoneNumber}
          </span>
        </div>

        {/* OK캐쉬백 포인트 */}
        <div className={rowCls}>
          <span className="flex flex-col items-start justify-center whitespace-nowrap shrink-0">
            <span className={labelCls} style={labelStyle}>
              OK캐쉬백 포인트
            </span>
            {pointAutoCharge && (
              <span
                className="text-[var(--primitive-blueblack-300)] font-normal"
                style={{ fontSize: 'var(--typeset-xs-size)', lineHeight: 'var(--typeset-xs-lh)' }}
              >
                자동충전 ON
              </span>
            )}
          </span>

          <span
            className="flex items-center shrink-0"
            style={{ columnGap: 'var(--checkout-point-row-gap)' }}
          >
            <span
              className="whitespace-nowrap overflow-hidden text-ellipsis font-medium text-[var(--primitive-shopping-purple-600)]"
              style={labelStyle}
            >
              {pointDiscount}
            </span>
            <button
              type="button"
              onClick={onPointDetail}
              className="flex items-center justify-center overflow-clip shrink-0 bg-[var(--primitive-blueblack-700)] font-bold text-[var(--primitive-blueblack-200)]"
              style={{
                paddingInline: 'var(--checkout-point-btn-px)',
                paddingBlock: 'var(--checkout-point-btn-py)',
                borderRadius: 'var(--checkout-point-btn-r)',
                fontSize: 'var(--typeset-sm-size)',
                lineHeight: 'var(--typeset-sm-lh)',
              }}
            >
              상세
            </button>
          </span>
        </div>

        {/* 목표 미달 시 지금 가격으로 구매 (2026-05 신설) */}
        {showRetryPayment && (
          <label className={`${rowCls} overflow-clip cursor-pointer`}>
            <span className={labelCls} style={labelStyle}>
              목표 미달 시 지금 가격으로 구매
            </span>
            <input
              type="checkbox"
              className="sr-only"
              checked={retryChecked}
              onChange={(e) => setRetryChecked(e.target.checked)}
            />
            <img
              src={icoCheck}
              alt=""
              aria-hidden
              className="shrink-0 max-w-none"
              style={{
                width: 'var(--checkout-check-size)',
                height: 'var(--checkout-check-size)',
                opacity: retryChecked ? 1 : 0.4,
              }}
            />
          </label>
        )}

        {/* 약관 동의 */}
        {showAgreement && (
        <p
          className="w-full shrink-0 overflow-clip text-[var(--primitive-black-300)] font-normal"
          style={{ fontSize: 'var(--typeset-2xs-size)', lineHeight: 'var(--typeset-sm-lh)' }}
        >
          쿠폰 정보 및 결제 조건을 확인하였으며,{' '}
          <span className="underline">개인정보 제3자 제공 동의 (SK플래닛㈜)</span>,{' '}
          <span className="underline">e쿠폰 서비스 이용약관</span>에 동의합니다.
        </p>
        )}
      </section>

      {/* ── Order / CTA ────────────────────────────────────── */}
      <section
        className="flex items-start justify-center overflow-clip w-full bg-[var(--primitive-white)]"
        style={{
          columnGap: 'var(--checkout-cta-gap)',
          paddingBottom: 'var(--checkout-cta-section-pb)',
          paddingInline: 'var(--checkout-cta-section-px)',
          borderBottomLeftRadius: 'var(--checkout-cta-section-r)',
          borderBottomRightRadius: 'var(--checkout-cta-section-r)',
        }}
      >
        {CTA_BY_STATE[state].map(({ label, action }) => (
          <button
            key={label}
            type="button"
            onClick={handlers[action]}
            className="flex flex-1 items-start overflow-clip bg-[var(--filled-primary-surface)] text-[var(--primitive-white)] font-bold text-center"
            style={{
              height: 'var(--checkout-cta-h)',
              maxWidth: 'var(--checkout-cta-max-w)',
              minWidth: 'var(--checkout-cta-min-w)',
              paddingInline: 'var(--checkout-cta-px)',
              paddingBlock: 'var(--checkout-cta-py)',
              borderRadius: 'var(--radius-max)',
              fontSize: 'var(--typeset-xl-size)',
              lineHeight: 'var(--typeset-xl-lh)',
            }}
          >
            <span className="flex-1 min-w-0">{label}</span>
          </button>
        ))}
      </section>
    </div>
  )
}
