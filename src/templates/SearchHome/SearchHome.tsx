import AppBar from '../../components/AppBar'
import SearchInput from '../../components/SearchInput'
import SearchChip from '../../components/SearchChip'
import BrandProductBlock from '../../components/BrandProductBlock'
import type { ProductCardProps } from '../../components/ProductCard/ProductCard.types'

/**
 * SP08_1_검색창 — Figma node 19449:147651 (360×1888)
 *
 *   top_appbar · search_bar · 최근 검색어 · 추천 검색어 · 제휴처별 추천 상품
 */

const RECENT = ['티슈', '두피마사지기', '아이폰케이스', '손선풍기']
const RECOMMENDED = ['티슈', '야광팔찌', '손선풍기', '아이폰 케이스', '아이라이너', '핸들커버', '텀블러']

const P = (title: string, discount: string, price: string, rating: string, reviews: string, point: string): ProductCardProps => ({
  type: 'Outbound', title, showDiscount: true, discount, price,
  showRating: true, rating, reviewCount: reviews, showTag: true, pointLabel: point,
})

const BLOCKS = [
  { brand: '쿠팡', label: '~3% 적립', items: [
    P('완벽세척 통세척 살균 가습기 HUB300A', '24%', '88,000원', '4.1', '368', '1,640P 적립'),
    P('스마일 옐로우 9종 굿즈 기프트 세트', '30%', '27,000원', '4.9', '2,387', '520P 적립'),
    P('무선 핸디 선풍기 3단 풍속', '15%', '12,900원', '4.5', '921', '250P 적립'),
  ] },
  { brand: 'G마켓', label: '~5% 적립', items: [
    P('스트라이프 코튼 바스타월 70x140cm', '25%', '5,300원', '4.3', '764', '180P 적립'),
    P('아이깨끗해 세퓨마 핸드솝 1+1', '12%', '6,210원', '5.0', '1,881', '210P 적립'),
    P('보온보냉 스테인리스 텀블러 500ml', '35%', '19,800원', '4.7', '540', '600P 적립'),
  ] },
  { brand: 'SSG', label: '~4% 적립', items: [
    P('접이식 알루미늄 빨래건조대', '20%', '32,000원', '4.2', '312', '900P 적립'),
    P('유기농 아기 기저귀 대형 4팩', '18%', '45,900원', '4.8', '2,104', '1,300P 적립'),
    P('캠핑용 LED 랜턴 충전식', '28%', '23,400원', '4.6', '688', '700P 적립'),
  ] },
  { brand: '이마트몰', label: '~2% 적립', items: [
    P('실리콘 주방 조리도구 6종 세트', '22%', '16,700원', '4.4', '455', '480P 적립'),
    P('겨울 극세사 침구 세트 퀸', '40%', '59,000원', '4.9', '1,247', '1,700P 적립'),
    P('휴대용 미니 가습기 USB', '33%', '9,900원', '4.0', '203', '290P 적립'),
  ] },
  { brand: '오늘의집', label: '~3% 적립', items: [
    P('원목 사이드 테이블', '15%', '39,000원', '4.6', '812', '1,100P 적립'),
    P('린넨 커튼 2장 세트', '27%', '28,900원', '4.5', '634', '820P 적립'),
    P('무드등 겸용 무선 스탠드', '30%', '21,500원', '4.7', '1,022', '640P 적립'),
  ] },
]

export default function SearchHome({
  onBack,
  onFocusSearch,
  onSelectKeyword,
}: {
  onBack?: () => void
  onFocusSearch?: () => void
  onSelectKeyword?: (k: string) => void
}) {
  return (
    <div className="flex w-full flex-col items-start bg-[var(--primitive-white)]">
      <AppBar onBack={onBack} />

      {/* Search bar 19449:147658 */}
      <div className="flex w-full shrink-0 flex-col items-center justify-center px-[var(--search-bar-px)] pb-[var(--search-bar-pb)]">
        <div onClick={onFocusSearch}>
          <SearchInput readOnlyDisplay placeholder="상품을 검색해 보세요" />
        </div>
      </div>

      {/* Recent 19449:147660 */}
      <section
        className="flex w-full flex-col items-start gap-[var(--search-sec-gap)] px-[var(--search-sec-px)] pt-[var(--search-sec-pt)] pb-[var(--search-sec-pb)]"
        aria-label="최근 검색어"
      >
        <div className="flex w-full items-center justify-between whitespace-nowrap">
          <p className="text-[length:var(--typeset-md-size)] leading-[var(--typeset-md-lh)] font-bold text-[var(--primitive-black)] tracking-[0]">
            최근 검색어
          </p>
          <button type="button" className="text-[length:var(--typeset-sm-size)] leading-[var(--typeset-sm-lh)] font-normal text-[var(--primitive-blueblack-300)] tracking-[0]">
            전체 삭제
          </button>
        </div>
        <div
          className="flex w-full items-start overflow-x-auto"
          style={{ columnGap: 'var(--search-chips-col-gap)', msOverflowStyle: 'none', scrollbarWidth: 'none' } as React.CSSProperties}
        >
          {RECENT.map((k) => (
            <SearchChip key={k} label={k} onClick={() => onSelectKeyword?.(k)} onRemove={() => {}} />
          ))}
        </div>
      </section>

      {/* Recommended 19449:147677 */}
      <section
        className="flex w-full flex-col items-start gap-[var(--search-sec-gap)] px-[var(--search-sec-px)] py-[var(--search-sec-pt)]"
        aria-label="추천 검색어"
      >
        <p className="whitespace-nowrap text-[length:var(--typeset-md-size)] leading-[var(--typeset-md-lh)] font-bold text-[var(--primitive-black)] tracking-[0]">
          추천 검색어
        </p>
        <div
          className="flex w-full flex-wrap content-start items-start"
          style={{ columnGap: 'var(--search-chips-col-gap)', rowGap: 'var(--search-chips-row-gap)' }}
        >
          {RECOMMENDED.map((k) => (
            <SearchChip key={k} label={k} variant="recommended" onClick={() => onSelectKeyword?.(k)} />
          ))}
        </div>
      </section>

      {/* Products 19449:147687 */}
      <section className="flex w-full flex-col items-start" aria-label="추천 상품">
        <p className="w-full px-[var(--plist-px)] py-[var(--products-spacing-10)] whitespace-nowrap text-[length:var(--typeset-md-size)] leading-[var(--typeset-md-lh)] font-bold text-[var(--primitive-black)] tracking-[0]">
          추천 상품
        </p>
        {BLOCKS.map((b) => (
          <BrandProductBlock key={b.brand} brand={b.brand} label={b.label} items={b.items} />
        ))}
      </section>
    </div>
  )
}
