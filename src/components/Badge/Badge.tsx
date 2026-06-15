import type { BadgeProps } from './Badge.types'

// TODO: 7일 후 만료 — 로컬 SVG 에셋으로 교체 필요
const OKICLUB_FEED_URL = 'https://www.figma.com/api/mcp/asset/a61bd60d-75c2-4d1b-9b3b-3eb5baffe14f'
const OKICLUB_DETAIL_URL = 'https://www.figma.com/api/mcp/asset/bba9a997-c9f8-4723-b1a3-e1cadab63267'

function ClockIcon({ size }: { size: 14 | 16 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 14 14" fill="none" aria-hidden="true">
      <circle cx="7" cy="7" r="5.5" stroke="white" strokeWidth="1.2" />
      <path
        d="M7 4.5V7L8.5 8.5"
        stroke="white"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

const GRADIENTS = {
  Timer: {
    feed: 'linear-gradient(120.59deg, #0946fe 15.977%, #9544ff 85.589%)',
    detail: 'linear-gradient(119.27deg, #0946fe 15.977%, #9544ff 85.589%)',
  },
  New: {
    feed: 'linear-gradient(100.08deg, #fe0955 17.78%, #fa467e 100%)',
    detail: 'linear-gradient(99.18deg, #fe0955 17.78%, #fa467e 100%)',
  },
  First: {
    feed: 'linear-gradient(148.24deg, #6c40f0 0%, #8058f7 100%)',
    detail: 'linear-gradient(145.75deg, #6c40f0 0%, #8058f7 100%)',
  },
  OkiClub: {
    feed: 'linear-gradient(-65.80deg, #7c00fe 0%, #ff06d8 100%)',
    detail: 'linear-gradient(-65.47deg, #7c00fe 0%, #ff06d8 100%)',
  },
} as const

export default function Badge({
  type = 'Timer',
  size = 'feed',
  label = 'Label',
  time = '12:23:22',
  rank = '1',
  className,
}: BadgeProps) {
  const isFeed = size === 'feed'

  // 코너 반경: feed=대각선 tl+br(6px), detail=br만(12px)
  const feedRadius = 'rounded-tl-[var(--products-radius-8)] rounded-br-[var(--products-radius-8)]'
  const detailRadius = 'rounded-br-[var(--radius-150)]'
  const cornerCls = isFeed ? feedRadius : detailRadius

  // 배지 크기·패딩
  const sizeMap: Record<string, Record<string, string>> = {
    Timer:   { feed: 'h-[26px] px-[8px] py-[4px] gap-[2px]', detail: 'h-8 px-[8px] py-[4px] gap-[2px]' },
    New:     { feed: 'h-[26px] px-[8px] py-[4px]',            detail: 'h-8 px-[8px] py-[4px]' },
    First:   { feed: 'h-[26px] px-[8px] py-[4px]',            detail: 'h-8 px-[8px] py-[4px]' },
    Rank:    { feed: 'h-[20px] w-[18px] justify-center py-[2px]', detail: 'size-8 justify-center py-[2px]' },
    OkiClub: { feed: 'h-[26px] px-[6px] py-[4px]',            detail: 'h-8 w-[70px] px-[8px] py-[4px]' },
  }
  const sizeCls = sizeMap[type]?.[size] ?? ''

  const gradient = type !== 'Rank' ? GRADIENTS[type as keyof typeof GRADIENTS]?.[size] : undefined

  const containerCls =
    className ??
    [
      'inline-flex items-center',
      cornerCls,
      sizeCls,
      type === 'Rank' ? 'bg-[var(--primitive-blueblack)]' : '',
    ]
      .filter(Boolean)
      .join(' ')

  const whiteTextCls = 'font-bold text-[var(--primitive-white)] tracking-[0] whitespace-nowrap'
  const feedTextCls = `${whiteTextCls} text-[10px] leading-[15px]`
  const detailTextCls = `${whiteTextCls} text-[12px] leading-[16px]`
  const textCls = isFeed ? feedTextCls : detailTextCls

  return (
    <div
      className={containerCls}
      style={gradient ? { backgroundImage: gradient } : undefined}
      role="img"
      aria-label={`${type} 배지`}
    >
      {type === 'Timer' && (
        <>
          <ClockIcon size={isFeed ? 14 : 16} />
          <span className={isFeed ? feedTextCls : `${detailTextCls} w-[50px]`}>{time}</span>
        </>
      )}

      {(type === 'New' || type === 'First') && (
        <span className={textCls}>{label}</span>
      )}

      {type === 'Rank' && (
        <span
          className={isFeed
            ? `font-bold text-[var(--primitive-white)] text-[11px] leading-[16px] tracking-[0] whitespace-nowrap`
            : detailTextCls}
        >
          {rank}
        </span>
      )}

      {type === 'OkiClub' && (
        <img
          src={isFeed ? OKICLUB_FEED_URL : OKICLUB_DETAIL_URL}
          alt="오키클럽"
          className={isFeed ? 'h-[10px] w-[44px] object-contain' : 'h-3 w-[54px] object-contain'}
        />
      )}
    </div>
  )
}
