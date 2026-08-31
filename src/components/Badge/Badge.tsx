import type { BadgeProps } from './Badge.types'
// Figma node 14176:77748 (ico_okiclub) — 로컬 에셋. 만료되는 MCP URL을 쓰지 않는다.
import okiclubLogo from '../../assets/icon-okiclub_14176-77748.svg'

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

// 색 스톱은 한 번만 적는다 — 각도만 용도별로 다르다.
// TODO: 그라디언트 전용 토큰이 없다. src/tokens/colors.css 에 신설 검토 필요.
const STOPS_BLUE_PURPLE = '#0946fe 15.977%, #9544ff 85.589%'

const GRADIENTS = {
  Timer: {
    feed: `linear-gradient(120.59deg, ${STOPS_BLUE_PURPLE})`,
    detail: `linear-gradient(119.27deg, ${STOPS_BLUE_PURPLE})`,
  },
  New: {
    feed: 'linear-gradient(98.90deg, #fe0955 17.78%, #fa467e 100%)',
    detail: 'linear-gradient(98.22deg, #fe0955 17.78%, #fa467e 100%)',
  },
  First: {
    feed: 'linear-gradient(148.24deg, #6c40f0 0%, #8058f7 100%)',
    detail: 'linear-gradient(146.31deg, #6c40f0 0%, #8058f7 100%)',
  },
  OkiClub: {
    feed: 'linear-gradient(-65.80deg, #7c00fe 0%, #ff06d8 100%)',
    detail: 'linear-gradient(-65.47deg, #7c00fe 0%, #ff06d8 100%)',
  },
  // Primary("내가 본") — Timer 와 같은 색, 각도만 다름 (Figma node 17717:192087 / 17717:192109)
  Primary: {
    feed: `linear-gradient(110.28deg, ${STOPS_BLUE_PURPLE})`,
    detail: `linear-gradient(108.45deg, ${STOPS_BLUE_PURPLE})`,
  },
} as const

/** Figma 의 variant 별 기본 라벨 */
const DEFAULT_LABEL: Record<string, string> = {
  New: 'New',
  First: '첫구매',
  Primary: '내가 본',
}

export default function Badge({
  type = 'Timer',
  size = 'feed',
  label,
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
  // 라벨형 배지(New·First·Primary)는 크기가 같다 — 클래스 문자열을 공유한다
  const labelPill = { feed: 'h-[26px] px-[8px] py-[4px]', detail: 'h-8 px-[8px] py-[4px]' }
  const sizeMap: Record<string, Record<string, string>> = {
    Timer:   { feed: `${labelPill.feed} gap-[2px]`, detail: `${labelPill.detail} gap-[2px]` },
    New:     labelPill,
    First:   labelPill,
    Ranking: { feed: 'h-[20px] w-[18px] justify-center py-[2px]', detail: 'size-8 justify-center py-[2px]' },
    OkiClub: { feed: 'h-[26px] px-[6px] py-[4px]',  detail: 'h-8 w-[70px] px-[8px] py-[4px]' },
    Primary: labelPill,
  }
  const sizeCls = sizeMap[type]?.[size] ?? ''

  const gradient = type !== 'Ranking' ? GRADIENTS[type as keyof typeof GRADIENTS]?.[size] : undefined

  const containerCls =
    className ??
    [
      'inline-flex items-center',
      cornerCls,
      sizeCls,
      type === 'Ranking' ? 'bg-[var(--primitive-blueblack)]' : '',
    ]
      .filter(Boolean)
      .join(' ')

  const whiteTextCls = 'font-bold text-[var(--primitive-white)] tracking-[0] whitespace-nowrap'
  const feedTextCls = `${whiteTextCls} text-[length:var(--typeset-2xs-size)] leading-[var(--typeset-2xs-lh)]`
  const detailTextCls = `${whiteTextCls} text-[length:var(--typeset-sm-size)] leading-[var(--typeset-sm-lh)]`
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

      {(type === 'New' || type === 'First' || type === 'Primary') && (
        <span className={textCls}>{label ?? DEFAULT_LABEL[type]}</span>
      )}

      {type === 'Ranking' && (
        <span
          className={isFeed
            ? `font-bold text-[var(--primitive-white)] text-[length:var(--typeset-xs-size)] leading-[var(--typeset-xs-lh)] tracking-[0] whitespace-nowrap`
            : detailTextCls}
        >
          {rank}
        </span>
      )}

      {type === 'OkiClub' && (
        <img
          src={okiclubLogo}
          alt="OK캐시백 클럽"
          // shrink-0 필수 — preflight 의 img{max-width:100%} 가 너비 미확정 컨테이너에서
          // 0 으로 해석돼 로고가 사라진다 (feed 는 컨테이너에 고정 너비가 없다)
          className={isFeed ? 'h-[10px] w-[44px] shrink-0 object-contain' : 'h-3 w-[54px] shrink-0 object-contain'}
        />
      )}
    </div>
  )
}
