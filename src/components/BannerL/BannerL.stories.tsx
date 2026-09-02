import type { Meta, StoryObj } from '@storybook/react'
import BannerL from './BannerL'

const meta: Meta<typeof BannerL> = {
  title: '적립쇼핑/BannerL',
  component: BannerL,
  parameters: { layout: 'fullscreen' },
  decorators: [(S) => <div className="w-[var(--frame-mobile-w)] bg-[var(--primitive-white)] p-[var(--products-spacing-14)]"><S /></div>],
}
export default meta
type Story = StoryObj<typeof BannerL>

/** Figma 기본 */
export const 기본: Story = {
  args: {
    eyebrow: '쇼핑 스탬프',
    title: <>축하합니다!<br />스탬프 7개가 도착했어요</>,
    ctaLabel: '스탬프 7개 받기',
  },
}
export const 일러스트없음: Story = {
  args: { eyebrow: '쿠팡 스탬프', title: <>스탬프판을 완성했어요</>, ctaLabel: '선물 뽑으러 가기', hideArt: true },
}
export const 닫기없음: Story = {
  args: { title: <>축하합니다!<br />스탬프 7개가 도착했어요</>, ctaLabel: '스탬프 7개 받기', dismissible: false },
}
