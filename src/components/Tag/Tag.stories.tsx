import type { Meta, StoryObj } from '@storybook/react'
import Tag from './Tag'

const meta = {
  title: 'Atoms/Tag',
  component: Tag,
  tags: ['autodocs'],
  argTypes: {
    type: { control: 'radio', options: ['Point', 'Basic', 'Benefit', 'OkiClub', 'Other', 'Type6'] },
    label: { control: 'text' },
    point: { control: 'text' },
    benefit: { control: 'text' },
  },
} satisfies Meta<typeof Tag>

export default meta
type Story = StoryObj<typeof meta>

export const Point: Story = {
  args: { type: 'Point', point: '540P 적립' },
}

export const Type6: Story = {
  args: { type: 'Type6', point: '540P 적립' },
}

export const Basic: Story = {
  args: { type: 'Basic', label: '태그명' },
}

export const Other: Story = {
  args: { type: 'Other', label: '태그명' },
}

export const Benefit: Story = {
  args: { type: 'Benefit', benefit: '쿠폰할인' },
}

export const OkiClub: Story = {
  args: { type: 'OkiClub' },
}

export const AllTags: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2 p-4 items-center">
      <Tag type="Point" point="540P 적립" />
      <Tag type="Type6" point="540P 적립" />
      <Tag type="Basic" label="무료배송" />
      <Tag type="Other" label="특가" />
      <Tag type="Benefit" benefit="쿠폰할인" />
      <Tag type="OkiClub" />
    </div>
  ),
}
