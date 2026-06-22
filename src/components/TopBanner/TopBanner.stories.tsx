import type { Meta, StoryObj } from '@storybook/react'
import TopBanner from './TopBanner'

const meta: Meta<typeof TopBanner> = {
  title: 'Components/TopBanner',
  component: TopBanner,
  parameters: { layout: 'fullscreen' },
  decorators: [
    (Story) => (
      <div style={{ width: 360, margin: '0 auto' }}>
        <Story />
      </div>
    ),
  ],
}
export default meta

type Story = StoryObj<typeof TopBanner>

export const Default: Story = {
  args: {
    title: '영화 할인,\n따로 찾지 마세요',
    buttonLabel: '영화 예매하기',
    total: 3,
    activeIndex: 0,
  },
}

export const SecondPage: Story = {
  args: { total: 3, activeIndex: 1 },
}

export const SingleNoDots: Story = {
  args: { total: 1 },
}

export const MaxFourDots: Story = {
  args: { total: 4, activeIndex: 2 },
}
