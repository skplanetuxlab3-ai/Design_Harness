import type { Meta, StoryObj } from '@storybook/react'
import SearchSuggestList from './SearchSuggestList'

const meta: Meta<typeof SearchSuggestList> = {
  title: '적립쇼핑/SearchSuggestList',
  component: SearchSuggestList,
  parameters: { layout: 'fullscreen' },
  decorators: [(S) => <div className="w-[var(--frame-mobile-w)] bg-[var(--primitive-white)]"><S /></div>],
}
export default meta
type Story = StoryObj<typeof SearchSuggestList>

export const 기본: Story = {}
export const 다른검색어: Story = {
  args: { query: '가습', items: ['가습기', '가습기 필터', '가습기 세정제', '가습성능'] },
}
/** 접두어가 안 맞으면 강조 없이 그대로 */
export const 강조없음: Story = { args: { query: 'zzz' } }
