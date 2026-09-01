import type { Meta, StoryObj } from '@storybook/react'
import SectionTitle from './SectionTitle'

const meta: Meta<typeof SectionTitle> = {
  title: '적립쇼핑/SectionTitle',
  component: SectionTitle,
  parameters: { layout: 'fullscreen' },
  decorators: [(S) => <div className="w-[var(--frame-mobile-w)] bg-[var(--primitive-white)]"><S /></div>],
}
export default meta
type Story = StoryObj<typeof SectionTitle>

export const 기본: Story = { args: { title: '쇼핑몰 바로가기' } }
export const 전체보기: Story = { args: { title: '보너스 적립쇼핑', viewAllLabel: '전체보기' } }
export const 긴제목: Story = {
  args: { title: '아주 긴 섹션 제목이 들어가면 말줄임으로 처리된다' },
}
