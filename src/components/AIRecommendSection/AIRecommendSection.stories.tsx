import type { Meta, StoryObj } from '@storybook/react'
import AIRecommendSection from './AIRecommendSection'
import type { RecommendItem } from './AIRecommendSection.types'

const meta: Meta<typeof AIRecommendSection> = {
  title: 'Screens/AIRecommendSection',
  component: AIRecommendSection,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'OCB 쇼핑탭 추천 홈 최상단에 노출되는 AI 개인화 추천 영역. 5개 카드를 좌우 스와이프로 탐색하며, 카드별 AI 추천 이유 문구를 제공한다.',
      },
    },
  },
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof AIRecommendSection>

export const Default: Story = {
  name: '기본 (5개 카드)',
}

export const FallbackEmpty: Story = {
  name: '추천 없음 (빈 상태)',
  args: {
    items: [],
  },
}

const SINGLE_ITEM: RecommendItem[] = [
  {
    id: 'demo',
    type: 'GifticonOffering',
    cardProps: {
      brand: 'CJ올리브영',
      title: '선크림 50+ PA++++ 3종',
      color: 'Pink',
      mdTag: '오늘특가',
    },
    reason: '오늘 특가로 41% 할인 중이에요',
  },
]

export const SingleCard: Story = {
  name: '단일 카드',
  args: {
    items: SINGLE_ITEM,
    title: '내가 찾던 혜택 상품 1개',
  },
}

export const WithCallbacks: Story = {
  name: '피드백 이벤트 확인 (Action)',
  args: {
    onCardClick: (item, rank) => console.log('[클릭]', rank, item.id),
    onDismiss:   (item, rank) => console.log('[관심없음]', rank, item.id),
    onSimilar:   (item, rank) => console.log('[비슷한혜택]', rank, item.id),
  },
}
