import type { Meta, StoryObj } from '@storybook/react'
import SearchInput from './SearchInput'

const meta: Meta<typeof SearchInput> = {
  title: '적립쇼핑/SearchInput',
  component: SearchInput,
  parameters: { layout: 'fullscreen' },
  decorators: [(S) => <div className="w-[var(--frame-mobile-w)] bg-[var(--primitive-white)] p-[var(--products-spacing-14)]"><S /></div>],
}
export default meta
type Story = StoryObj<typeof SearchInput>

/** 홈 (search_input) — 플레이스홀더 14/20 */
export const 플레이스홀더: Story = {}

/** 검색 화면 (search_bar) — 입력값 15/20 + 커서 + 지우기 */
export const 입력중: Story = {
  args: { value: '아이폰', showCaret: true, clearable: true, readOnlyDisplay: true },
}

export const 입력완료: Story = { args: { value: '아이폰케이스', clearable: true, readOnlyDisplay: true } }
