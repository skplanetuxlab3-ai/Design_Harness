import type { Meta, StoryObj } from '@storybook/react'
import CategoryFilter from './CategoryFilter'

const meta = {
  title: 'Navigation/CategoryFilter',
  component: CategoryFilter,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    backgrounds: { default: 'light' },
  },
  argTypes: {
    activeIndex: { control: { type: 'number', min: 0 } },
    showExpandBtn: { control: 'boolean' },
  },
  decorators: [
    (Story) => (
      <div style={{ width: '360px' }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof CategoryFilter>

export default meta
type Story = StoryObj<typeof meta>

const ITEMS = [
  { label: '인기', showFire: true },
  { label: '카페' },
  { label: '베이커리' },
  { label: '치킨' },
  { label: '피자·버거' },
  { label: '생활' },
  { label: '아이스크림' },
  { label: '편의점/마트' },
]

export const Default: Story = {
  args: {
    items: ITEMS,
    activeIndex: 0,
    showExpandBtn: true,
  },
}

export const CafeActive: Story = {
  name: '카페 탭 활성',
  args: {
    items: ITEMS,
    activeIndex: 1,
    showExpandBtn: true,
  },
}

export const NoExpandBtn: Story = {
  name: '펼치기 버튼 없음',
  args: {
    items: ITEMS,
    activeIndex: 0,
    showExpandBtn: false,
  },
}
