import type { Meta, StoryObj } from '@storybook/react'
import BrandsFilter from './BrandsFilter'

const meta = {
  title: 'Navigation/BrandsFilter',
  component: BrandsFilter,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    backgrounds: { default: 'light' },
  },
  argTypes: {
    variant: { control: 'radio', options: ['Default', 'Scroll'] },
    activeIndex: { control: { type: 'number', min: 0 } },
  },
  decorators: [
    (Story) => (
      <div style={{ width: '360px' }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof BrandsFilter>

export default meta
type Story = StoryObj<typeof meta>

const BRANDS = [
  { label: '메가커피', imageUrl: '' },
  { label: '스타벅스', imageUrl: '' },
  { label: '컴포즈커피', imageUrl: '' },
  { label: '이디야', imageUrl: '' },
  { label: '파스쿠치', imageUrl: '' },
  { label: '할리스', imageUrl: '' },
  { label: '투썸플레이스', imageUrl: '' },
  { label: '폴바셋', imageUrl: '' },
]

export const DefaultVariant: Story = {
  name: 'Default (원형 로고)',
  args: {
    variant: 'Default',
    brands: BRANDS,
    activeIndex: 0,
  },
}

export const DefaultSecondActive: Story = {
  name: 'Default — 스타벅스 활성',
  args: {
    variant: 'Default',
    brands: BRANDS,
    activeIndex: 1,
  },
}

export const ScrollVariant: Story = {
  name: 'Scroll (텍스트 탭)',
  args: {
    variant: 'Scroll',
    brands: BRANDS,
    activeIndex: 0,
  },
}

export const ScrollSecondActive: Story = {
  name: 'Scroll — 스타벅스 활성',
  args: {
    variant: 'Scroll',
    brands: BRANDS,
    activeIndex: 1,
  },
}
