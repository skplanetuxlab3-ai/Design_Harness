import type { Meta, StoryObj } from '@storybook/react'
import CheckoutPanel from './CheckoutPanel'

const meta: Meta<typeof CheckoutPanel> = {
  title: 'Components/CheckoutPanel',
  component: CheckoutPanel,
  parameters: { layout: 'padded' },
  args: {
    productName: '할인공구 상품 명 (서비스타입 · 카테고리)',
    quantity: 1,
    originalPrice: '1,000,000원',
    finalPrice: '997,000원',
    pointDiscount: '-10,570P',
    pointBalance: '10,570P',
    phoneNumber: '010-***-1234',
  },
}

export default meta
type Story = StoryObj<typeof CheckoutPanel>

export const Default: Story = {
  args: { state: 'default' },
}

export const PointFull: Story = {
  args: { state: 'pointFull' },
}

export const PointLow: Story = {
  args: { state: 'pointLow' },
}

export const AllStates: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px', maxWidth: '375px' }}>
      {(['default', 'pointFull', 'pointLow'] as const).map((state) => (
        <div key={state}>
          <p
            style={{
              fontSize: '12px',
              color: 'var(--primitive-blueblack-300)',
              marginBottom: '8px',
              fontWeight: 600,
            }}
          >
            {state}
          </p>
          <CheckoutPanel
            state={state}
            productName="할인공구 상품 명 (서비스타입 · 카테고리)"
            quantity={1}
            originalPrice="1,000,000원"
            finalPrice="997,000원"
            pointDiscount="-10,570P"
            pointBalance="10,570P"
            phoneNumber="010-***-1234"
          />
        </div>
      ))}
    </div>
  ),
}
