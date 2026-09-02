import type { Meta, StoryObj } from '@storybook/react'
import GuideCard from './GuideCard'
import screen1 from '../../assets/guide-screen1_21361-39588.png'
import banner from '../../assets/guide-banner_21361-39566.png'

const meta: Meta<typeof GuideCard> = {
  title: '적립쇼핑/GuideCard',
  component: GuideCard,
  parameters: { layout: 'fullscreen' },
  decorators: [(S) => <div className="w-[var(--frame-mobile-w)] bg-[var(--color-theme-bg-light)] p-[var(--products-spacing-20)]"><S /></div>],
}
export default meta
type Story = StoryObj<typeof GuideCard>

/** CardType1 — 제목 + 본문 + 일러스트 */
export const 기본: Story = {
  args: {
    title: <>많이 찾는 쇼핑몰만 모아놨어요</>,
    body: <>쿠팡, 네이버+스토어, G마켓, SSG 등 60여개의<br />포인트 적립 가능한 쇼핑몰이 있어요</>,
    image: screen1,
  },
}

/** CardType_Bonus1 — 버튼 + 안내 문구가 붙는다 */
export const 액션있음: Story = {
  args: {
    title: <>적립 포인트+스탬프 받고<br />e쿠폰 및 선물 챙기세요</>,
    image: banner,
    actions: [{ label: '쿠팡 스탬프가기' }, { label: '쇼핑 스탬프가기' }],
    note: <>+스탬프 쇼핑몰에서 적립 링크로 상품 구매하고<br />스탬프를 모아서 최대 5만원 선물을 받을 수 있어요</>,
  },
}
