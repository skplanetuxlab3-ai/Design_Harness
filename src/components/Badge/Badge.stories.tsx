import type { Meta, StoryObj } from '@storybook/react'
import Badge from './Badge'

const meta = {
  title: 'Atoms/Badge',
  component: Badge,
  tags: ['autodocs'],
  argTypes: {
    type: { control: 'radio', options: ['Timer', 'New', 'First', 'Ranking', 'OkiClub', 'Primary'] },
    size: { control: 'radio', options: ['feed', 'detail'] },
    label: { control: 'text' },
    time: { control: 'text' },
    rank: { control: 'text' },
  },
} satisfies Meta<typeof Badge>

export default meta
type Story = StoryObj<typeof meta>

export const TimerFeed: Story = {
  args: { type: 'Timer', size: 'feed', time: '12:23:22' },
}

export const TimerDetail: Story = {
  args: { type: 'Timer', size: 'detail', time: '12:23:22' },
}

export const NewFeed: Story = {
  args: { type: 'New', size: 'feed', label: 'NEW' },
}

export const NewDetail: Story = {
  args: { type: 'New', size: 'detail', label: 'NEW' },
}

export const FirstFeed: Story = {
  args: { type: 'First', size: 'feed', label: '최저가' },
}

export const RankingFeed: Story = {
  args: { type: 'Ranking', size: 'feed', rank: '1' },
}

export const RankingDetail: Story = {
  args: { type: 'Ranking', size: 'detail', rank: '1' },
}

export const PrimaryFeed: Story = {
  args: { type: 'Primary', size: 'feed' },
}

export const PrimaryDetail: Story = {
  args: { type: 'Primary', size: 'detail' },
}

export const OkiClubFeed: Story = {
  args: { type: 'OkiClub', size: 'feed' },
}

export const OkiClubDetail: Story = {
  args: { type: 'OkiClub', size: 'detail' },
}

export const AllBadgesFeed: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2 p-4 items-start">
      <Badge type="Timer" size="feed" time="12:23:22" />
      <Badge type="New" size="feed" />
      <Badge type="First" size="feed" />
      <Badge type="Ranking" size="feed" rank="1" />
      <Badge type="OkiClub" size="feed" />
      <Badge type="Primary" size="feed" />
    </div>
  ),
}

export const AllBadgesDetail: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2 p-4 items-start">
      <Badge type="Timer" size="detail" time="12:23:22" />
      <Badge type="New" size="detail" />
      <Badge type="First" size="detail" />
      <Badge type="Ranking" size="detail" rank="1" />
      <Badge type="OkiClub" size="detail" />
      <Badge type="Primary" size="detail" />
    </div>
  ),
}
