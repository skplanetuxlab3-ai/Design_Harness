import type { Meta, StoryObj } from '@storybook/react'
import Button from './Button'

const meta: Meta<typeof Button> = {
  title: '적립쇼핑/Button',
  component: Button,
  parameters: { layout: 'centered' },
  argTypes: {
    size: { control: 'inline-radio', options: ['sm', 'xs'] },
    tone: { control: 'inline-radio', options: ['primary', 'secondary', 'grey'] },
  },
}
export default meta
type Story = StoryObj<typeof Button>

/** 포인트 요약의 "내역" — sm / secondary */
export const 내역: Story = { args: { label: '내역', size: 'sm', tone: 'secondary' } }

/** 쇼핑 스탬프의 "보기" — xs / grey */
export const 보기: Story = { args: { label: '보기', size: 'xs', tone: 'grey' } }

/** 쿠팡 스탬프의 "뽑기" — xs / primary */
export const 뽑기: Story = { args: { label: '뽑기', size: 'xs', tone: 'primary' } }

export const 전체: Story = {
  render: () => (
    <div className="flex flex-col gap-[var(--products-spacing-16)] items-start">
      <div className="flex gap-[var(--products-spacing-08)] items-center">
        <Button label="내역" size="sm" tone="secondary" />
        <Button label="내역" size="sm" tone="primary" />
        <Button label="내역" size="sm" tone="grey" />
      </div>
      <div className="flex gap-[var(--products-spacing-08)] items-center">
        <Button label="보기" size="xs" tone="grey" />
        <Button label="뽑기" size="xs" tone="primary" />
        <Button label="보기" size="xs" tone="secondary" />
      </div>
    </div>
  ),
}
