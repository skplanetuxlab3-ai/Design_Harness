import type { Meta, StoryObj } from '@storybook/react'
import AppBar from './AppBar'

const meta: Meta<typeof AppBar> = {
  title: '적립쇼핑/AppBar',
  component: AppBar,
  parameters: { layout: 'fullscreen' },
  decorators: [(S) => <div className="w-[var(--frame-mobile-w)]"><S /></div>],
}
export default meta
type Story = StoryObj<typeof AppBar>

/** 검색 화면 — 제목 없이 뒤로가기만 */
export const 검색화면: Story = {}
export const 제목있음: Story = { args: { title: '검색' } }
export const 다크: Story = { args: { title: '쇼핑', mode: 'dark' } }
export const 뒤로가기없음: Story = { args: { title: '검색', showBack: false } }
