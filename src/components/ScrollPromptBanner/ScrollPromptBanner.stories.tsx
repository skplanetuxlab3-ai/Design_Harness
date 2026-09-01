import type { Meta, StoryObj } from '@storybook/react'
import ScrollPromptBanner from './ScrollPromptBanner'

const meta: Meta<typeof ScrollPromptBanner> = {
  title: '적립쇼핑/ScrollPromptBanner',
  component: ScrollPromptBanner,
  parameters: { layout: 'centered' },
}
export default meta
type Story = StoryObj<typeof ScrollPromptBanner>

export const 기본: Story = {}
export const 다른문구: Story = { args: { label: '오늘의 추천 상품 보기' } }
