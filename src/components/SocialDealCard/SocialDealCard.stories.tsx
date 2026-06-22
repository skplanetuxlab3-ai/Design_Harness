import type { Meta, StoryObj } from '@storybook/react'
import SocialDealCard from './SocialDealCard'

const meta: Meta<typeof SocialDealCard> = {
  title: 'Components/SocialDealCard',
  component: SocialDealCard,
  parameters: { layout: 'centered' },
  decorators: [(Story) => <div style={{ width: 332 }}><Story /></div>],
}
export default meta

type Story = StoryObj<typeof SocialDealCard>

export const DiscountDeal: Story = {
  args: {
    title: '설날 선물의 기본템\n신세계 상품권 1만원권',
    discount: '3%', price: '9,700원', accent: 'yellow',
    badgeType: 'timer', badgeLabel: '88:88:88', joining: true,
  },
}

export const HotDeal: Story = {
  args: {
    title: '아이스크림이 생각 날\n순간을 위해',
    discount: '30%', price: '12,500원', accent: 'pink',
    badgeType: 'days', badgeLabel: '3일 남음',
  },
}

export const Soldout: Story = {
  args: {
    title: '일이삼사오육칠팔구십일이삼\n일이삼사오육칠팔구십일이삼',
    discount: '30%', price: '15,400원', accent: 'yellow',
    badgeType: 'timer', badgeLabel: '88:88:88', joining: true, soldout: true,
  },
}
