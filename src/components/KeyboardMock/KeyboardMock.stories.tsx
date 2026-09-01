import type { Meta, StoryObj } from '@storybook/react'
import KeyboardMock from './KeyboardMock'

const meta: Meta<typeof KeyboardMock> = {
  title: '적립쇼핑/KeyboardMock',
  component: KeyboardMock,
  parameters: { layout: 'fullscreen' },
  decorators: [(S) => <div className="w-[var(--frame-mobile-w)]"><S /></div>],
}
export default meta
type Story = StoryObj<typeof KeyboardMock>

/** OS 크롬 목업 — 디자인 시스템 요소가 아니다 */
export const 기본: Story = {}
