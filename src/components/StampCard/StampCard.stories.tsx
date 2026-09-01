import type { Meta, StoryObj } from '@storybook/react'
import StampCard from './StampCard'

const meta: Meta<typeof StampCard> = {
  title: '적립쇼핑/StampCard',
  component: StampCard,
  parameters: { layout: 'fullscreen' },
  decorators: [(S) => <div className="w-[var(--frame-mobile-w)] bg-[var(--primitive-white)] pt-[var(--products-spacing-16)]"><S /></div>],
}
export default meta
type Story = StoryObj<typeof StampCard>

/** Figma 기본 — 쇼핑 2개 / 쿠팡 10개(8~11번 판, 마지막 칸 경품) */
export const 기본: Story = {}

export const 하나도_없을_때: Story = {
  args: {
    items: [
      { type: 'Shopping', title: '쇼핑 스탬프', count: 0, slots: 4, startAt: 1, actionLabel: '보기' },
      { type: 'Coupang', title: '쿠팡 스탬프', count: 0, slots: 4, startAt: 1, prizeAt: 10, actionLabel: '뽑기' },
    ],
  },
}

export const 판_완성: Story = {
  args: {
    items: [
      { type: 'Shopping', title: '쇼핑 스탬프', count: 4, slots: 4, startAt: 1, actionLabel: '보기' },
      { type: 'Coupang', title: '쿠팡 스탬프', count: 11, slots: 4, startAt: 8, prizeAt: 10, actionLabel: '뽑기' },
    ],
  },
}
