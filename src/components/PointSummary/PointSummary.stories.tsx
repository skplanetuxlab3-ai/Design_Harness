import type { Meta, StoryObj } from '@storybook/react'
import PointSummary from './PointSummary'

const meta: Meta<typeof PointSummary> = {
  title: '적립쇼핑/PointSummary',
  component: PointSummary,
  parameters: { layout: 'fullscreen' },
  decorators: [(S) => <div className="w-[var(--frame-mobile-w)] bg-[var(--primitive-white)]"><S /></div>],
}
export default meta
type Story = StoryObj<typeof PointSummary>

export const 기본: Story = {}
export const 적립예정없음: Story = { args: { pendingPoint: undefined } }
export const 큰금액: Story = { args: { point: '1,204,600P', pendingPoint: '+128,020P' } }
