import type { Meta, StoryObj } from '@storybook/react'
import BridgeCta from './BridgeCta'

const meta: Meta<typeof BridgeCta> = {
  title: '적립쇼핑/BridgeCta',
  component: BridgeCta,
  parameters: { layout: 'fullscreen' },
  decorators: [(S) => <div className="w-[var(--frame-mobile-w)]"><S /></div>],
}
export default meta
type Story = StoryObj<typeof BridgeCta>

export const 기본: Story = { args: { label: 'G마켓 인기상품 보러가기' } }
export const 툴팁: Story = { args: { label: 'G마켓 인기상품 보러가기', tooltip: '즐겨찾기 등록할까요?' } }
export const 즐겨찾기됨: Story = { args: { label: 'G마켓 인기상품 보러가기', favorite: true } }
export const 안내없음: Story = { args: { label: '쇼핑몰 바로가기', notice: undefined } }
