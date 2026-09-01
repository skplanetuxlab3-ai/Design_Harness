import type { Meta, StoryObj } from '@storybook/react'
import NotificationSetting from './NotificationSetting'

const meta: Meta<typeof NotificationSetting> = {
  title: '적립쇼핑/NotificationSetting',
  component: NotificationSetting,
  parameters: { layout: 'fullscreen' },
  decorators: [(S) => <div className="w-[var(--frame-mobile-w)] bg-[var(--primitive-white)] p-[var(--products-spacing-14)]"><S /></div>],
}
export default meta
type Story = StoryObj<typeof NotificationSetting>

/** 적립쇼핑 */
export const 기본: Story = {}

/** 켜진 상태 — 트랙이 filled/primary 로 바뀐다 */
export const 켜짐: Story = { args: { defaultChecked: true } }

/** 공동구매 — 두 줄 문구 */
export const 공동구매: Story = {
  args: {
    message: <>공동구매 혜택과<br />이벤트가 있을 때 알려드려요</>,
    switchLabel: '공동구매 알림 받기',
  },
}
