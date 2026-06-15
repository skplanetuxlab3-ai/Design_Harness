import type { Meta, StoryObj } from '@storybook/react'
import QuantityControl from './QuantityControl'

const meta = {
  title: 'Atoms/QuantityControl',
  component: QuantityControl,
  tags: ['autodocs'],
  argTypes: {
    type: { control: 'radio', options: ['plus', 'minus'] },
    active: { control: 'boolean' },
  },
} satisfies Meta<typeof QuantityControl>

export default meta
type Story = StoryObj<typeof meta>

export const MinusActive: Story = {
  args: { type: 'minus', active: true },
}

export const MinusInactive: Story = {
  args: { type: 'minus', active: false },
}

export const PlusActive: Story = {
  args: { type: 'plus', active: true },
}

export const PlusInactive: Story = {
  args: { type: 'plus', active: false },
}

export const QuantityRow: Story = {
  render: () => (
    <div className="flex items-center gap-3 p-4">
      <QuantityControl type="minus" active={false} />
      <span
        className="text-[14px] font-bold leading-[20px]"
        style={{ color: 'var(--primitive-blueblack)' }}
      >
        1
      </span>
      <QuantityControl type="plus" active={true} />
    </div>
  ),
}
