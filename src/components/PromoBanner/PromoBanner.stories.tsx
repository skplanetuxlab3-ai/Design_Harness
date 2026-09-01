import type { Meta, StoryObj } from '@storybook/react'
import PromoBanner from './PromoBanner'

const meta: Meta<typeof PromoBanner> = {
  title: '적립쇼핑/PromoBanner',
  component: PromoBanner,
  parameters: { layout: 'fullscreen' },
  decorators: [(S) => <div className="w-[var(--frame-mobile-w)] bg-[var(--primitive-black-900)]"><S /></div>],
}
export default meta
type Story = StoryObj<typeof PromoBanner>

export const 기본: Story = {}
export const 닫기없음: Story = { args: { dismissible: false } }
export const 긴문구: Story = {
  args: { title: '적립캐치 알림 켜고 매달 최대 5,000P 받아가세요' },
}
