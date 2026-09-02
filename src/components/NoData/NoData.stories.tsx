import type { Meta, StoryObj } from '@storybook/react'
import NoData from './NoData'

const meta: Meta<typeof NoData> = {
  title: '적립쇼핑/NoData',
  component: NoData,
  parameters: { layout: 'fullscreen' },
  decorators: [(S) => <div className="w-[var(--frame-mobile-w)] bg-[var(--primitive-white)]"><S /></div>],
}
export default meta
type Story = StoryObj<typeof NoData>

export const 검색결과없음: Story = {}
export const 한줄: Story = { args: { lines: ['표시할 내용이 없어요.'] } }
