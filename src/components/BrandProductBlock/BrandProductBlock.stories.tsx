import type { Meta, StoryObj } from '@storybook/react'
import BrandProductBlock from './BrandProductBlock'
import type { ProductCardProps } from '../ProductCard/ProductCard.types'
import logoGmarket from '../../assets/logo-gmarket_19449-147713.svg'

const ITEMS: ProductCardProps[] = [
  { type: 'Outbound', title: '완벽세척 통세척 살균 가습기', showDiscount: true, discount: '24%', price: '88,000원', showRating: true, rating: '4.1', reviewCount: '368', showTag: true, pointLabel: '1,640P 적립' },
  { type: 'Outbound', title: '스마일 옐로우 굿즈 세트', showDiscount: true, discount: '30%', price: '27,000원', showRating: true, rating: '4.9', reviewCount: '2,387', showTag: true, pointLabel: '520P 적립' },
  { type: 'Outbound', title: '무선 핸디 선풍기', showDiscount: true, discount: '15%', price: '12,900원', showRating: true, rating: '4.5', reviewCount: '921', showTag: true, pointLabel: '250P 적립' },
]

const meta: Meta<typeof BrandProductBlock> = {
  title: '적립쇼핑/BrandProductBlock',
  component: BrandProductBlock,
  parameters: { layout: 'fullscreen' },
  decorators: [(S) => <div className="w-[var(--frame-mobile-w)] bg-[var(--primitive-white)]"><S /></div>],
}
export default meta
type Story = StoryObj<typeof BrandProductBlock>

export const 기본: Story = {
  // 실제 사용 시 logoBackground 에는 제휴처 브랜드 컬러가 데이터로 들어온다.
  // 디자인 시스템 값이 아니므로 토큰으로 만들지 않는다.
  args: { brand: 'G마켓', label: '~5% 적립', logo: logoGmarket, items: ITEMS },
}
/** 로고 없는 제휴처 — 회색 박스로 떨어진다 */
export const 로고없음: Story = { args: { brand: '쿠팡', label: '~3% 적립', items: ITEMS } }
export const 적립률없음: Story = { args: { brand: 'SSG', logo: logoGmarket, items: ITEMS } }
