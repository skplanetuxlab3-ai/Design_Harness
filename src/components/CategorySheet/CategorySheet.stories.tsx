import type { Meta, StoryObj } from '@storybook/react'
import CategorySheet from './CategorySheet'

const meta = {
  title: 'Components/CategorySheet',
  component: CategorySheet,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    backgrounds: { default: 'light' },
  },
  argTypes: {
    open: { control: 'boolean' },
    activeIndex: { control: 'number' },
  },
  // 바텀시트는 absolute inset-0 이라 위치 기준이 될 컨테이너가 필요하다
  decorators: [
    (Story) => (
      <div style={{ position: 'relative', width: 360, height: 640, background: 'var(--primitive-black-900)' }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof CategorySheet>

export default meta
type Story = StoryObj<typeof meta>

/** 기본 — 첫 카테고리 선택 */
export const Default: Story = {
  args: { open: true },
}

/** 다른 카테고리 선택 상태 */
export const SecondCategory: Story = {
  name: '두 번째 카테고리 선택',
  args: { open: true, activeIndex: 1 },
}

/** 닫힌 상태 — 아무것도 렌더하지 않는다 */
export const Closed: Story = {
  name: '닫힘',
  args: { open: false },
}

/** 커스텀 그룹 */
export const CustomGroups: Story = {
  name: '커스텀 그룹',
  args: {
    open: true,
    groups: [
      { name: '커피', brands: ['스타벅스', '메가커피', '컴포즈커피', '이디야'] },
      { name: '베이커리', brands: ['파리바게뜨', '뚜레쥬르'] },
    ],
  },
}
