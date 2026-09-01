import type { Meta, StoryObj } from '@storybook/react'
import BrandShortcutList from './BrandShortcutList'

const meta: Meta<typeof BrandShortcutList> = {
  title: '적립쇼핑/BrandShortcutList',
  component: BrandShortcutList,
  parameters: { layout: 'fullscreen' },
  decorators: [(S) => <div className="w-[var(--frame-mobile-w)] bg-[var(--primitive-white)] py-[var(--products-spacing-16)]"><S /></div>],
}
export default meta
type Story = StoryObj<typeof BrandShortcutList>

/** Figma 기본 — 5개씩 2컬럼, 가로 스크롤 */
export const 기본: Story = {}
export const 한컬럼: Story = { args: { items: undefined, perColumn: 10 } }
export const 소수: Story = {
  args: { items: [{ brand: '11번가', benefit: '최대 2% 적립 + 스탬프', showNew: true }] },
}
