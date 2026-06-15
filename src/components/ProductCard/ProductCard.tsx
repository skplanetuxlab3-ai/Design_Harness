import type { ProductCardProps, GifticonOfferingColor, RankingItem } from './ProductCard.types'

// ─── Figma CDN 에셋 (7일 만료 — TODO: src/assets/ 로컬 교체 필요) ───
const DEAL_DISCOUNT_LOGO_MASK = 'https://www.figma.com/api/mcp/asset/1076eb9d-c24e-4a6b-9dd5-cdfd5d9c109d'
const DEAL_HOTDEAL_LOGO_MASK  = 'https://www.figma.com/api/mcp/asset/26926af4-9362-4ba0-986c-d2ec2385218a'
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
      className="absolute right-[7px] top-[7px] flex items-center justify-center px-[8px] py-[3px] rounded-[var(--radius-max)]"
      style={{ backgroundColor: 'var(--primitive-black-opacity-200)' }}
    >
      <span className="text-[10px] leading-[14px] font-bold text-[var(--primitive-white)] whitespace-nowrap">
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
      <span className="text-[18px] leading-[24px] font-bold text-[var(--primitive-white)] tracking-[0] overflow-hidden text-ellipsis whitespace-nowrap">
        Sold out
      </span>
    </div>
  )
}

/** DiscountDeal / HotDeal 상단 뱃지 (로고 마스크 + 라벨) */
function DealBadge({
  logoMaskUrl,
  logoColor,
  label,
}: {
  logoMaskUrl: string
  logoColor: string
  label: string
}) {
  return (
    <div
      className={`absolute left-0 top-0 flex flex-col items-center gap-[2px] pb-[6px] pt-[9px] px-[10px] bg-[var(--filled-primary-surface)] rounded-tl-[var(--products-radius-8)] rounded-br-[var(--products-radius-8)]`}
    >
      <div className="relative h-[12px] w-[46px] shrink-0">
        <div
          className="absolute inset-0"
          style={{
            backgroundColor: logoColor,
            maskImage: `url(${logoMaskUrl})`,
            maskSize: '46px 12px',
            maskRepeat: 'no-repeat',
            WebkitMaskImage: `url(${logoMaskUrl})`,
            WebkitMaskSize: '46px 12px',
            WebkitMaskRepeat: 'no-repeat',
          }}
        />
      </div>
      <span className="text-[10px] leading-[15px] font-bold text-[var(--primitive-white)] whitespace-nowrap tracking-[0]">
        {label}
      </span>
    </div>
  )
}

/** DiscountDeal / HotDeal 완판 오버레이 */
function DealSoldoutOverlay({ logoMaskUrl, logoColor, label }: {
  logoMaskUrl: string
  logoColor: string
  label: string
}) {
  return (
    <div className="absolute inset-0 flex flex-col items-center">
      <div
        className={`absolute inset-0 ${CARD_RADIUS}`}
        style={{ backgroundColor: 'var(--primitive-black-opacity-400)' }}
      />
      <span
        className="absolute text-[18px] leading-[24px] font-bold text-[var(--primitive-white)] tracking-[0] whitespace-nowrap overflow-hidden text-ellipsis"
        style={{ top: '94px' }}
      >
        SOLD OUT
      </span>
      <div
        className={`absolute flex items-center justify-center w-[138px] h-[32px] ${CARD_RADIUS} border border-[var(--primitive-white-opacity-200)]`}
        style={{ top: '206px' }}
      >
        <span className="text-[12px] leading-[16px] font-bold text-[var(--primitive-white)] text-center tracking-[0] whitespace-nowrap">
          완판됐어요!
        </span>
      </div>
      <DealBadge logoMaskUrl={logoMaskUrl} logoColor={logoColor} label={label} />
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
    <div className={className ?? `flex flex-col gap-[8px] items-center overflow-clip pb-[8px] w-full`}>
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
            className={`absolute left-0 top-0 flex items-center h-[26px] px-[8px] py-[4px] rounded-tl-[var(--products-radius-8)] rounded-br-[var(--products-radius-8)]`}
            style={{ backgroundImage: 'linear-gradient(100.08deg, #fe0955 17.78%, #fa467e 100%)' }}
          >
            <span className="text-[10px] leading-[15px] font-bold text-[var(--primitive-white)] whitespace-nowrap tracking-[0]">
              {badgeLabel}
            </span>
          </div>
        )}
        {/* 매진 오버레이 */}
        {soldout && <GifticonSoldoutOverlay />}
      </div>

      {/* 텍스트 콘텐츠 */}
      <div className="flex flex-col items-start px-[4px] w-full shrink-0">
        <div className="flex flex-col gap-[2px] items-start w-full">
          <div className="flex flex-col gap-[2px] items-start w-full">
            <p className="text-[11px] leading-[16px] font-normal text-[var(--primitive-blueblack-300)] overflow-hidden text-ellipsis whitespace-nowrap w-full tracking-[0]">
              {brand}
            </p>
            <p className="text-[12px] leading-[16px] font-normal text-[var(--primitive-black)] max-h-[32px] overflow-hidden text-ellipsis w-full tracking-[0]">
              {title}
            </p>
          </div>
          <div className="flex gap-[3px] items-center whitespace-nowrap">
            {showDiscount && (
              <span className="text-[15px] leading-[20px] font-bold text-[var(--color-brand-ocb-pink)] shrink-0 tracking-[0]">
                {discount}
              </span>
            )}
            <span className="text-[15px] leading-[20px] font-bold text-[var(--primitive-black)] overflow-hidden text-ellipsis tracking-[0]">
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
    <div className={className ?? `flex flex-col gap-[8px] items-start overflow-clip pb-[8px] w-full`}>
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
      <div className="flex flex-col gap-[5px] items-start w-full">
        <div className="flex flex-col gap-[2px] items-start px-[4px] w-full">
          <p className="text-[12px] leading-[16px] font-normal text-[var(--primitive-black)] max-h-[32px] overflow-hidden text-ellipsis w-full tracking-[0]">
            {title}
          </p>
          <div className="flex gap-[3px] items-center whitespace-nowrap">
            {showDiscount && (
              <span className="text-[15px] leading-[20px] font-bold text-[var(--color-brand-ocb-pink)] shrink-0 tracking-[0]">
                {discount}
              </span>
            )}
            <span className="text-[15px] leading-[20px] font-bold text-[var(--primitive-black)] overflow-hidden text-ellipsis tracking-[0]">
              {price}
            </span>
          </div>
          {/* 별점 */}
          {showRating && (
            <div className="flex gap-px items-center">
              <img src={STAR_ICON} alt="" aria-hidden className="size-[10px] shrink-0 object-contain" />
              <span className="text-[10px] leading-[15px] font-medium text-[var(--primitive-black)] tracking-[0]">
                {rating}
              </span>
              <span className="text-[10px] leading-[15px] font-normal text-[var(--primitive-blueblack-300)] tracking-[0]">
                ({reviewCount})
              </span>
            </div>
          )}
        </div>

        {/* 태그 */}
        {showTag && (
          <div className="flex flex-wrap gap-[3px] items-start w-full">
            {/* Point 태그 */}
            <span className="inline-flex h-[18px] items-center px-[4px] py-[2px] gap-[2px] rounded-[var(--radius-050)] bg-[var(--primitive-shopping-purple-900)]">
              <span className="text-[10px] leading-[15px] font-semibold text-[var(--primitive-shopping-purple-600)] whitespace-nowrap tracking-[0]">
                {pointLabel}
              </span>
            </span>
            {/* Basic 태그 */}
            <span className="inline-flex h-[18px] items-center px-[4px] py-[2px] rounded-[var(--radius-050)] bg-[var(--primitive-black-800)]">
              <span className="text-[10px] leading-[15px] font-semibold text-[var(--primitive-black-300)] whitespace-nowrap tracking-[0]">
                쇼핑 적립
              </span>
            </span>
          </div>
        )}
      </div>
    </div>
  )
}

function DiscountDealCard({
  imageUrl,
  title = '다음 치킨 타임은\n60계 치킨으로',
  discount = '40%',
  price = '22,200원',
  timer = '88:88:88',
  showJoining = false,
  soldout = false,
  className,
}: ProductCardProps & { soldout?: boolean }) {
  const lines = title?.split('\n') ?? []

  return (
    <div
      className={className ?? `${CARD_BORDER} flex flex-col h-[250px] items-center justify-end overflow-clip relative ${CARD_RADIUS} w-full`}
    >
      {/* 풀블리드 배경 이미지 */}
      {imageUrl && (
        <img
          src={imageUrl}
          alt=""
          aria-hidden
          className={`absolute inset-0 max-w-none object-cover pointer-events-none ${CARD_RADIUS} size-full`}
        />
      )}

      {/* 하단 텍스트 + 버튼 */}
      {!soldout && (
        <>
          <div className="flex flex-col gap-[2px] items-start pb-[9px] pt-[12px] px-[12px] relative w-full shrink-0">
            <p className="text-[12px] leading-[16px] font-medium text-[var(--primitive-white)] max-h-[32px] overflow-hidden text-ellipsis w-full tracking-[0] whitespace-pre-wrap">
              {lines.map((l, i) => (
                <span key={i}>{l}{i < lines.length - 1 && <br />}</span>
              ))}
            </p>
            <div className="flex gap-[4px] items-center whitespace-nowrap w-full">
              <span className="text-[15px] leading-[20px] font-bold text-[var(--primitive-sp-yellow)] overflow-hidden text-ellipsis tracking-[0]">
                {discount}
              </span>
              <span className="text-[15px] leading-[20px] font-bold text-[var(--primitive-white)] overflow-hidden text-ellipsis tracking-[0]">
                {price}
              </span>
            </div>
          </div>
          <div className="flex flex-col items-start pb-[12px] px-[12px] relative w-full shrink-0">
            <div className={`bg-[var(--filled-primary-surface)] flex h-[32px] items-center justify-center ${CARD_RADIUS} w-full`}>
              <span className="text-[12px] leading-[16px] font-bold text-[var(--primitive-white)] text-center tracking-[0] whitespace-nowrap">
                공구 참여
              </span>
            </div>
          </div>
        </>
      )}

      {/* 참여중 필 */}
      {showJoining && !soldout && <JoiningPill />}

      {/* 뱃지 or 완판 오버레이 */}
      {soldout ? (
        <DealSoldoutOverlay
          logoMaskUrl={DEAL_DISCOUNT_LOGO_MASK}
          logoColor="var(--primitive-sp-yellow)"
          label={timer ?? '88:88:88'}
        />
      ) : (
        <DealBadge
          logoMaskUrl={DEAL_DISCOUNT_LOGO_MASK}
          logoColor="var(--primitive-sp-yellow)"
          label={timer ?? '88:88:88'}
        />
      )}
    </div>
  )
}

function HotDealCard({
  imageUrl,
  title = '설날 선물의 기본템\n신세계 상품권 1만원권',
  discount = '40%',
  price = '22,200원',
  daysLeft = '3일 남음',
  showJoining = false,
  soldout = false,
  className,
}: ProductCardProps & { soldout?: boolean }) {
  const lines = title?.split('\n') ?? []

  return (
    <div
      className={className ?? `${CARD_BORDER} flex flex-col h-[250px] items-center justify-end overflow-clip relative ${CARD_RADIUS} w-full`}
    >
      {imageUrl && (
        <img
          src={imageUrl}
          alt=""
          aria-hidden
          className={`absolute inset-0 max-w-none object-cover pointer-events-none ${CARD_RADIUS} size-full`}
        />
      )}

      {!soldout && (
        <>
          <div className="flex flex-col gap-[2px] items-start pb-[9px] pt-[12px] px-[12px] relative w-full shrink-0">
            <p className="text-[12px] leading-[16px] font-medium text-[var(--primitive-white)] max-h-[32px] overflow-hidden text-ellipsis w-full tracking-[0]">
              {lines.map((l, i) => (
                <span key={i}>{l}{i < lines.length - 1 && <br />}</span>
              ))}
            </p>
            <div className="flex gap-[4px] items-center whitespace-nowrap w-full">
              <span className="text-[15px] leading-[20px] font-bold text-[var(--primitive-sp-pink)] overflow-hidden text-ellipsis tracking-[0]">
                {discount}
              </span>
              <span className="text-[15px] leading-[20px] font-bold text-[var(--primitive-white)] overflow-hidden text-ellipsis tracking-[0]">
                {price}
              </span>
            </div>
          </div>
          <div className="flex flex-col items-start pb-[12px] px-[12px] relative w-full shrink-0">
            <div className={`bg-[var(--filled-primary-surface)] flex h-[32px] items-center justify-center ${CARD_RADIUS} w-full`}>
              <span className="text-[12px] leading-[16px] font-bold text-[var(--primitive-white)] text-center tracking-[0] whitespace-nowrap">
                공구 참여
              </span>
            </div>
          </div>
        </>
      )}

      {showJoining && !soldout && <JoiningPill />}

      {soldout ? (
        <DealSoldoutOverlay
          logoMaskUrl={DEAL_HOTDEAL_LOGO_MASK}
          logoColor="var(--primitive-sp-pink)"
          label={daysLeft ?? '3일 남음'}
        />
      ) : (
        <DealBadge
          logoMaskUrl={DEAL_HOTDEAL_LOGO_MASK}
          logoColor="var(--primitive-sp-pink)"
          label={daysLeft ?? '3일 남음'}
        />
      )}
    </div>
  )
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
    <div className={className ?? `flex flex-col gap-[8px] items-center justify-end overflow-clip pb-[8px] w-full`}>
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
      <div className="flex flex-col gap-[2px] items-start px-[4px] w-full shrink-0">
        {/* 영화명 + 관람등급 */}
        <div className="flex gap-[2px] items-center w-full">
          <span className="text-[12px] leading-[16px] font-normal text-[var(--primitive-black)] shrink-0 whitespace-nowrap tracking-[0]">
            {brand}
          </span>
          {filmRating && (
            <span
              className="inline-flex items-center justify-center shrink-0 size-[14px] text-[8px] font-bold text-[var(--primitive-white)] rounded-[2px]"
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
              <img src={EGG_ICON} alt="" aria-hidden className="size-[10px] shrink-0 object-contain" />
              <span className="text-[10px] leading-[15px] font-medium text-[var(--primitive-black)] overflow-hidden text-ellipsis whitespace-nowrap tracking-[0]">
                {eggRating}
              </span>
            </div>
            <div className="w-px h-[12px] bg-[var(--primitive-blueblack-700)] shrink-0" />
          </div>
          <span className="text-[10px] leading-[15px] font-normal text-[var(--primitive-blueblack-300)] overflow-hidden text-ellipsis whitespace-nowrap tracking-[0]">
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
    <div className={className ?? `flex flex-col gap-[10px] items-start py-[10px] ${CARD_RADIUS} w-full`}>
      <p className="text-[13px] leading-[18px] font-bold text-[var(--primitive-black)] overflow-hidden text-ellipsis whitespace-nowrap w-full tracking-[0]">
        {listTitle}
      </p>
      <div className="flex flex-col gap-[4px] items-start w-full">
        {displayItems.map((item, idx) => (
          <div
            key={idx}
            className={`bg-[var(--primitive-white)] ${CARD_BORDER} flex gap-[8px] items-center overflow-clip pr-[8px] ${CARD_RADIUS} w-full shrink-0`}
          >
            {/* 썸네일 + 순위 뱃지 */}
            <div className="relative size-[44px] shrink-0">
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
              <div className="absolute left-0 top-0 bg-[var(--primitive-blueblack)] flex items-center justify-center py-[2px] rounded-tl-[var(--products-radius-8)] rounded-br-[var(--products-radius-8)] w-[18px]">
                <span className="text-[11px] leading-[16px] font-bold text-[var(--primitive-white)] tracking-[0] whitespace-nowrap">
                  {idx + 1}
                </span>
              </div>
            </div>
            {/* 브랜드명 */}
            <p className="text-[12px] leading-[16px] font-normal text-[var(--primitive-black)] max-h-[16px] overflow-hidden text-ellipsis whitespace-nowrap flex-1 min-w-0 tracking-[0]">
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
      className={className ?? `${CARD_BORDER} flex flex-col h-[250px] items-center justify-center overflow-clip ${CARD_RADIUS} w-full`}
      style={{ backgroundColor: bg }}
    >
      <div className="flex flex-1 flex-col items-center justify-between min-h-0 pb-[10px] pt-[24px] px-[12px] w-full">
        {/* 텍스트 + 태그 */}
        <div className="flex flex-col gap-[8px] items-center w-full shrink-0">
          <div className="flex flex-col gap-[2px] items-start text-center w-full">
            <p className="text-[11px] leading-[16px] font-normal text-[var(--primitive-black)] overflow-hidden text-ellipsis w-full tracking-[0]">
              {brand}
            </p>
            <p className="text-[15px] leading-[20px] font-bold text-[var(--primitive-black)] overflow-hidden text-ellipsis w-full tracking-[0]">
              {title}
            </p>
          </div>
          {/* MD 태그 (color-burn 오버레이) */}
          <div className="relative flex h-[22px] items-center px-[7px] py-[4px] rounded-[100px]">
            <div
              aria-hidden
              className="absolute inset-0 rounded-[100px] mix-blend-color-burn pointer-events-none"
              style={{ backgroundColor: 'rgba(0,0,0,0.08)' }}
            />
            <span
              className="text-[11px] leading-[16px] font-semibold whitespace-nowrap tracking-[0] relative"
              style={{ color: text }}
            >
              {mdTag}
            </span>
          </div>
        </div>

        {/* 상품 이미지 */}
        <div className="flex-1 min-h-0 w-full relative mt-[8px]" style={{ aspectRatio: '1/1', maxHeight: '138px' }}>
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
      className={className ?? `${CARD_BORDER} flex flex-col h-[250px] items-center justify-between pb-[12px] pt-[30px] overflow-clip ${CARD_RADIUS} w-full`}
      style={{ backgroundColor: 'var(--color-theme-bg-light)' }}
    >
      {/* 상단 콘텐츠 */}
      <div className="flex flex-col gap-[10px] items-center shrink-0">
        <div className="flex flex-col gap-[4px] items-center">
          <span className="text-[11px] leading-[16px] font-normal text-[var(--primitive-black)] text-center tracking-[-0.3px]">
            {bannerSubtitle}
          </span>
          {/* 타이틀 이미지 or 플레이스홀더 */}
          {bannerTitleImage ? (
            <img src={bannerTitleImage} alt="배너 제목" className="h-[30px] w-[100px] object-contain" />
          ) : (
            <div className="h-[30px] w-[100px] flex items-center justify-center">
              <span className="text-[18px] font-bold text-[var(--primitive-blueblack)] tracking-[-0.5px]">
                쇼핑적립
              </span>
            </div>
          )}
        </div>
        {/* CTA 태그 */}
        <div className="flex h-[22px] items-center justify-center px-[8px] py-[4px] rounded-[100px] bg-[var(--primitive-purple)]">
          <span className="text-[11px] leading-[16px] font-semibold text-[var(--primitive-white)] whitespace-nowrap tracking-[0]">
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
      className={className ?? `${CARD_BORDER} flex flex-col h-[250px] items-center justify-center overflow-clip relative w-full`}
      style={{ borderRadius: 'var(--products-spacing-50)' }}
    >
      {/* 배경 이미지 + 다크 오버레이 */}
      {imageUrl && (
        <img
          src={imageUrl}
          alt=""
          aria-hidden
          className="absolute inset-0 max-w-none object-cover pointer-events-none size-full"
          style={{ borderRadius: 'var(--products-spacing-50)' }}
        />
      )}
      <div
        className="absolute inset-0"
        style={{
          backgroundColor: 'var(--primitive-black-opacity-400)',
          borderRadius: 'var(--products-spacing-50)',
        }}
      />

      {/* 중앙 콘텐츠 */}
      <div className="relative flex flex-col gap-[14px] items-center justify-center whitespace-nowrap">
        <div className="flex flex-col gap-[2px] items-center text-center">
          <span className="text-[16px] leading-[24px] font-bold text-[var(--primitive-sp-yellow)] tracking-[0]">
            {countdown}
          </span>
          <div className="text-[24px] leading-[28px] font-bold text-[var(--primitive-white)] tracking-[0] text-center">
            <p>{openDate}</p>
            <p>{openTime}</p>
          </div>
        </div>
        <span className="text-[12px] leading-[16px] font-normal text-[var(--primitive-white)] overflow-hidden text-ellipsis tracking-[0]">
          {title}
        </span>
      </div>
    </div>
  )
}

// ────────────────────────────────────────────────────────────────
// Main export
// ────────────────────────────────────────────────────────────────

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
    default:                    return null
  }
}
