import type { Meta, StoryObj } from '@storybook/react'
import SearchResultItem from './SearchResultItem'

const meta: Meta<typeof SearchResultItem> = {
  title: '적립쇼핑/SearchResultItem',
  component: SearchResultItem,
  parameters: { layout: 'centered' },
  // Figma 162px = (360 − 14×2 − 8) ÷ 2 — 2열 그리드의 한 칸. 고정값이 아니라 유도값이다.
  decorators: [
    (S) => (
      <div style={{ width: 'calc((var(--frame-mobile-w) - 2 * var(--plist-px) - var(--plist-gutter)) / 2)' }}>
        <S />
      </div>
    ),
  ],
}
export default meta
type Story = StoryObj<typeof SearchResultItem>

/** Figma 기본 — 포인트 배지 + 스탬프 문구 */
export const 기본: Story = {
  args: {
    brand: '쿠팡',
    title: '카페 아메리카노 T+탕종 파마산 치즈 베이글',
    discount: '20%',
    price: '38,200원',
    point: '1P',
    stampLabel: '최대 스탬프 2개',
  },
}
export const 배지없음: Story = {
  args: { brand: 'G마켓', title: '무선 핸디 선풍기 3단 풍속', discount: '15%', price: '12,900원' },
}
export const 할인없음: Story = {
  args: { brand: 'SSG', title: '유기농 아기 기저귀 대형 4팩', price: '45,900원', point: '12P' },
}
