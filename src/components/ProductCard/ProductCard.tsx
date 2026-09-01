import type { ProductCardProps, GifticonOfferingColor, RankingItem } from './ProductCard.types'
import Badge from '../Badge'
import dealTimerFlag from '../../assets/icon-deal-timer-flag_18562-125857.svg'

// ─── Figma CDN 에셋 (7일 만료 — TODO: src/assets/ 로컬 교체 필요) ───
const STAR_ICON               = 'https://www.figma.com/api/mcp/asset/4f3ee67a-ec95-4498-9f11-343a083122c5'
const EGG_ICON                = 'https://www.figma.com/api/mcp/asset/7882d746-19a7-4ecf-83c5-0872e2b4f6d9'

// ─── GifticonOffering 컬러 시스템 토큰 매핑 ──────────────────────
const OFFERING_COLORS: Record<GifticonOfferingColor, { bg: string; text: string }> = {
  Blue:      { bg: 'var(--primitive-system-bg-blue)',       text: 'var(--color-badge-blue-text)' },
  Pink:      { bg: 'var(--primitive-system-bg-pink)',       text: 'var(--color-badge-pink-text)' },
  Mint:      { bg: 'var(--primitive-system-bg-mint)',       text: 'var(--color-badge-mint-text)' },
  Purple:    { bg: 'var(--primitive-system-bg-purple)',     text: 'var(--color-badge-purple-text)' },
  Orange:    { bg: 'var(--primitive-system-bg-orange)',     text: 'var(--color-badge-orange-text)' },
  LightPink: { bg: 'var(--primitive-system-bg-light-pink)', text: 'var(--primitive-system-sub-light-pink)' },
  Green:     { bg: 'var(--primitive-system-bg-green)',      text: 'var(--color-badge-green-text)' },
  Grey:      { bg: 'var(--primitive-system-bg-grey)',       text: 'var(--color-badge-grey-text)' },
  Yellow:    { bg: 'var(--primitive-system-bg-yellow)',     text: 'var(--color-badge-yellow-text)' },
  SkyBlue:   { bg: 'var(--primitive-system-bg-sky-blue)',   text: 'var(--color-badge-sky-blue-text)' },
}

// ─── 공통 border 스타일 ───────────────────────────────────────────
const CARD_BORDER = 'border border-[var(--primitive-shopping-border)]'
const CARD_RADIUS = 'rounded-[var(--products-radius-8)]'

// ────────────────────────────────────────────────────────────────
// Internal sub-components
// ────────────────────────────────────────────────────────────────

function JoiningPill() {
  return (
    <div
      className="absolute right-[7px] top-[7px] flex items-center justify-center px-[var(--product-deal-join-px)] py-[var(--product-deal-join-py)] rounded-[var(--radius-max)]"
      style={{ backgroundColor: 'var(--primitive-black-opacity-200)' }}
    >
      <span className="text-[length:var(--typeset-3xs-size)] leading-[var(--typeset-3xs-lh)] font-bold text-[var(--primitive-white)] whitespace-nowrap">
        참여중
      </span>
    </div>
  )
}

function GifticonSoldoutOverlay() {
  return (
    <div
      className={`absolute inset-0 flex items-center justify-center ${CARD_RADIUS}`}
      style={{ backgroundColor: 'var(--primitive-black-opacity-400)' }}
    >
      <span className="text-[length:var(--typeset-xl-size)] leading-[var(--typeset-xl-lh)] font-bold text-[var(--primitive-white)] tracking-[0] overflow-hidden text-ellipsis whitespace-nowrap">
        Sold out
      </span>
    </div>
  )
}

// ────────────────────────────────────────────────────────────────
// Variant card implementations
// ────────────────────────────────────────────────────────────────

function GifticonCard({
  imageUrl,
  brand = '브랜드명',
  title = '상품명을 입력합니다',
  showDiscount = true,
  discount = '30%',
  price = '27,000원',
  showBadge = false,
  badgeLabel = 'New',
  soldout = false,
  className,
}: ProductCardProps) {
  return (
    <div className={className ?? `flex flex-col gap-[var(--product-card-gap)] items-center overflow-clip pb-[var(--plist-item-pb)] w-full`}>
      {/* 이미지 영역 */}
      <div className={`aspect-square bg-[var(--primitive-black-800)] ${CARD_BORDER} ${CARD_RADIUS} flex items-center justify-center overflow-clip relative w-full shrink-0`}>
        {imageUrl && (
          <div className="relative w-full h-full">
            <img
              src={imageUrl}
              alt={title}
              className="absolute left-[5%] top-[5%] w-[90%] h-[90%] object-contain pointer-events-none"
            />
          </div>
        )}
        {/* 이미지 오버레이 */}
        <div
          className="absolute inset-0"
          style={{ backgroundColor: 'var(--primitive-black-opacity-50)' }}
        />
        {/* 뱃지 */}
        {showBadge && (
          <div
            className={`absolute left-0 top-0 flex items-center h-[var(--product-deal-join-h)] px-[var(--product-deal-join-px)] py-[4px] rounded-tl-[var(--products-radius-8)] rounded-br-[var(--products-radius-8)]`}
            style={{ backgroundImage: 'linear-gradient(100.08deg, #fe0955 17.78%, #fa467e 100%)' }}
          >
            <span className="text-[length:var(--typeset-2xs-size)] leading-[var(--typeset-2xs-lh)] font-bold text-[var(--primitive-white)] whitespace-nowrap tracking-[0]">
              {badgeLabel}
            </span>
          </div>
        )}
        {/* 매진 오버레이 */}
        {soldout && <GifticonSoldoutOverlay />}
      </div>

      {/* 텍스트 콘텐츠 */}
      <div className="flex flex-col items-start px-[var(--plist-tag-px)] w-full shrink-0">
        <div className="flex flex-col gap-[2px] items-start w-full">
          <div className="flex flex-col gap-[2px] items-start w-full">
            <p className="text-[length:var(--typeset-xs-size)] leading-[var(--typeset-xs-lh)] font-normal text-[var(--primitive-blueblack-300)] overflow-hidden text-ellipsis whitespace-nowrap w-full tracking-[0]">
              {brand}
            </p>
            <p className="text-[length:var(--typeset-sm-size)] leading-[var(--typeset-sm-lh)] font-normal text-[var(--primitive-black)] max-h-[32px] overflow-hidden text-ellipsis w-full tracking-[0]">
              {title}
            </p>
          </div>
          <div className="flex gap-[var(--plist-tag-gap)] items-center whitespace-nowrap">
            {showDiscount && (
              <span className="text-[length:var(--typeset-lg-compact-size)] leading-[var(--typeset-lg-compact-lh)] font-bold text-[var(--color-brand-ocb-pink)] shrink-0 tracking-[0]">
                {discount}
              </span>
            )}
            <span className="text-[length:var(--typeset-lg-compact-size)] leading-[var(--typeset-lg-compact-lh)] font-bold text-[var(--primitive-black)] overflow-hidden text-ellipsis tracking-[0]">
              {price}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

function OutboundCard({
  imageUrl,
  title = '상품명을 입력합니다',
  showDiscount = true,
  discount = '30%',
  price = '27,000원',
  showRating = true,
  rating = '4.7',
  reviewCount = '387',
  showTag = true,
  pointLabel = '540P 적립',
  className,
}: ProductCardProps) {
  return (
    <div className={className ?? `flex flex-col gap-[var(--product-card-gap)] items-start overflow-clip pb-[var(--plist-item-pb)] w-full`}>
      {/* 이미지 */}
      <div className={`aspect-square bg-[var(--primitive-black-800)] ${CARD_BORDER} ${CARD_RADIUS} overflow-clip relative w-full shrink-0`}>
        {imageUrl && (
          <img
            src={imageUrl}
            alt={title}
            className="absolute inset-0 w-full h-full object-cover pointer-events-none"
          />
        )}
      </div>

      {/* 콘텐츠 */}
      <div className="flex flex-col gap-[var(--product-deal-info-gap)] items-start w-full">
        <div className="flex flex-col gap-[2px] items-start px-[var(--plist-tag-px)] w-full">
          <p className="text-[length:var(--typeset-sm-size)] leading-[var(--typeset-sm-lh)] font-normal text-[var(--primitive-black)] max-h-[32px] overflow-hidden text-ellipsis w-full tracking-[0]">
            {title}
          </p>
          <div className="flex gap-[var(--plist-tag-gap)] items-center whitespace-nowrap">
            {showDiscount && (
              <span className="text-[length:var(--typeset-lg-compact-size)] leading-[var(--typeset-lg-compact-lh)] font-bold text-[var(--color-brand-ocb-pink)] shrink-0 tracking-[0]">
                {discount}
              </span>
            )}
            <span className="text-[length:var(--typeset-lg-compact-size)] leading-[var(--typeset-lg-compact-lh)] font-bold text-[var(--primitive-black)] overflow-hidden text-ellipsis tracking-[0]">
              {price}
            </span>
          </div>
          {/* 별점 */}
          {showRating && (
            <div className="flex gap-px items-center">
              <img src={STAR_ICON} alt="" aria-hidden className="size-[var(--typeset-2xs-size)] shrink-0 object-contain" />
              <span className="text-[length:var(--typeset-2xs-size)] leading-[var(--typeset-2xs-lh)] font-medium text-[var(--primitive-black)] tracking-[0]">
                {rating}
              </span>
              <span className="text-[length:var(--typeset-2xs-size)] leading-[var(--typeset-2xs-lh)] font-normal text-[var(--primitive-blueblack-300)] tracking-[0]">
                ({reviewCount})
              </span>
            </div>
          )}
        </div>

        {/* 태그 */}
        {showTag && (
          <div className="flex flex-wrap gap-[var(--plist-tag-gap)] items-start w-full">
            {/* Point 태그 */}
            <span className="inline-flex h-[var(--plist-tag-h)] items-center px-[var(--plist-tag-px)] py-[var(--plist-tag-py)] gap-[2px] rounded-[var(--radius-050)] bg-[var(--primitive-shopping-purple-900)]">
              <span className="text-[length:var(--typeset-2xs-size)] leading-[var(--typeset-2xs-lh)] font-semibold text-[var(--primitive-shopping-purple-600)] whitespace-nowrap tracking-[0]">
                {pointLabel}
              </span>
            </span>
            {/* Basic 태그 */}
            <span className="inline-flex h-[var(--plist-tag-h)] items-center px-[var(--plist-tag-px)] py-[var(--plist-tag-py)] rounded-[var(--radius-050)] bg-[var(--primitive-black-800)]">
              <span className="text-[length:var(--typeset-2xs-size)] leading-[var(--typeset-2xs-lh)] font-semibold text-[var(--primitive-black-300)] whitespace-nowrap tracking-[0]">
                쇼핑 적립
              </span>
            </span>
          </div>
        )}
      </div>
    </div>
  )
}

/**
 * DealCard — 공동구매 딜 카드 (ver=02)
 *
 * Figma: DiscountDeal ver=02 (18462:124398) · HotDeal ver=02 (18476:127323)
 *        Soldout (19665:336915) · Timer flag (18562:125857)
 *
 * ver=01 대비 바뀐 것:
 *   · 하단 "공구 참여" 버튼 제거 → backdrop-blur 타이머 바
 *   · 좌상단 로고 마스크 뱃지 제거 → 선택적 "내가 본" 뱃지
 *   · 가격 15px → 14px, 가격 gap 4px → 2px
 *   · 이미지 위 하단 그라디언트(140px)를 명시적 레이어로 분리
 *
 * 토큰은 ver=02 기준으로 갱신돼 있다 (--product-deal-items-*, --product-deal-timer-*).
 */
function DealCard({
  imageUrl,
  title = '뜨거운 여름 필수템\nAHC 선블록 SPF50+',
  discount = '20%',
  price = '17,800원',
  timer = '12:23:22',
  accent,
  showJoining = false,
  showSeenBadge = false,
  soldout = false,
  className,
}: ProductCardProps & { accent: string; showSeenBadge?: boolean; soldout?: boolean }) {
  const lines = title?.split('\n') ?? []

  return (
    <div
      className={className ?? `bg-[var(--primitive-black-800)] ${CARD_BORDER} ${CARD_RADIUS} flex flex-col h-[var(--product-deal-h)] items-center justify-end overflow-clip relative w-full`}
    >
      {/* 이미지 + 하단 그라디언트 (+ 매진 딤) — 카드 전체를 채운다 */}
      {imageUrl && (
        <img
          src={imageUrl}
          alt=""
          aria-hidden
          className="absolute inset-0 max-w-none object-cover pointer-events-none size-full"
        />
      )}
      {/* Figma: 하단 그라디언트 (140px) */}
      <div
        className="absolute bottom-0 left-0 right-0 h-[var(--product-deal-overlay-h)] bg-gradient-to-b from-transparent"
        style={{ ['--tw-gradient-to' as string]: 'var(--primitive-black-opacity-500)' }}
      />
      {soldout && (
        <div
          className="absolute inset-0 flex items-center justify-center"
          style={{ backgroundColor: 'var(--product-card-overlay)' }}
        >
          <span className="text-[length:var(--typeset-xl-size)] leading-[var(--typeset-xl-lh)] font-bold text-[var(--primitive-white)] text-center whitespace-nowrap">
            SOLD OUT
          </span>
        </div>
      )}

      {/* 텍스트 + 타이머 바 */}
      <div className="flex flex-col items-start relative w-full shrink-0">
        <div className="flex flex-col gap-[var(--product-deal-items-gap)] items-start justify-center pt-[var(--product-deal-items-pt)] pb-[var(--product-deal-items-pb)] px-[var(--product-deal-items-px)] relative w-full">
          <p className="text-[length:var(--typeset-sm-size)] leading-[var(--typeset-sm-lh)] font-normal text-[var(--primitive-white)] max-h-[calc(var(--typeset-sm-lh)*2)] overflow-hidden text-ellipsis w-full tracking-[var(--typeset-sm-tracking)]">
            {lines.map((l, i) => (
              <span key={i}>
                {l}
                {i < lines.length - 1 && <br />}
              </span>
            ))}
          </p>
          <div className="flex gap-[var(--products-spacing-02)] items-center w-full whitespace-nowrap">
            <span
              className="text-[length:var(--typeset-md-size)] leading-[var(--typeset-md-lh)] font-bold overflow-hidden text-ellipsis tracking-[var(--typeset-md-tracking)]"
              style={{ color: accent }}
            >
              {discount}
            </span>
            <span className="text-[length:var(--typeset-md-size)] leading-[var(--typeset-md-lh)] font-bold text-[var(--primitive-white)] overflow-hidden text-ellipsis tracking-[var(--typeset-md-tracking)]">
              {price}
            </span>
          </div>
        </div>

        <div
          className="backdrop-blur-[12px] flex gap-[var(--product-deal-timer-gap)] h-[var(--product-deal-timer-h)] items-center justify-center py-[var(--product-deal-timer-py)] rounded-bl-[var(--products-radius-8)] rounded-br-[var(--products-radius-8)] w-full shrink-0"
          style={{ backgroundColor: 'color-mix(in srgb, var(--primitive-blueblack) 38%, transparent)' }}
        >
          <img
            src={dealTimerFlag}
            alt=""
            aria-hidden
            className="h-[var(--product-deal-timer-flag-h)] aspect-[22.588/14] shrink-0"
          />
          <span className="text-[length:var(--typeset-xs-size)] leading-[var(--typeset-xs-lh)] font-bold text-[var(--primitive-white)] text-center whitespace-nowrap tracking-[var(--typeset-xs-tracking)]">
            {timer}
          </span>
        </div>
      </div>

      {showJoining && !soldout && <JoiningPill />}

      {/* "내가 본" 뱃지 (Badge type="Primary") — 좌상단, 1px 보더 위로 겹친다 */}
      {showSeenBadge && (
        <div className="absolute -left-px -top-px">
          <Badge type="Primary" size="feed" />
        </div>
      )}
    </div>
  )
}

function DiscountDealCard(props: ProductCardProps & { soldout?: boolean }) {
  return <DealCard {...props} accent="var(--primitive-sp-yellow)" />
}

function HotDealCard(props: ProductCardProps & { soldout?: boolean }) {
  return <DealCard {...props} accent="var(--primitive-sp-pink)" />
}

function MovieCard({
  imageUrl,
  brand = '영화 제목',
  filmRating = '15',
  eggRating = '97%',
  bookingRate = '예매율 53.95%',
  rank = '1',
  className,
}: ProductCardProps) {
  return (
    <div className={className ?? `flex flex-col gap-[var(--product-card-gap)] items-center justify-end overflow-clip pb-[var(--plist-item-pb)] w-full`}>
      {/* 세로 이미지 영역 (162:230 비율) */}
      <div
        className={`${CARD_BORDER} ${CARD_RADIUS} flex flex-col items-center justify-end overflow-clip relative w-full shrink-0`}
        style={{ aspectRatio: '162 / 230' }}
      >
        {imageUrl && (
          <img
            src={imageUrl}
            alt={brand}
            className={`absolute inset-0 max-w-none object-cover pointer-events-none ${CARD_RADIUS} size-full`}
          />
        )}
        {/* 하단 그라디언트 */}
        <div className="relative w-full h-[80px] shrink-0 bg-gradient-to-b from-transparent to-[rgba(0,0,0,0.2)]" />
        {/* 순위 숫자 */}
        {rank && (
          <p
            className="absolute bottom-[102px] left-[10px] text-[40px] font-black italic text-[var(--primitive-white)] tracking-[0] whitespace-nowrap leading-none"
            style={{
              fontFamily: "'Roboto', 'Pretendard Variable', sans-serif",
              textShadow: '0px 3px 10px rgba(0,0,0,0.2)',
              transform: 'translateY(100%)',
            }}
          >
            {rank}
          </p>
        )}
      </div>

      {/* 하단 콘텐츠 */}
      <div className="flex flex-col gap-[2px] items-start px-[var(--plist-tag-px)] w-full shrink-0">
        {/* 영화명 + 관람등급 */}
        <div className="flex gap-[2px] items-center w-full">
          <span className="text-[length:var(--typeset-sm-size)] leading-[var(--typeset-sm-lh)] font-normal text-[var(--primitive-black)] shrink-0 whitespace-nowrap tracking-[0]">
            {brand}
          </span>
          {filmRating && (
            <span
              className="inline-flex items-center justify-center shrink-0 size-[var(--typeset-md-size)] text-[8px] font-bold text-[var(--primitive-white)] rounded-[2px]"
              style={{ backgroundColor: FILM_RATING_COLORS[filmRating] ?? FILM_RATING_COLORS['15'] }}
              aria-label={`${filmRating}세 이상 관람가`}
            >
              {filmRating}
            </span>
          )}
        </div>
        {/* 통계 */}
        <div className="flex gap-[4px] items-center">
          {/* 황금달걀 */}
          <div className="flex gap-px items-center w-[37px]">
            <div className="flex gap-px items-center shrink-0">
              <img src={EGG_ICON} alt="" aria-hidden className="size-[var(--typeset-2xs-size)] shrink-0 object-contain" />
              <span className="text-[length:var(--typeset-2xs-size)] leading-[var(--typeset-2xs-lh)] font-medium text-[var(--primitive-black)] overflow-hidden text-ellipsis whitespace-nowrap tracking-[0]">
                {eggRating}
              </span>
            </div>
            <div className="w-px h-[12px] bg-[var(--primitive-blueblack-700)] shrink-0" />
          </div>
          <span className="text-[length:var(--typeset-2xs-size)] leading-[var(--typeset-2xs-lh)] font-normal text-[var(--primitive-blueblack-300)] overflow-hidden text-ellipsis whitespace-nowrap tracking-[0]">
            {bookingRate}
          </span>
        </div>
      </div>
    </div>
  )
}

/** 영화 관람등급 색상 — 한국 영화진흥위원회 표준 색상 (시스템 색, 토큰 외) */
const FILM_RATING_COLORS: Record<string, string> = {
  All: '#4caf50',
  '12': '#2196f3',
  '15': '#ffc107',
  '19': '#f44336',
}

function ListRankingCard({
  listTitle = 'Title',
  items = DUMMY_RANKING_ITEMS,
  className,
}: ProductCardProps) {
  const displayItems = items.slice(0, 4)

  return (
    <div className={className ?? `flex flex-col gap-[var(--products-spacing-10)] items-start py-[var(--product-ranking-py)] ${CARD_RADIUS} w-full`}>
      <p className="text-[length:var(--typeset-md-compact-size)] leading-[var(--typeset-md-compact-lh)] font-bold text-[var(--primitive-black)] overflow-hidden text-ellipsis whitespace-nowrap w-full tracking-[0]">
        {listTitle}
      </p>
      <div className="flex flex-col gap-[var(--product-ranking-item-gap)] items-start w-full">
        {displayItems.map((item, idx) => (
          <div
            key={idx}
            className={`bg-[var(--primitive-white)] ${CARD_BORDER} flex gap-[var(--product-card-gap)] items-center overflow-clip pr-[var(--product-ranking-item-pr)] ${CARD_RADIUS} w-full shrink-0`}
          >
            {/* 썸네일 + 순위 뱃지 */}
            <div className="relative size-[var(--product-ranking-item-size)] shrink-0">
              {item.imageUrl ? (
                <img
                  src={item.imageUrl}
                  alt={item.name}
                  className="absolute inset-0 w-full h-full object-cover pointer-events-none"
                />
              ) : (
                <div className="absolute inset-0 bg-[var(--primitive-black-800)]" />
              )}
              {/* 순위 뱃지 */}
              <div className="absolute left-0 top-0 bg-[var(--primitive-blueblack)] flex items-center justify-center py-[var(--plist-tag-py)] rounded-tl-[var(--products-radius-8)] rounded-br-[var(--products-radius-8)] w-[18px]">
                <span className="text-[length:var(--typeset-xs-size)] leading-[var(--typeset-xs-lh)] font-bold text-[var(--primitive-white)] tracking-[0] whitespace-nowrap">
                  {idx + 1}
                </span>
              </div>
            </div>
            {/* 브랜드명 */}
            <p className="text-[length:var(--typeset-sm-size)] leading-[var(--typeset-sm-lh)] font-normal text-[var(--primitive-black)] max-h-[16px] overflow-hidden text-ellipsis whitespace-nowrap flex-1 min-w-0 tracking-[0]">
              {item.name}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}

const DUMMY_RANKING_ITEMS: RankingItem[] = [
  { imageUrl: '', name: '베스킨라빈스' },
  { imageUrl: '', name: '동원참치' },
  { imageUrl: '', name: '아기 빨래 세제' },
  { imageUrl: '', name: '여성용 홈웨어' },
]

function GifticonOfferingCard({
  imageUrl,
  brand = '브랜드명',
  title = '상품명을 입력합니다',
  mdTag = 'MD 추천',
  color = 'Blue',
  className,
}: ProductCardProps) {
  const { bg, text } = OFFERING_COLORS[color] ?? OFFERING_COLORS.Blue

  return (
    <div
      className={className ?? `${CARD_BORDER} flex flex-col h-[var(--product-deal-h)] items-center justify-center overflow-clip ${CARD_RADIUS} w-full`}
      style={{ backgroundColor: bg }}
    >
      <div className="flex flex-1 flex-col items-center justify-between min-h-0 pb-[var(--products-spacing-10)] pt-[24px] px-[var(--product-deal-btn-px)] w-full">
        {/* 텍스트 + 태그 */}
        <div className="flex flex-col gap-[var(--product-card-gap)] items-center w-full shrink-0">
          <div className="flex flex-col gap-[2px] items-start text-center w-full">
            <p className="text-[length:var(--typeset-xs-size)] leading-[var(--typeset-xs-lh)] font-normal text-[var(--primitive-black)] overflow-hidden text-ellipsis w-full tracking-[0]">
              {brand}
            </p>
            <p className="text-[length:var(--typeset-lg-compact-size)] leading-[var(--typeset-lg-compact-lh)] font-bold text-[var(--primitive-black)] overflow-hidden text-ellipsis w-full tracking-[0]">
              {title}
            </p>
          </div>
          {/* MD 태그 (color-burn 오버레이) */}
          <div className="relative flex h-[22px] items-center px-[7px] py-[4px] rounded-[var(--radius-max)]">
            <div
              aria-hidden
              className="absolute inset-0 rounded-[var(--radius-max)] mix-blend-color-burn pointer-events-none"
              style={{ backgroundColor: 'rgba(0,0,0,0.08)' }}
            />
            <span
              className="text-[length:var(--typeset-xs-size)] leading-[var(--typeset-xs-lh)] font-semibold whitespace-nowrap tracking-[0] relative"
              style={{ color: text }}
            >
              {mdTag}
            </span>
          </div>
        </div>

        {/* 상품 이미지 */}
        <div className="flex-1 min-h-0 w-full relative mt-[var(--spacing-2)]" style={{ aspectRatio: '1/1', maxHeight: 'var(--product-deal-img-max-h)' }}>
          {imageUrl ? (
            <img
              src={imageUrl}
              alt={title}
              className="absolute inset-0 w-full h-full object-cover pointer-events-none"
            />
          ) : (
            <div className="absolute inset-0 bg-[var(--primitive-black-800)] opacity-20 rounded-[var(--products-radius-8)]" />
          )}
        </div>
      </div>
    </div>
  )
}

function BannerCard({
  imageUrl,
  bannerSubtitle = '최대 30%',
  bannerTitleImage,
  bannerTag = '바로가기',
  className,
}: ProductCardProps) {
  return (
    <div
      className={className ?? `${CARD_BORDER} flex flex-col h-[var(--product-deal-h)] items-center justify-between pb-[var(--product-deal-btn-pb)] pt-[var(--product-deal-pt)] overflow-clip ${CARD_RADIUS} w-full`}
      style={{ backgroundColor: 'var(--color-theme-bg-light)' }}
    >
      {/* 상단 콘텐츠 */}
      <div className="flex flex-col gap-[var(--products-spacing-10)] items-center shrink-0">
        <div className="flex flex-col gap-[4px] items-center">
          <span className="text-[length:var(--typeset-xs-size)] leading-[var(--typeset-xs-lh)] font-normal text-[var(--primitive-black)] text-center tracking-[-0.3px]">
            {bannerSubtitle}
          </span>
          {/* 타이틀 이미지 or 플레이스홀더 */}
          {bannerTitleImage ? (
            <img src={bannerTitleImage} alt="배너 제목" className="h-[30px] w-[100px] object-contain" />
          ) : (
            <div className="h-[30px] w-[100px] flex items-center justify-center">
              <span className="text-[length:var(--typeset-xl-size)] font-bold text-[var(--primitive-blueblack)] tracking-[var(--typeset-xl-tracking)]">
                쇼핑적립
              </span>
            </div>
          )}
        </div>
        {/* CTA 태그 */}
        <div className="flex h-[22px] items-center justify-center px-[var(--product-deal-join-px)] py-[4px] rounded-[var(--radius-max)] bg-[var(--primitive-purple)]">
          <span className="text-[length:var(--typeset-xs-size)] leading-[var(--typeset-xs-lh)] font-semibold text-[var(--primitive-white)] whitespace-nowrap tracking-[0]">
            {bannerTag}
          </span>
        </div>
      </div>

      {/* 하단 이미지 */}
      <div className="overflow-clip relative size-[120px] shrink-0">
        {imageUrl ? (
          <img src={imageUrl} alt="" aria-hidden className="absolute inset-0 w-full h-full object-contain pointer-events-none" />
        ) : (
          <div className="absolute inset-0 bg-[var(--primitive-black-800)] rounded-[var(--products-radius-8)] opacity-20" />
        )}
      </div>
    </div>
  )
}

function UpcomingCard({
  imageUrl,
  countdown = 'D-3',
  openDate = '2월 13일',
  openTime = '12:00',
  title = '상품명을 입력합니다',
  className,
}: ProductCardProps) {
  return (
    <div
      className={className ?? `${CARD_BORDER} flex flex-col h-[var(--product-deal-h)] items-center justify-center overflow-clip relative w-full`}
      style={{ borderRadius: 'var(--products-spacing-16)' }}
    >
      {/* 배경 이미지 + 다크 오버레이 */}
      {imageUrl && (
        <img
          src={imageUrl}
          alt=""
          aria-hidden
          className="absolute inset-0 max-w-none object-cover pointer-events-none size-full"
          style={{ borderRadius: 'var(--products-spacing-16)' }}
        />
      )}
      <div
        className="absolute inset-0"
        style={{
          backgroundColor: 'var(--primitive-black-opacity-400)',
          borderRadius: 'var(--products-spacing-16)',
        }}
      />

      {/* 중앙 콘텐츠 */}
      <div className="relative flex flex-col gap-[var(--products-spacing-14)] items-center justify-center whitespace-nowrap">
        <div className="flex flex-col gap-[2px] items-center text-center">
          <span className="text-[length:var(--typeset-lg-size)] leading-[var(--typeset-lg-lh)] font-bold text-[var(--primitive-sp-yellow)] tracking-[0]">
            {countdown}
          </span>
          <div className="text-[length:var(--typeset-4xl-size)] leading-[var(--typeset-4xl-lh)] font-bold text-[var(--primitive-white)] tracking-[0] text-center">
            <p>{openDate}</p>
            <p>{openTime}</p>
          </div>
        </div>
        <span className="text-[length:var(--typeset-sm-size)] leading-[var(--typeset-sm-lh)] font-normal text-[var(--primitive-white)] overflow-hidden text-ellipsis tracking-[0]">
          {title}
        </span>
      </div>
    </div>
  )
}

// ────────────────────────────────────────────────────────────────
// Main export
// ────────────────────────────────────────────────────────────────

/**
 * Feed — 피드용 상품 카드 (Figma node 17717:210498 "피드_최종(Full)")
 *
 * Gifticon 카드와의 차이:
 *   · 배지가 텍스트가 아니라 Badge 컴포넌트(기본 OkiClub)
 *   · 이미지가 object-cover 로 프레임을 꽉 채운다 (Gifticon은 contain + 여백)
 *   · 이미지 위 딤 오버레이 없음
 */
function FeedCard({
  imageUrl,
  brand = '브랜드명',
  title = '상품명 최대 2줄까지 초과시에는 말줄임 처리',
  showDiscount = true,
  discount = '15%',
  price = '37,500원',
  showBadge = true,
  feedBadgeType = 'OkiClub',
  className,
}: ProductCardProps) {
  return (
    <div className={className ?? `flex flex-col gap-[var(--product-card-gap)] items-start pb-[var(--plist-item-pb)] w-full`}>
      {/* 이미지 영역 */}
      <div className={`aspect-square bg-[var(--primitive-black-800)] ${CARD_BORDER} ${CARD_RADIUS} flex items-center justify-center overflow-clip relative w-full shrink-0`}>
        {imageUrl && (
          <img
            src={imageUrl}
            alt={title}
            className="absolute inset-0 size-full max-w-none object-cover pointer-events-none"
          />
        )}
        {/* 배지 — 1px 보더 위로 겹쳐 모서리에 붙인다 (Figma: left/top -1px) */}
        {showBadge && (
          <div className="absolute -left-px -top-px">
            <Badge type={feedBadgeType} size="feed" />
          </div>
        )}
      </div>

      {/* 텍스트 콘텐츠 */}
      <div className="flex flex-col gap-[2px] items-start px-[var(--plist-contents-px)] w-full">
        <p className="text-[length:var(--typeset-xs-size)] leading-[var(--typeset-xs-lh)] tracking-[var(--typeset-xs-tracking)] font-normal text-[var(--primitive-blueblack-300)] overflow-hidden text-ellipsis whitespace-nowrap w-full">
          {brand}
        </p>
        <p className="text-[length:var(--typeset-sm-size)] leading-[var(--typeset-sm-lh)] tracking-[var(--typeset-sm-tracking)] font-normal text-[var(--primitive-black)] max-h-[calc(var(--typeset-sm-lh)*2)] overflow-hidden text-ellipsis w-full">
          {title}
        </p>
        <div className="flex gap-[var(--product-price-gap)] items-center whitespace-nowrap">
          {showDiscount && (
            <span className="text-[length:var(--typeset-lg-compact-size)] leading-[var(--typeset-lg-compact-lh)] tracking-[var(--typeset-lg-compact-tracking)] font-bold text-[var(--color-brand-ocb-pink)] shrink-0">
              {discount}
            </span>
          )}
          <span className="text-[length:var(--typeset-lg-compact-size)] leading-[var(--typeset-lg-compact-lh)] tracking-[var(--typeset-lg-compact-tracking)] font-bold text-[var(--primitive-black)] overflow-hidden text-ellipsis">
            {price}
          </span>
        </div>
      </div>
    </div>
  )
}

export default function ProductCard({ type = 'Gifticon', ...props }: ProductCardProps) {
  switch (type) {
    case 'Gifticon':            return <GifticonCard {...props} />
    case 'Outbound':            return <OutboundCard {...props} />
    case 'DiscountDeal':        return <DiscountDealCard {...props} />
    case 'DiscountDeal_Soldout':return <DiscountDealCard {...props} soldout />
    case 'HotDeal':             return <HotDealCard {...props} />
    case 'HotDeal_Soldout':     return <HotDealCard {...props} soldout />
    case 'Movie':               return <MovieCard {...props} />
    case 'ListRanking':         return <ListRankingCard {...props} />
    case 'GifticonOffering':    return <GifticonOfferingCard {...props} />
    case 'Banner':              return <BannerCard {...props} />
    case 'Upcoming':            return <UpcomingCard {...props} />
    case 'Feed':                return <FeedCard {...props} />
    default:                    return null
  }
}
