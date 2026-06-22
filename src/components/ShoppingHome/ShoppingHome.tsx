import ProductCard from '../ProductCard'
import type { ProductCardProps } from '../ProductCard/ProductCard.types'
import TopBanner from '../TopBanner'
import ChipMenu from '../ChipMenu'

// ── 2열 혼합 피드 데이터 (이미지 순서대로 L/R 인터리브) ──────────────
const FEED: ProductCardProps[] = [
  // L0
  { type: 'Gifticon', brand: '스타벅스', title: '카페 아메리카노 T+팡쇼 파마산 치즈 베이글', discount: '30%', price: '12,400원' },
  // R0
  { type: 'DiscountDeal', title: '다음 치킨 타임은\n60계 치킨으로', discount: '40%', price: '22,200원', timer: '88:88:88' },
  // L1
  { type: 'Outbound', title: '완벽세척 통세척 살균 가습기 HUB300A', discount: '24%', price: '88,000원', rating: '4.1', reviewCount: '368', pointLabel: '1,640P 적립' },
  // R1
  { type: 'Gifticon', brand: '스타벅스', title: '딸기 딸라이트 요거트 블렌디드', showDiscount: false, price: '6,400원' },
  // L2
  { type: 'GifticonOffering', brand: '파리바게뜨', title: '파리바게뜨에 두꾼두 재고 있음!', mdTag: 'MD 추천', color: 'Blue' },
  // R2
  { type: 'Outbound', title: '스마일 옐로우 9종 굿즈 기프트 세트', discount: '30%', price: '27,000원', rating: '4.9', reviewCount: '2,387', pointLabel: '520P 적립' },
  // L3
  { type: 'ListRanking', listTitle: '이런 상품은 어떤가요?', items: [
    { imageUrl: '', name: '알루미늄 건조대' },
    { imageUrl: '', name: '아기 기저귀' },
    { imageUrl: '', name: '아기 빨래 세제' },
    { imageUrl: '', name: '여자 모델 홈웨어' },
  ] },
  // R3
  { type: 'Gifticon', brand: 'GS25', title: '모바일 금액권 5,000원', discount: '5%', price: '4,500원', soldout: true },
  // L4
  { type: 'Movie', brand: '휴민트', filmRating: '15', eggRating: '97%', bookingRate: '예매율 53.95%', rank: '1' },
  // R4
  { type: 'Outbound', title: '[오리지네] 페페로니 러버 L+콜라 1.25L', discount: '30%', price: '27,800원' },
  // L5
  { type: 'Outbound', title: '배스킨라빈스 파밍온 아이스크림', discount: '2%', price: '25,540원', showRating: false, showTag: false },
  // R5
  { type: 'Outbound', title: '스트라이프 코튼 바스타월 _70x140cm,카키', discount: '25%', price: '5,300원', rating: '4.3', reviewCount: '764', pointLabel: '180P 적립' },
  // L6
  { type: 'HotDeal', title: '설날 선물의 기본템\n신세계 상품권 1만원권', discount: '40%', price: '22,200원', daysLeft: '3일 남음', showJoining: true },
  // R6
  { type: 'Outbound', title: '용미라거 리아 불고기', discount: '4%', price: '4,780원', showRating: false, showTag: false },
  // L7
  { type: 'Outbound', title: 'NO.1 우유식빵', discount: '2%', price: '3,440원', showRating: false, showTag: false },
  // R7
  { type: 'Outbound', title: '아이깨끗해/세퓨마 외 핸드솝외 ~1+1', discount: '12%', price: '6,210원', rating: '5.0', reviewCount: '1,881', pointLabel: '210P 적립' },
]

/** 2열 masonry 피드 — 짝수 인덱스 = 왼쪽 컬럼, 홀수 = 오른쪽 컬럼 */
function ProductFeed() {
  const left = FEED.filter((_, i) => i % 2 === 0)
  const right = FEED.filter((_, i) => i % 2 === 1)

  return (
    <div
      className="flex"
      style={{
        paddingInline: 'var(--plist-px)',
        paddingTop: 'var(--plist-pt)',
        paddingBottom: 'var(--plist-pb)',
        columnGap: 'var(--plist-gutter)',
      }}
    >
      {[left, right].map((col, ci) => (
        <div key={ci} className="flex-1 min-w-0 flex flex-col" style={{ rowGap: 'var(--plist-gutter)' }}>
          {col.map((card, i) => (
            <ProductCard key={i} {...card} />
          ))}
        </div>
      ))}
    </div>
  )
}

function Footer() {
  return (
    <div
      className="flex flex-col gap-[8px] bg-[var(--primitive-white)]"
      style={{ paddingInline: 'var(--plist-px)', paddingBlock: '20px' }}
    >
      <span className="text-[12px] leading-[16px] font-bold text-[var(--primitive-blueblack)]">OK캐쉬백 쇼핑</span>
      <div className="flex gap-[12px]">
        <span className="text-[11px] leading-[16px] text-[var(--primitive-blueblack-300)]">쇼핑 서비스 이용약관</span>
        <span className="text-[11px] leading-[16px] text-[var(--primitive-blueblack-300)]">통신판매중개자 안내</span>
      </div>
    </div>
  )
}

export default function ShoppingHome() {
  return (
    <div className="bg-[var(--primitive-white)]">
      {/* ① 탑 배너 (Figma node 20327-20529) — 헤더 뒤로 겹침 */}
      <div style={{ marginTop: 'calc(-1 * var(--topbanner-overlap))' }}>
        <TopBanner total={3} activeIndex={0} />
      </div>

      {/* ② 칩 메뉴 (Figma node 20327-20543) */}
      <div className="pb-[8px]">
        <ChipMenu />
      </div>

      {/* ③ 2열 혼합 상품 피드 (plist 배치 토큰) */}
      <ProductFeed />

      {/* ④ 푸터 */}
      <Footer />
    </div>
  )
}
