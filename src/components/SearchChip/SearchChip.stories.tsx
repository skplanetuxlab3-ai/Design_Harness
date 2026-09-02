import type { Meta, StoryObj } from '@storybook/react'
import SearchChip from './SearchChip'

const meta: Meta<typeof SearchChip> = {
  title: '적립쇼핑/SearchChip',
  component: SearchChip,
  parameters: { layout: 'centered' },
}
export default meta
type Story = StoryObj<typeof SearchChip>

/** 최근 검색어 — 삭제 버튼 포함 */
export const 최근: Story = { args: { label: '두피마사지기', variant: 'recent', onRemove: () => {} } }
/** 삭제 없이 */
export const 최근_삭제없음: Story = { args: { label: '티슈', variant: 'recent' } }
/** 추천 검색어 */
export const 추천: Story = { args: { label: '아이폰 케이스', variant: 'recommended' } }

export const 나란히: Story = {
  render: () => (
    <div className="flex flex-wrap gap-[var(--search-chips-col-gap)]">
      <SearchChip label="티슈" onRemove={() => {}} />
      <SearchChip label="손선풍기" onRemove={() => {}} />
      <SearchChip label="야광팔찌" variant="recommended" />
      <SearchChip label="텀블러" variant="recommended" />
    </div>
  ),
}
