import type { Meta, StoryObj } from '@storybook/react'
import TopNavBar from './TopNavBar'

const meta = {
  title: 'Navigation/TopNavBar',
  component: TopNavBar,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    backgrounds: { default: 'dark' },
  },
  argTypes: {
    variant: { control: 'radio', options: ['Default', 'Scroll'] },
    activeIndex: { control: { type: 'number', min: 0, max: 4 } },
  },
  decorators: [
    (Story) => (
      <div style={{ width: '360px' }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof TopNavBar>

export default meta
type Story = StoryObj<typeof meta>

const SAMPLE_TABS = [
  { label: '추천' },
  { label: '기프티콘' },
  { label: '오늘특가' },
  { label: '공동구매' },
  { label: '더보기' },
]

export const Default: Story = {
  args: {
    variant: 'Default',
    title: '쇼핑',
    tabs: SAMPLE_TABS,
    activeIndex: 0,
  },
}

export const ScrollVariant: Story = {
  name: 'Scroll (탭바만)',
  args: {
    variant: 'Scroll',
    tabs: SAMPLE_TABS,
    activeIndex: 1,
  },
}

export const ActiveSecondTab: Story = {
  name: 'Default — 기프티콘 탭 활성',
  args: {
    variant: 'Default',
    title: '쇼핑',
    tabs: SAMPLE_TABS,
    activeIndex: 1,
  },
}

export const ActiveThirdTab: Story = {
  name: 'Default — 오늘특가 탭 활성',
  args: {
    variant: 'Default',
    title: '쇼핑',
    tabs: SAMPLE_TABS,
    activeIndex: 2,
  },
}
