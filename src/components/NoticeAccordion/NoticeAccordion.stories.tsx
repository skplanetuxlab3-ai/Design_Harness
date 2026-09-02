import type { Meta, StoryObj } from '@storybook/react'
import NoticeAccordion from './NoticeAccordion'

const ITEMS = [
  'G마켓으로 이동 후 1시간 이내에 결제하면 쇼핑 스탬프를 받을 수 있습니다.',
  '스탬프는 결제 완료 후 최대 7일 이내에 적립됩니다.',
  '취소·반품된 주문은 스탬프가 회수됩니다.',
]

const meta: Meta<typeof NoticeAccordion> = {
  title: '적립쇼핑/NoticeAccordion',
  component: NoticeAccordion,
  parameters: { layout: 'fullscreen' },
  decorators: [(S) => <div className="w-[var(--frame-mobile-w)] bg-[var(--semantic-background-elevated)] p-[var(--products-spacing-20)]"><S /></div>],
}
export default meta
type Story = StoryObj<typeof NoticeAccordion>

export const 펼침: Story = { args: { title: '쇼핑 스탬프 발급 관련 유의사항', items: ITEMS } }
export const 접힘: Story = { args: { title: '쇼핑 스탬프 발급 관련 유의사항', items: ITEMS, defaultOpen: false } }
