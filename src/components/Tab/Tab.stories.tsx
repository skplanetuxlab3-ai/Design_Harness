import type { Meta, StoryObj } from '@storybook/react'
import Tab from './Tab'

const meta = {
  title: 'Atoms/Tab',
  component: Tab,
  tags: ['autodocs'],
  parameters: {
    backgrounds: {
      default: 'dark',
      values: [
        { name: 'dark', value: '#181818' },
        { name: 'light', value: '#fafafa' },
      ],
    },
  },
  argTypes: {
    type: { control: 'radio', options: ['Basic', 'Icon'] },
    active: { control: 'boolean' },
    showDot: { control: 'boolean' },
    showSubLabel: { control: 'boolean' },
    label: { control: 'text' },
    sublabel: { control: 'text' },
  },
} satisfies Meta<typeof Tab>

export default meta
type Story = StoryObj<typeof meta>

export const BasicActive: Story = {
  args: { type: 'Basic', active: true, label: '메뉴명' },
}

export const BasicInactive: Story = {
  args: { type: 'Basic', active: false, label: '메뉴명' },
}

export const BasicWithDot: Story = {
  args: { type: 'Basic', active: true, label: '메뉴명', showDot: true },
}

export const BasicWithSubLabel: Story = {
  args: { type: 'Basic', active: true, label: '메뉴명', showSubLabel: true, sublabel: '서브문구' },
}

export const IconActive: Story = {
  args: { type: 'Icon', active: true, label: '이동하기' },
}

export const IconInactive: Story = {
  args: { type: 'Icon', active: false, label: '이동하기' },
}

export const TabRow: Story = {
  render: () => (
    <div
      className="flex gap-6 px-4"
      style={{ background: 'var(--primitive-sp-black)', padding: '8px 16px' }}
    >
      <Tab active={true} label="홈" />
      <Tab active={false} label="쇼핑" />
      <Tab active={false} label="라이브" showDot={true} />
      <Tab type="Icon" active={false} label="더보기" />
    </div>
  ),
}
