import type { Meta, StoryObj } from '@storybook/react'
import ChipMenu from './ChipMenu'

const meta: Meta<typeof ChipMenu> = {
  title: 'Components/ChipMenu',
  component: ChipMenu,
  parameters: { layout: 'fullscreen' },
  decorators: [
    (Story) => (
      <div style={{ width: 360, margin: '0 auto', paddingBlock: 16 }}>
        <Story />
      </div>
    ),
  ],
}
export default meta

type Story = StoryObj<typeof ChipMenu>

export const Default: Story = {}

export const TextOnly: Story = {
  args: {
    items: [
      { text: '오늘은 베라데이' },
      { text: '오늘 마감 공동구매' },
      { text: '여기서 최저가' },
    ],
  },
}
