import type { Meta, StoryObj } from '@storybook/react'
import CheckoutPanel from './CheckoutPanel'

const meta = {
  title: 'Components/CheckoutPanel',
  component: CheckoutPanel,
  tags: ['autodocs'],
  parameters: { layout: 'centered', backgrounds: { default: 'surface' } },
  argTypes: {
    state: { control: 'radio', options: ['default', 'pointFull', 'pointLow'] },
    bannerType: { control: 'radio', options: ['cashback', 'pointOnly', 'none'] },
    showQuantity: { control: 'boolean' },
    showAgreement: { control: 'boolean' },
    maxQuantity: { control: 'number' },
    pointAutoCharge: { control: 'boolean' },
    showRetryPayment: { control: 'boolean' },
  },
  decorators: [
    (Story) => (
      <div style={{ width: 332 }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof CheckoutPanel>

export default meta
type Story = StoryObj<typeof meta>

/** 기본 — 결제 가능 (Figma SP05_2_결제_기프티콘) */
export const Default: Story = {
  args: { state: 'default' },
}

/** 포인트 충족 (Figma SP05_7) */
export const PointFull: Story = {
  name: '포인트 충족',
  args: { state: 'pointFull' },
}

/** 포인트 부족 — Figma SP05_9 원본 그대로 (부족액 표시·포인트 전용 배너·수량 없음) */
export const PointLow: Story = {
  name: '포인트 부족 (SP05_9)',
  args: {
    state: 'pointLow',
    productName: '신세계상품권 1만원권',
    originalPrice: '10,000원',
    finalPrice: '1,000원',
    pointDiscount: '-9,000P',
    pointShortage: '1,000P',
    bannerType: 'pointOnly',
    showQuantity: false,
    pointAutoCharge: false,
    showRetryPayment: false,
    showAgreement: false,
  },
}

/** 공동구매 — "목표 미달 시 지금 가격으로 구매" 행 (2026-05 신설) */
export const Groupbuying: Story = {
  name: '공동구매 (목표 미달 옵션)',
  args: { state: 'default', showRetryPayment: true, cashbackText: '800P' },
}

/** e쿠폰 — 목표 미달 행 없음 */
export const Ecoupon: Story = {
  name: 'e쿠폰',
  args: { state: 'default', showRetryPayment: false, pointAutoCharge: false },
}

/** 수량 최대치 */
export const MaxQuantity: Story = {
  name: '수량 최대',
  args: { state: 'default', quantity: 3, maxQuantity: 3 },
}
