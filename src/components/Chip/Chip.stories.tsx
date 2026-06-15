import type { Meta, StoryObj } from '@storybook/react'
import Chip from './Chip'

const meta = {
  title: 'Atoms/Chip',
  component: Chip,
  tags: ['autodocs'],
  argTypes: {
    active: { control: 'boolean' },
    showIcon: { control: 'boolean' },
    label: { control: 'text' },
  },
} satisfies Meta<typeof Chip>

export default meta
type Story = StoryObj<typeof meta>

export const ActiveWithoutIcon: Story = {
  args: { active: true, showIcon: false, label: '메뉴명' },
}

export const ActiveWithIcon: Story = {
  args: { active: true, showIcon: true, label: '인기' },
}

export const Inactive: Story = {
  args: { active: false, label: '메뉴명' },
}

export const ChipRow: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2 p-4">
      <Chip active={true} showIcon={true} label="인기" />
      <Chip active={false} label="신규" />
      <Chip active={false} label="할인" />
      <Chip active={false} label="오키클럽" />
    </div>
  ),
}
