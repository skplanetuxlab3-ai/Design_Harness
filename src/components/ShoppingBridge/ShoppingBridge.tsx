import NoticeAccordion from '../NoticeAccordion'
import BridgeCta from '../BridgeCta'
import closeIcon from '../../assets/icon-close-24-white_19532-140205.svg'
import coinIcon from '../../assets/icon-point-coin_19532-140213.svg'
import bannerIcon from '../../assets/icon-contentarea-40_19532-140228.svg'
import checkIcon from '../../assets/icon-check-18_19532-140245.svg'

/**
 * OC19_쇼핑스탬프_쇼핑몰브릿지_full — Figma node 19532:140203
 *
 * 제휴처로 나가기 직전의 브릿지. 어두운 헤더 위에 흰 시트가 올라온다.
 *
 * ※ 이 화면은 지금까지의 color/shopping/* 가 아니라 Semantic/* + zuro_color/*
 *   토큰 계층을 쓴다. 2026-09-02 에 처음 들어왔다.
 */

const MISS_NOTE = '*일부 상품은 제휴사 운영사정에 따라 변경될 수 있습니다.'

const CHECKS = [
  '구매금액 1만원 당 1개의 쇼핑 스탬프가 적립되요.',
  '스탬프는 결제 완료 후 최대 7일 이내에 적립됩니다.',
  '취소·반품된 주문은 스탬프가 회수됩니다.',
  '일부 카테고리는 스탬프 적립에서 제외됩니다.',
]

const NOTICES = [
  'G마켓으로 이동 후 1시간 이내에 결제하면 쇼핑 스탬프를 받을 수 있습니다.',
  '장바구니에 담아둔 상품도 이동 후 결제해야 적립됩니다.',
  '광고 차단 앱이 켜져 있으면 적립이 되지 않을 수 있습니다.',
  '다른 적립 서비스를 거쳐 결제하면 중복 적립되지 않습니다.',
  '해외 배송 상품은 적립 대상에서 제외됩니다.',
  '주문 취소 시 지급된 스탬프는 자동 회수됩니다.',
  '적립 내역은 마이페이지에서 확인할 수 있습니다.',
]

function CheckRow({ text }: { text: string }) {
  return (
    <li className="flex w-full items-start gap-[var(--bridge-check-gap)] px-[var(--bridge-block-px)]">
      <img src={checkIcon} alt="" aria-hidden className="mt-px block shrink-0 size-[var(--bridge-check-icon)]" />
      <span className="min-w-0 flex-1 text-[length:var(--typeset-md-size)] leading-[var(--typeset-md-lh)] font-normal text-[var(--semantic-label-strong)] tracking-[0]">
        {text}
      </span>
    </li>
  )
}

export default function ShoppingBridge({
  brand = 'G마켓',
  earnLabel = '최대 5% 적립',
  logo,
  onClose,
  onGo,
  onFavorite,
}: {
  brand?: string
  earnLabel?: string
  logo?: string
  onClose?: () => void
  onGo?: () => void
  onFavorite?: () => void
}) {
  return (
    <div
      className="flex w-full flex-col items-start"
      style={{ backgroundColor: 'var(--semantic-label-strong)' }}
    >
      {/* top_appbar 19532:140205 */}
      <div className="flex w-full shrink-0 items-center justify-end overflow-clip pl-[var(--bridge-head-px)] pr-[var(--appbar-px)] h-[var(--appbar-h)] min-h-[var(--appbar-h)]">
        <button
          type="button"
          onClick={onClose}
          aria-label="닫기"
          className="flex shrink-0 items-center justify-center overflow-clip size-[var(--appbar-touch)]"
        >
          <img src={closeIcon} alt="" aria-hidden className="block size-[var(--appbar-icon)]" />
        </button>
      </div>

      {/* 제휴처 헤더 19532:140206 */}
      <div className="flex w-full shrink-0 items-start justify-center overflow-clip pt-[var(--bridge-head-pt)] pb-[var(--bridge-head-pb)] px-[var(--bridge-head-px)]">
        <div
          className="flex min-w-0 flex-1 items-center gap-[var(--bridge-head-gap)]"
          style={{ maxWidth: 'var(--bridge-max-w)' }}
        >
          <span
            className="relative block shrink-0 overflow-clip rounded-[var(--radius-max)] size-[var(--bridge-logo)]"
            style={{ background: 'var(--primitive-white-opacity-600)' }}
          >
            {logo && <img src={logo} alt="" aria-hidden className="absolute inset-0 block size-full object-cover" />}
          </span>
          <span className="flex shrink-0 flex-col items-start justify-center gap-[var(--products-spacing-02)]">
            <span className="whitespace-nowrap text-[length:var(--typeset-lg-size)] leading-[var(--typeset-lg-lh)] font-medium text-[var(--semantic-static-white)] tracking-[0]">
              {brand}
            </span>
            <span className="flex items-center gap-[var(--products-spacing-06)]">
              <span className="relative block shrink-0 size-[var(--bridge-coin)]">
                <img
                  src={coinIcon}
                  alt=""
                  aria-hidden
                  className="absolute left-1/2 top-1/2 block max-w-none -translate-x-1/2 -translate-y-1/2 size-[var(--bridge-coin-inner)]"
                />
              </span>
              <span className="whitespace-nowrap text-[length:var(--typeset-3xl-size)] leading-[var(--typeset-3xl-lh)] font-bold text-[var(--semantic-static-white)] tracking-[0]">
                {earnLabel}
              </span>
            </span>
          </span>
        </div>
      </div>

      {/* 흰 시트 19532:140215 */}
      <div className="flex w-full flex-col items-center rounded-[var(--bridge-sheet-r)] bg-[var(--semantic-background-normal)]">
        {/* 타이틀 */}
        <div
          className="flex w-full flex-col items-center pt-[var(--bridge-block-pt)] pb-[var(--bridge-block-pb)] px-[var(--bridge-block-px)]"
          style={{ maxWidth: 'var(--bridge-max-w)' }}
        >
          <div className="flex w-full flex-col items-start justify-center gap-[var(--products-spacing-02)] whitespace-nowrap text-[length:var(--typeset-xl-size)] leading-[var(--typeset-xl-lh)] font-bold tracking-[0]">
            <span className="text-[var(--semantic-label-strong)]">오늘 쇼핑하면</span>
            <span className="flex items-start gap-[var(--products-spacing-04)]">
              <span className="text-[var(--semantic-label-strong)]">스탬프와 포인트</span>
              <span style={{ color: 'var(--primitive-bridge-accent)' }}>바로</span>
              <span className="text-[var(--semantic-label-strong)]">적립</span>
            </span>
          </div>
        </div>

        {/* 배너 19532:140227 */}
        <div className="flex w-full items-center px-[var(--bridge-block-px)]" style={{ maxWidth: 'var(--bridge-max-w)' }}>
          <img src={bannerIcon} alt="" aria-hidden className="block shrink-0 size-[var(--bridge-banner-icon)]" />
        </div>

        {/* 꼭 알아두세요 */}
        <section className="flex w-full flex-col items-center" style={{ maxWidth: 'var(--bridge-max-w)' }} aria-label="꼭 알아두세요">
          <div className="flex w-full flex-col items-start pt-[var(--bridge-block-pt)] pb-[var(--bridge-block-pb)] px-[var(--bridge-block-px)]">
            <h2 className="text-[length:var(--typeset-xl-size)] leading-[var(--typeset-xl-lh)] font-bold text-[var(--semantic-label-strong)] tracking-[0]">
              꼭 알아두세요
            </h2>
          </div>
          <div className="flex w-full flex-col items-start gap-[var(--products-spacing-12)] pb-[var(--bridge-notice-pb)] px-[var(--bridge-block-px)]">
            <p className="text-[length:var(--typeset-md-size)] leading-[var(--typeset-md-lh)] font-bold text-[var(--semantic-label-strong)] tracking-[0]">
              스탬프 미적립 항목
            </p>
            <p className="text-[length:var(--typeset-xs-size)] leading-[var(--bridge-footnote-lh)] font-normal text-[var(--semantic-label-alternative)] tracking-[0]">
              {MISS_NOTE}
            </p>
            <div
              className="flex w-full flex-col items-start gap-[var(--bridge-card-gap)] rounded-[var(--bridge-card-r)] border border-solid border-[var(--semantic-line-component)] py-[var(--bridge-card-py)]"
            >
              <p className="px-[var(--bridge-block-px)] text-[length:var(--typeset-md-size)] leading-[var(--typeset-md-lh)] font-bold text-[var(--semantic-label-strong)] tracking-[0]">
                이용 안내
              </p>
              <ul className="flex w-full flex-col items-start gap-[var(--bridge-check-gap)]">
                {CHECKS.map((c) => <CheckRow key={c} text={c} />)}
              </ul>
            </div>
          </div>
        </section>

        {/* 유의사항 19532:140290 */}
        <section
          className="flex w-full flex-col items-center"
          style={{ backgroundColor: 'var(--semantic-background-elevated)' }}
          aria-label="유의사항"
        >
          <div className="flex w-full flex-col items-start pt-[var(--bridge-block-pt)] pb-[var(--bridge-block-pb)] px-[var(--bridge-block-px)]">
            <h2 className="text-[length:var(--typo-b6-700-size)] leading-[var(--typo-b6-700-lh)] font-bold text-[var(--semantic-label-strong)] tracking-[0]">
              유의사항
            </h2>
          </div>
          <div className="flex w-full flex-col items-start gap-[var(--bridge-notice-gap)] pb-[var(--bridge-block-pt)] px-[var(--bridge-block-px)]">
            <NoticeAccordion title="쇼핑 스탬프 발급 관련 유의사항" items={NOTICES} />
          </div>
        </section>
      </div>

      <BridgeCta
        label={`${brand} 인기상품 보러가기`}
        tooltip="즐겨찾기 등록할까요?"
        onFavorite={onFavorite}
        onClick={onGo}
      />
    </div>
  )
}
