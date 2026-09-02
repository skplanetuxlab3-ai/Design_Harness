import AppBar from '../../components/AppBar'
import GuideCard from '../../components/GuideCard'
import hero from '../../assets/guide-hero_21361-39907.png'
import screen1 from '../../assets/guide-screen1_21361-39588.png'
import screen2 from '../../assets/guide-screen2_21112-75301.png'
import banner from '../../assets/guide-banner_21361-39566.png'
import screen5 from '../../assets/guide-screen5_21361-39575.png'

/**
 * SP08_4 이용가이드 — Figma node 20041:130474 (360 / 720 두 변형 중 360)
 *
 *   top_appbar · Top(히어로) · CardType1 · CardType2
 *   · CardType_Bonus1 · CardType_Bonus2 · dialog/bars/cta
 *
 * ※ 카드 안의 일러스트는 Figma 에서 실제 컴포넌트로 조립된 심볼이지만
 *   (img_Screen1 안에 brand_list_item · CategoryFilter 가 살아 있다),
 *   가이드 화면에서는 앱 스크린샷 역할이라 PNG 로 내보내 쓴다.
 */
export default function ShoppingGuide({
  onClose,
  onStamp,
  onSearch,
}: {
  onClose?: () => void
  onStamp?: (kind: 'coupang' | 'shopping') => void
  onSearch?: () => void
}) {
  return (
    <div
      className="flex w-full flex-col items-center"
      style={{ backgroundColor: 'var(--color-theme-bg-light)' }}
    >
      <AppBar onBack={onClose} />

      {/* Top 20807:64006 */}
      <header className="relative flex w-full flex-col items-center pt-[var(--guide-top-pt)]">
        <div className="flex flex-col items-center gap-[var(--guide-top-gap)] text-center">
          <p className="text-[length:var(--typeset-md-size)] leading-[var(--typeset-md-lh)] font-bold text-[var(--primitive-shopping-purple-700)] tracking-[0]">
            새로워진 적립쇼핑
          </p>
          <h1 className="text-[length:var(--typeset-5xl-size)] leading-[var(--typeset-5xl-lh)] font-bold text-[var(--primitive-sp-black)] tracking-[0]">
            OK캐쉬백에서<br />적립받는 쇼핑하세요!
          </h1>
        </div>
        <img src={hero} alt="" aria-hidden className="block w-full max-w-[var(--guide-hero)]" />
      </header>

      {/* 카드 4장 */}
      <div className="flex w-full flex-col items-center gap-[var(--products-spacing-16)] px-[var(--products-spacing-20)] pb-[var(--products-spacing-36)]">
        <GuideCard
          title="많이 찾는 쇼핑몰만 모아놨어요"
          body={<>쿠팡, 네이버+스토어, G마켓, SSG 등 60여개의<br />포인트 적립 가능한 쇼핑몰이 있어요</>}
          image={screen1}
        />
        <GuideCard
          title="내 쇼핑 루트, 이제 더 빠르게!"
          body={<>즐겨찾는 쇼핑몰, 자주 구매한 쇼핑몰을<br />쉽게 찾아갈 수 있어요</>}
          image={screen2}
        />
        <GuideCard
          title={<>적립 포인트+스탬프 받고<br />e쿠폰 및 선물 챙기세요</>}
          image={banner}
          actions={[
            { label: '쿠팡 스탬프가기', onClick: () => onStamp?.('coupang') },
            { label: '쇼핑 스탬프가기', onClick: () => onStamp?.('shopping') },
          ]}
          note={<>+스탬프 쇼핑몰에서 적립 링크로 상품 구매하고<br />스탬프를 모아서 최대 5만원 선물을 받을 수 있어요</>}
        />
        <GuideCard
          title={<>상품 검색해서 구매하면<br />추가 포인트 적립까지!</>}
          image={screen5}
          actions={[{ label: '상품 검색하기', onClick: onSearch }]}
          note={<>더 주는 검색 쇼핑에서 상품을 탐색하고 구매하면<br />기본적립 + 더 주는 적립까지 혜택 받을 수 있어요</>}
        />
      </div>
    </div>
  )
}
