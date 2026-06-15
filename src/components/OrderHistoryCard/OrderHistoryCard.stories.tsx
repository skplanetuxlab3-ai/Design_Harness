import type { Meta, StoryObj } from '@storybook/react'
import OrderHistoryCard from './OrderHistoryCard'

const meta: Meta<typeof OrderHistoryCard> = {
  title: 'Components/OrderHistoryCard',
  component: OrderHistoryCard,
  parameters: { layout: 'padded' },
  args: {
    orderDate: 'OO.25(수)',
    items: [
      {
        name: '할인공구 상품 명 (서비스타입 · 카테고리)',
        price: '37,000원',
        quantity: 1,
      },
      {
        name: '핫딜 상품 명 (서비스타입 · 카테고리)',
        price: '15,000원',
        quantity: 2,
      },
    ],
  },
}

export default meta
type Story = StoryObj<typeof OrderHistoryCard>

export const Completed: Story = {
  args: { status: 'completed' },
}

export const CancelRequested: Story = {
  args: { status: 'cancelRequested' },
}

export const Cancelled: Story = {
  args: { status: 'cancelled' },
}

export const RefundRequested: Story = {
  args: { status: 'refundRequested' },
}

export const Refunded: Story = {
  args: { status: 'refunded' },
}

export const SingleItem: Story = {
  args: {
    status: 'completed',
    items: [
      {
        name: '기프티콘 상품 명 (서비스타입 · 카테고리)',
        price: '5,000원',
      },
    ],
  },
}

export const ThreeItems: Story = {
  args: {
    status: 'completed',
    items: [
      { name: '상품 A (카테고리)', price: '10,000원', quantity: 1 },
      { name: '상품 B (카테고리)', price: '25,000원', quantity: 2 },
      { name: '상품 C (카테고리)', price: '8,000원', quantity: 3 },
    ],
  },
}

export const AllStatuses: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', maxWidth: '375px' }}>
      {(['completed', 'cancelRequested', 'cancelled', 'refundRequested', 'refunded'] as const).map(
        (status) => (
          <OrderHistoryCard
            key={status}
            status={status}
            orderDate="OO.25(수)"
            items={[
              { name: `${status} — 할인공구 상품 명 (서비스타입 · 카테고리)`, price: '37,000원' },
            ]}
          />
        )
      )}
    </div>
  ),
}
