import type { SocialDealCardProps } from './SocialDealCard.types'

// ─── Figma CDN 에셋 (node 20341-19611, 7일 만료 — TODO: src/assets/ 로컬 교체) ───
const EYE_ICON         = 'https://www.figma.com/api/mcp/asset/455e3aaa-0d2f-42a5-8036-8e3039d94009'
const LOGO_MASK_YELLOW = 'https://www.figma.com/api/mcp/asset/2fa02850-e89a-4535-b506-2a83dfd5d88d' // 할인공구
const LOGO_MASK_PINK   = 'https://www.figma.com/api/mcp/asset/0e91cdc9-c5bf-483b-97a9-4f2c81377966' // 특템공구

/** 배지 로고 (마스크 + 타이머/D-day) */
function LogoBadge({ accent, label }: { accent: 'yellow' | 'pink'; label: string }) {
  const maskUrl = accent === 'yellow' ? LOGO_MASK_YELLOW : LOGO_MASK_PINK
  const logoColor = accent === 'yellow' ? 'var(--socialdeal-badge-logo-discount)' : 'var(--socialdeal-badge-logo-hot)'
  return (
    <div
      className="absolute left-0 top-0 flex flex-col items-center"
      style={{
        width: 'var(--socialdeal-badge-w)',
        paddingTop: 'var(--socialdeal-badge-pt)',
        paddingBottom: 'var(--socialdeal-badge-pb)',
        paddingInline: 'var(--socialdeal-badge-px)',
        gap: 'var(--socialdeal-badge-gap)',
        backgroundColor: 'var(--socialdeal-badge-surface)',
        borderTopLeftRadius: 'var(--socialdeal-badge-r)',
        borderBottomRightRadius: 'var(--socialdeal-badge-r)',
      }}
    >
      <div
        className="shrink-0"
        style={{
          width: 'var(--socialdeal-badge-logo-w)',
          height: 'var(--socialdeal-badge-logo-h)',
          backgroundColor: logoColor,
          maskImage: `url(${maskUrl})`,
          maskSize: '46px 12px',
          maskRepeat: 'no-repeat',
          WebkitMaskImage: `url(${maskUrl})`,
          WebkitMaskSize: '46px 12px',
          WebkitMaskRepeat: 'no-repeat',
        }}
      />
      <span
        className="font-bold whitespace-nowrap"
        style={{
          fontSize: 'var(--typeset-2xs-size)',
          lineHeight: 'var(--typeset-2xs-lh)',
          color: 'var(--socialdeal-badge-text)',
        }}
      >
        {label}
      </span>
    </div>
  )
}

function JoiningChip({ className }: { className?: string }) {
  return (
    <div
      className={`absolute flex items-center justify-center ${className ?? ''}`}
      style={{
        top: 'var(--socialdeal-joining-offset)',
        right: 'var(--socialdeal-joining-offset)',
        minWidth: 'var(--socialdeal-joining-min-w)',
        paddingInline: 'var(--socialdeal-joining-px)',
        paddingBlock: 'var(--socialdeal-joining-py)',
        borderRadius: 'var(--radius-max)',
        backgroundColor: 'var(--socialdeal-joining-surface)',
      }}
    >
      <span
        className="font-bold text-center whitespace-nowrap"
        style={{
          fontSize: 'var(--typeset-xs-size)',
          lineHeight: 'var(--typeset-xs-lh)',
          color: 'var(--socialdeal-joining-text)',
        }}
      >
        참여중
      </span>
    </div>
  )
}

function SoldoutOverlay() {
  return (
    <div className="absolute inset-0">
      <div className="absolute inset-0" style={{ backgroundColor: 'var(--socialdeal-soldout-overlay)' }} />
      <div className="absolute left-1/2 -translate-x-1/2" style={{ top: 'var(--socialdeal-soldout-top)' }}>
        <div style={{ transform: `rotate(var(--socialdeal-soldout-rotate))` }}>
          <div
            className="flex flex-col items-center justify-center"
            style={{
              paddingInline: 'var(--socialdeal-soldout-px)',
              paddingBlock: 'var(--socialdeal-soldout-py)',
              borderRadius: 'var(--socialdeal-soldout-r)',
              backgroundColor: 'var(--socialdeal-soldout-surface)',
            }}
          >
            <span
              className="font-bold whitespace-nowrap"
              style={{
                fontSize: 'var(--typeset-5xl-size)',
                lineHeight: 'var(--typeset-5xl-lh)',
                color: 'var(--socialdeal-soldout-text)',
              }}
            >
              SOLD OUT
            </span>
            <span
              className="font-semibold whitespace-nowrap"
              style={{
                fontSize: 'var(--typeset-xs-size)',
                lineHeight: 'var(--typeset-xs-lh)',
                color: 'var(--socialdeal-soldout-sub-text)',
              }}
            >
              준비한 수량이 완판됐어요!
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function SocialDealCard({
  imageUrl,
  title = '설날 선물의 기본템\n신세계 상품권 1만원권',
  goalLabel = '목표가',
  discount = '3%',
  price = '9,700원',
  accent = 'yellow',
  progress = 0.2432,
  watching = '2,103명이 보고 있어요',
  goalCount = '500개 목표',
  badgeType = 'timer',
  badgeLabel = '88:88:88',
  joining = false,
  soldout = false,
  className,
}: SocialDealCardProps) {
  const lines = title.split('\n')
  const discountColor =
    accent === 'yellow' ? 'var(--socialdeal-discount-yellow)' : 'var(--socialdeal-discount-pink)'

  return (
    <div
      className={`relative flex flex-col items-center justify-end overflow-clip w-full ${className ?? ''}`}
      style={{
        height: 'var(--socialdeal-card-large-h)',
        borderRadius: 'var(--products-spacing-50)',
      }}
    >
      {/* 배경 이미지 */}
      {imageUrl ? (
        <img
          src={imageUrl}
          alt=""
          aria-hidden
          className="absolute inset-0 w-full h-full object-cover pointer-events-none"
        />
      ) : (
        <div className="absolute inset-0" style={{ backgroundColor: 'var(--primitive-blueblack)' }} />
      )}

      {/* 콘텐츠 */}
      <div
        className="relative flex flex-col items-start w-full"
        style={{ padding: 'var(--socialdeal-contents-p)', gap: 'var(--socialdeal-contents-gap)' }}
      >
        {/* Top: 타이틀 + 가격 */}
        <div className="flex flex-col items-start w-full" style={{ gap: 'var(--socialdeal-top-gap)' }}>
          <p
            className="font-bold overflow-hidden"
            style={{
              fontSize: 'var(--typeset-xl-size)',
              lineHeight: 'var(--typeset-xl-lh)',
              color: 'var(--socialdeal-title-text)',
              maxHeight: '48px',
              width: '210px',
            }}
          >
            {lines.map((l, i) => (
              <span key={i} className="block">{l}</span>
            ))}
          </p>
          <div className="flex items-center" style={{ gap: 'var(--socialdeal-price-gap)' }}>
            {/* 목표가 칩 */}
            <span
              className="flex items-center font-bold whitespace-nowrap"
              style={{
                paddingInline: 'var(--socialdeal-price-chip-px)',
                paddingBlock: 'var(--socialdeal-price-chip-py)',
                borderRadius: 'var(--socialdeal-price-chip-r)',
                backgroundColor: 'var(--socialdeal-price-chip-surface)',
                color: 'var(--socialdeal-price-chip-text)',
                fontSize: 'var(--typeset-md-compact-size)',
                lineHeight: 'var(--typeset-md-compact-lh)',
              }}
            >
              {goalLabel}
            </span>
            {/* 할인율 + 가격 */}
            <span className="flex items-center whitespace-nowrap" style={{ gap: 'var(--socialdeal-price-num-gap)' }}>
              <span
                className="font-bold"
                style={{ fontSize: 'var(--typeset-4xl-size)', lineHeight: 'var(--typeset-4xl-lh)', color: discountColor }}
              >
                {discount}
              </span>
              <span
                className="font-bold"
                style={{ fontSize: 'var(--typeset-4xl-size)', lineHeight: 'var(--typeset-4xl-lh)', color: 'var(--socialdeal-price-text)' }}
              >
                {price}
              </span>
            </span>
          </div>
        </div>

        {/* Bottom: 진행바 + 소셜프루프 */}
        <div className="flex flex-col items-start w-full" style={{ gap: 'var(--socialdeal-bottom-gap)' }}>
          {/* 진행바 */}
          <div className="relative w-full" style={{ height: 'var(--socialdeal-progress-h)' }}>
            <div
              className="absolute inset-0"
              style={{ backgroundColor: 'var(--socialdeal-progress-track)', borderRadius: 'var(--radius-max)' }}
            />
            <div
              className="absolute left-0 top-0 h-full"
              style={{
                width: `${Math.min(Math.max(progress, 0), 1) * 100}%`,
                backgroundColor: 'var(--socialdeal-progress-fill)',
                borderRadius: 'var(--radius-max)',
              }}
            />
          </div>
          {/* 텍스트 행 */}
          <div className="flex items-center justify-between w-full">
            <div className="flex items-center" style={{ gap: 'var(--socialdeal-proof-gap)' }}>
              <img
                src={EYE_ICON}
                alt=""
                aria-hidden
                className="shrink-0 object-contain"
                style={{ width: 'var(--socialdeal-proof-icon-size)', height: 'var(--socialdeal-proof-icon-size)' }}
              />
              <span
                className="font-semibold whitespace-nowrap"
                style={{
                  fontSize: 'var(--typeset-xs-size)',
                  lineHeight: 'var(--typeset-xs-lh)',
                  color: 'var(--socialdeal-proof-text)',
                }}
              >
                {watching}
              </span>
            </div>
            <span
              className="font-bold text-right whitespace-nowrap"
              style={{
                fontSize: 'var(--typeset-sm-size)',
                lineHeight: 'var(--typeset-sm-lh)',
                color: 'var(--socialdeal-goal-text)',
              }}
            >
              {goalCount}
            </span>
          </div>
        </div>
      </div>

      {/* 완판 오버레이 (배지/참여중 위에 깔리되 배지는 상단 유지) */}
      {soldout && <SoldoutOverlay />}

      {/* 배지 (로고 + 타이머/D-day) */}
      <LogoBadge accent={accent} label={badgeLabel} />

      {/* 참여중 칩 */}
      {joining && <JoiningChip />}
    </div>
  )
}
