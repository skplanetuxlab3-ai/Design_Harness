import ProductCard from '../ProductCard'
import type { ProductCardProps } from '../ProductCard/ProductCard.types'

// ─── Figma CDN 에셋 (node 20343-20697 img_banner, 7일 만료 — TODO: src/assets/ 로컬 교체) ───
const BANNER = {
  light:     'https://www.figma.com/api/mcp/asset/6f50e5c4-bcdc-415a-98ee-a226649e82bb',
  light1:    'https://www.figma.com/api/mcp/asset/58b1ff4b-67c6-4576-966e-f5febc9a091e',
  oneulman:  'https://www.figma.com/api/mcp/asset/3601d2b7-d94a-4afd-bafc-ce9cb9d2a191', // "오늘만" 마스크
  ellipse1:  'https://www.figma.com/api/mcp/asset/03456696-e379-48fa-af49-b1c750f02a8c',
  ellipse2:  'https://www.figma.com/api/mcp/asset/1e0c4c56-d08a-44b4-96f6-4eaf4e9b34ea',
  vector1:   'https://www.figma.com/api/mcp/asset/e7312f36-8a90-4114-8f9e-109106f6d65a',
  vector2:   'https://www.figma.com/api/mcp/asset/d9f7d7d9-65a7-4aa5-a69d-48d123c06ede',
  vector3:   'https://www.figma.com/api/mcp/asset/a6cfebd7-8b36-44e0-a7f3-dc12fc165de7',
}

// ── 히어로 배너 (Figma img_banner 레이어 충실 포팅) ──────────────
function HeroBanner() {
  return (
    <div
      className="relative overflow-hidden w-full shrink-0"
      style={{ height: 'var(--todaydeal-banner-h)', backgroundColor: 'var(--todaydeal-banner-surface)' }}
      aria-label="오늘만 — 매일 아침 9시마다"
    >
      {/* 프리즘 타원/빛줄기 (장식) */}
      <div className="absolute flex items-center justify-center" style={{ left: '134px', top: '27px', width: '175.249px', height: '266.955px' }} aria-hidden>
        <div style={{ transform: 'rotate(-98.5deg)' }}>
          <img src={BANNER.ellipse1} alt="" className="block max-w-none" style={{ width: '249.004px', height: '139.993px' }} />
        </div>
      </div>
      <div className="absolute flex items-center justify-center" style={{ left: '-95px', top: '-212px', width: '245.739px', height: '285.64px' }} aria-hidden>
        <div style={{ transform: 'rotate(60deg)' }}>
          <img src={BANNER.ellipse2} alt="" className="block max-w-none" style={{ width: '249.004px', height: '139.993px' }} />
        </div>
      </div>
      <div className="absolute flex items-center justify-center" style={{ left: '187.51px', top: '-66.24px', width: '87.472px', height: '161.364px' }} aria-hidden>
        <div style={{ transform: 'rotate(3.52deg)' }}>
          <img src={BANNER.vector1} alt="" className="block max-w-none" style={{ width: '78px', height: '156.877px' }} />
        </div>
      </div>
      <div className="absolute flex items-center justify-center" style={{ left: '-10.27px', bottom: '5.38px', width: '158.177px', height: '62.648px' }} aria-hidden>
        <div style={{ transform: 'rotate(-173deg)' }}>
          <img src={BANNER.vector2} alt="" className="block max-w-none" style={{ width: '153.935px', height: '44.209px' }} />
        </div>
      </div>
      <div className="absolute flex items-center justify-center" style={{ left: '200px', bottom: '-8.5px', width: '118px', height: '40.2px' }} aria-hidden>
        <div style={{ transform: 'rotate(180deg)' }}>
          <img src={BANNER.vector3} alt="" className="block max-w-none" style={{ width: '118px', height: '40.2px' }} />
        </div>
      </div>
      {/* 라이트 글로우 (mix-blend-lighten) */}
      <div className="absolute flex items-center justify-center" style={{ left: '246px', top: '30px', width: '161.678px', height: '70.299px', mixBlendMode: 'lighten' }} aria-hidden>
        <div style={{ transform: 'rotate(-11.93deg)' }}>
          <img src={BANNER.light} alt="" className="block max-w-none object-bottom" style={{ width: '157.079px', height: '38.658px', opacity: 0.54 }} />
        </div>
      </div>
      <div className="absolute" style={{ left: '104px', top: '-28px', width: '72px', height: '108px', mixBlendMode: 'lighten', opacity: 0.9 }} aria-hidden>
        <img src={BANNER.light1} alt="" className="block max-w-none w-full h-full object-cover" />
      </div>
      <div className="absolute flex items-center justify-center" style={{ left: '-14px', top: '24.03px', width: '117.966px', height: '61.567px', mixBlendMode: 'lighten' }} aria-hidden>
        <div style={{ transform: 'rotate(13.95deg)' }}>
          <img src={BANNER.light1} alt="" className="block max-w-none object-cover" style={{ width: '112.749px', height: '35.435px', opacity: 0.9 }} />
        </div>
      </div>
      {/* 상단 다크 그라데이션 */}
      <div
        className="absolute left-0 w-full"
        style={{ top: '-1px', height: '100px', background: 'linear-gradient(to bottom, rgba(24,24,24,0.72), rgba(24,24,24,0))' }}
        aria-hidden
      />
      {/* 카피 */}
      <div className="absolute left-1/2 -translate-x-1/2 flex flex-col items-center" style={{ top: '30px', gap: '6px' }}>
        <p
          className="font-semibold text-center whitespace-nowrap"
          style={{ fontSize: '15px', lineHeight: 'normal', color: 'var(--todaydeal-banner-subtitle)', textShadow: '1px 1px 8px rgba(0,0,0,0.5)' }}
        >
          매일 아침 9시마다
        </p>
        {/* "오늘만" — 마스크 + 화이트 그라데이션 */}
        <div
          aria-label="오늘만"
          style={{
            width: '148px',
            height: '62px',
            marginLeft: '-10px',
            marginTop: '1px',
            backgroundImage: 'linear-gradient(115.93deg, rgba(255,255,255,0.9) 11.5%, #ffffff 59.2%, rgba(255,255,255,0.5) 100%)',
            maskImage: `url(${BANNER.oneulman})`,
            maskSize: '132px 58px',
            maskPosition: '10px -1px',
            maskRepeat: 'no-repeat',
            WebkitMaskImage: `url(${BANNER.oneulman})`,
            WebkitMaskSize: '132px 58px',
            WebkitMaskPosition: '10px -1px',
            WebkitMaskRepeat: 'no-repeat',
          }}
        />
      </div>
    </div>
  )
}

// ── 타이머 바 ───────────────────────────────────────────────────
function TimerBar({ time = '12:23:12' }: { time?: string }) {
  return (
    <div
      className="flex items-center justify-center w-full shrink-0"
      style={{
        paddingBlock: 'var(--todaydeal-timer-py)',
        gap: 'var(--todaydeal-timer-gap)',
        backgroundImage: 'linear-gradient(-26deg, var(--todaydeal-timer-grad-from) 0%, var(--todaydeal-timer-grad-to) 100%)',
      }}
    >
      {/* 시계 아이콘 */}
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden style={{ flexShrink: 0 }}>
        <circle cx="10" cy="10" r="6.5" stroke="var(--todaydeal-timer-text)" strokeWidth="1.5" />
        <path d="M10 6.5V10L12.2 12.2" stroke="var(--todaydeal-timer-text)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      <span className="font-bold text-center whitespace-nowrap" style={{ fontSize: 'var(--typeset-md-size)', lineHeight: 'var(--typeset-md-lh)', color: 'var(--todaydeal-timer-text)' }}>
        {time}
      </span>
      <span className="font-bold text-center whitespace-nowrap" style={{ fontSize: 'var(--typeset-md-size)', lineHeight: 'var(--typeset-md-lh)', color: 'var(--todaydeal-timer-text)' }}>
        남음
      </span>
    </div>
  )
}

// ── 더보기 버튼 ─────────────────────────────────────────────────
function ViewMoreButton() {
  return (
    <div className="flex items-center justify-center w-full shrink-0" style={{ height: 'var(--todaydeal-viewmore-section-h)', paddingInline: 'var(--products-spacing-60)' }}>
      <button
        type="button"
        className="flex items-center justify-center gap-[4px] overflow-clip border border-solid"
        style={{
          height: 'var(--todaydeal-viewmore-h)',
          padding: 'var(--todaydeal-viewmore-p)',
          minWidth: 'var(--todaydeal-viewmore-min-w)',
          maxWidth: 'var(--todaydeal-viewmore-max-w)',
          borderRadius: 'var(--radius-max)',
          backgroundColor: 'var(--todaydeal-viewmore-surface)',
          borderColor: 'var(--todaydeal-viewmore-border)',
        }}
      >
        <span className="font-medium text-center whitespace-nowrap" style={{ fontSize: 'var(--typeset-md-compact-size)', lineHeight: 'var(--typeset-md-compact-lh)', color: 'var(--todaydeal-viewmore-text)' }}>
          더 많은 상품 보기
        </span>
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden>
          <path d="M4.5 2.5L8 6L4.5 9.5" stroke="var(--todaydeal-viewmore-text)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
    </div>
  )
}

// ── 상품 데이터 ─────────────────────────────────────────────────
const OUTBOUND: ProductCardProps = {
  type: 'Outbound',
  title: '완벽세척 통세척 살균 가습기 HUB300A',
  discount: '30%', price: '27,000원',
  showRating: true, rating: '4.7', reviewCount: '387',
}
const OUTBOUND_TAG: ProductCardProps = { ...OUTBOUND, showTag: true, pointLabel: '540P 적립' }
const OUTBOUND_NOTAG: ProductCardProps = { ...OUTBOUND, showTag: false }

const LEFT_COL: ProductCardProps[] = [OUTBOUND_TAG, OUTBOUND_NOTAG, OUTBOUND_NOTAG, OUTBOUND_TAG, OUTBOUND_NOTAG, OUTBOUND_NOTAG]
const RIGHT_COL: ProductCardProps[] = [
  OUTBOUND_NOTAG,
  { type: 'Banner', bannerSubtitle: '최대 30%', bannerTag: '바로가기' },
  { ...OUTBOUND, showTag: true, pointLabel: '540P 적립' },
  OUTBOUND_NOTAG,
  OUTBOUND_NOTAG,
  OUTBOUND_NOTAG,
]

function Footer() {
  return (
    <>
      {/* 안내 문구 */}
      <div className="flex items-center justify-center w-full shrink-0" style={{ paddingTop: 'var(--todaydeal-info-pt)', paddingInline: 'var(--products-spacing-60)' }}>
        <p className="flex-1 min-w-0 font-normal" style={{ fontSize: 'var(--typeset-sm-size)', lineHeight: 'var(--typeset-sm-lh)', color: 'var(--todaydeal-info-text)' }}>
          OK캐쉬백은 오늘만 초특가 쇼핑으로 연결하는 역할만 수행하며,<br />해당 쇼핑몰은 (주)레브잇의 책임하에 운영됩니다.
        </p>
      </div>
      {/* 회사/약관 */}
      <div className="flex flex-col items-start w-full overflow-clip shrink-0" style={{ paddingTop: 'var(--products-spacing-60)', paddingBottom: 'var(--gbuying-footer-py)', paddingInline: 'var(--products-spacing-60)' }}>
        <p className="font-normal whitespace-nowrap" style={{ fontSize: 'var(--typeset-md-size)', lineHeight: 'var(--typeset-md-lh)', color: 'var(--gbuying-footer-company)' }}>OK캐쉬백 쇼핑</p>
        <div className="flex flex-wrap items-center pt-[12px] gap-[4px_8px] w-full">
          <span className="font-normal whitespace-nowrap" style={{ fontSize: 'var(--typeset-sm-size)', lineHeight: 'var(--typeset-sm-lh)', color: 'var(--gbuying-footer-link)' }}>쇼핑 서비스 이용약관</span>
          <span className="w-px h-[12px]" style={{ backgroundColor: 'var(--gbuying-footer-divider)' }} />
          <span className="font-normal whitespace-nowrap" style={{ fontSize: 'var(--typeset-sm-size)', lineHeight: 'var(--typeset-sm-lh)', color: 'var(--gbuying-footer-company)' }}>통신판매중개자 안내</span>
        </div>
      </div>
    </>
  )
}

export default function TodayDealHome() {
  return (
    <div style={{ backgroundColor: 'var(--todaydeal-surface)' }}>
      {/* ① 히어로 배너 */}
      <HeroBanner />

      {/* ② 컨텐츠 (상단 라운드) */}
      <div className="relative flex flex-col items-start w-full" style={{ backgroundColor: 'var(--todaydeal-surface)', borderTopLeftRadius: 'var(--todaydeal-content-r)', borderTopRightRadius: 'var(--todaydeal-content-r)' }}>
        {/* 타이머 바 */}
        <TimerBar />

        {/* 2열 상품 리스트 */}
        <div
          className="flex w-full"
          style={{ paddingInline: 'var(--todaydeal-list-px)', paddingTop: 'var(--todaydeal-list-pt)', paddingBottom: 'var(--todaydeal-list-pb)', columnGap: 'var(--todaydeal-list-gutter)' }}
        >
          {[LEFT_COL, RIGHT_COL].map((col, ci) => (
            <div key={ci} className="flex-1 min-w-0 flex flex-col" style={{ rowGap: 'var(--todaydeal-list-gutter)' }}>
              {col.map((card, i) => (
                <ProductCard key={i} {...card} />
              ))}
            </div>
          ))}
        </div>

        {/* 더보기 버튼 */}
        <ViewMoreButton />

        {/* 안내 + 푸터 */}
        <Footer />
      </div>
    </div>
  )
}
