import type { Meta, StoryObj } from '@storybook/react'
import BottomNavBar, { DEFAULT_BOTTOM_NAV_ITEMS } from './BottomNavBar'

const meta = {
  title: 'Navigation/BottomNavBar',
  component: BottomNavBar,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    backgrounds: { default: 'light' },
  },
  argTypes: {
    activeIndex: {
      control: { type: 'number', min: 0, max: 4 },
      description: '0=적립 / 1=사용 / 2=홈 / 3=쇼핑 / 4=메뉴',
    },
  },
  decorators: [
    (Story) => (
      <div style={{ width: '360px' }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof BottomNavBar>

export default meta
type Story = StoryObj<typeof meta>

export const Shopping: Story = {
  name: '쇼핑 탭 활성',
  args: {
    items: DEFAULT_BOTTOM_NAV_ITEMS,
    activeIndex: 3,
  },
}

export const Home: Story = {
  name: '홈 탭 활성',
  args: {
    items: DEFAULT_BOTTOM_NAV_ITEMS,
    activeIndex: 2,
  },
}

export const Earn: Story = {
  name: '적립 탭 활성',
  args: {
    items: DEFAULT_BOTTOM_NAV_ITEMS,
    activeIndex: 0,
  },
}

export const AllVariants: Story = {
  name: '전체 탭 순서 확인',
  render: () => (
    <div className="flex flex-col gap-[24px]" style={{ width: '360px' }}>
      {DEFAULT_BOTTOM_NAV_ITEMS.map((_, i) => (
        <div key={i}>
          <p className="text-[10px] mb-[4px] opacity-50">{DEFAULT_BOTTOM_NAV_ITEMS[i].label} 탭 활성</p>
          <BottomNavBar items={DEFAULT_BOTTOM_NAV_ITEMS} activeIndex={i} />
        </div>
      ))}
    </div>
  ),
  decorators: [(Story) => <Story />],
}
