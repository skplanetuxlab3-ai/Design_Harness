import type { Meta, StoryObj } from '@storybook/react'
import ProductCard from './ProductCard'
import type { GifticonOfferingColor } from './ProductCard.types'

const SAMPLE_IMG = 'https://placehold.co/162x162/cccccc/888888?text=IMG'
const SAMPLE_TALL_IMG = 'https://placehold.co/162x230/cccccc/888888?text=IMG'
const SAMPLE_BANNER_IMG = 'https://placehold.co/120x120/cccccc/888888?text=IMG'
const SAMPLE_BG_IMG = 'https://placehold.co/162x250/333333/ffffff?text=BG'

const meta = {
  title: 'Molecules/ProductCard',
  component: ProductCard,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    backgrounds: { default: 'light' },
  },
  argTypes: {
    type: {
      control: 'select',
      options: [
        'Gifticon', 'Outbound', 'DiscountDeal', 'DiscountDeal_Soldout',
        'HotDeal', 'HotDeal_Soldout', 'Movie', 'ListRanking',
        'GifticonOffering', 'Banner', 'Upcoming',
      ],
    },
    color: {
      control: 'select',
      options: ['Blue', 'Pink', 'Mint', 'Purple', 'Orange', 'LightPink', 'Green', 'Grey', 'Yellow', 'SkyBlue'],
    },
    filmRating: { control: 'radio', options: ['All', '12', '15', '19'] },
    showDiscount: { control: 'boolean' },
    showBadge:    { control: 'boolean' },
    showJoining:  { control: 'boolean' },
    showRating:   { control: 'boolean' },
    showTag:      { control: 'boolean' },
  },
  decorators: [
    (Story) => (
      <div style={{ width: '162px' }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof ProductCard>

export default meta
type Story = StoryObj<typeof meta>

// ─── 1. Gifticon ─────────────────────────────────────────────────────────────

export const Gifticon: Story = {
  args: {
    type: 'Gifticon',
    imageUrl: SAMPLE_IMG,
    brand: '스타벅스',
    title: '아이스 아메리카노 Tall',
    showDiscount: true,
    discount: '30%',
    price: '3,900원',
    showBadge: false,
  },
}

export const GifticonWithBadge: Story = {
  name: 'Gifticon — Badge',
  args: {
    ...Gifticon.args,
    showBadge: true,
    badgeLabel: 'OCB 전용',
  },
}

export const GifticonSoldout: Story = {
  name: 'Gifticon — Sold Out',
  args: {
    ...Gifticon.args,
    soldout: true,
  },
}

// ─── 2. Outbound ─────────────────────────────────────────────────────────────

export const Outbound: Story = {
  args: {
    type: 'Outbound',
    imageUrl: SAMPLE_IMG,
    title: '신세계 상품권 1만원권',
    showDiscount: true,
    discount: '10%',
    price: '9,000원',
    showRating: true,
    rating: '4.7',
    reviewCount: '387',
    showTag: true,
    pointLabel: '540P 적립',
  },
}

export const OutboundNoTag: Story = {
  name: 'Outbound — 태그 없음',
  args: {
    ...Outbound.args,
    showTag: false,
  },
}

// ─── 3. DiscountDeal ─────────────────────────────────────────────────────────

export const DiscountDeal: Story = {
  args: {
    type: 'DiscountDeal',
    imageUrl: SAMPLE_BG_IMG,
    title: '다음 치킨 타임은\n60계 치킨으로',
    discount: '40%',
    price: '22,200원',
    timer: '23:59:59',
    showJoining: false,
  },
}

export const DiscountDealJoining: Story = {
  name: 'DiscountDeal — 참여중',
  args: {
    ...DiscountDeal.args,
    showJoining: true,
  },
}

export const DiscountDealSoldout: Story = {
  name: 'DiscountDeal — Sold Out',
  args: {
    ...DiscountDeal.args,
    type: 'DiscountDeal_Soldout',
    timer: '00:00:00',
  },
}

// ─── 4. HotDeal ──────────────────────────────────────────────────────────────

export const HotDeal: Story = {
  args: {
    type: 'HotDeal',
    imageUrl: SAMPLE_BG_IMG,
    title: '설날 선물의 기본템\n신세계 상품권 1만원권',
    discount: '10%',
    price: '9,000원',
    daysLeft: '3일 남음',
    showJoining: false,
  },
}

export const HotDealSoldout: Story = {
  name: 'HotDeal — Sold Out',
  args: {
    ...HotDeal.args,
    type: 'HotDeal_Soldout',
  },
}

// ─── 5. Movie ────────────────────────────────────────────────────────────────

export const Movie: Story = {
  args: {
    type: 'Movie',
    imageUrl: SAMPLE_TALL_IMG,
    brand: '하얼빈',
    filmRating: '15',
    eggRating: '97%',
    bookingRate: '예매율 53.95%',
    rank: '1',
  },
}

export const MovieRating12: Story = {
  name: 'Movie — 12세 관람가',
  args: {
    ...Movie.args,
    brand: '어벤져스',
    filmRating: '12',
    rank: '2',
  },
}

// ─── 6. ListRanking ──────────────────────────────────────────────────────────

export const ListRanking: Story = {
  args: {
    type: 'ListRanking',
    listTitle: 'TOP 기프티콘',
    items: [
      { imageUrl: '', name: '베스킨라빈스' },
      { imageUrl: '', name: '동원참치 3호' },
      { imageUrl: '', name: '아기 빨래 세제' },
      { imageUrl: '', name: '여성용 홈웨어' },
    ],
  },
}

// ─── 7. GifticonOffering — 10 colors ─────────────────────────────────────────

const OFFERING_COLORS: GifticonOfferingColor[] = [
  'Blue', 'Pink', 'Mint', 'Purple', 'Orange',
  'LightPink', 'Green', 'Grey', 'Yellow', 'SkyBlue',
]

export const GifticonOfferingBlue: Story = {
  name: 'GifticonOffering — Blue',
  args: {
    type: 'GifticonOffering',
    imageUrl: SAMPLE_IMG,
    brand: '스타벅스',
    title: '스타벅스 아메리카노 Tall 사이즈',
    mdTag: 'MD 추천',
    color: 'Blue',
  },
}

export const GifticonOfferingAllColors: Story = {
  name: 'GifticonOffering — 10 Colors',
  render: () => (
    <div className="grid grid-cols-2 gap-[8px]" style={{ width: '340px' }}>
      {OFFERING_COLORS.map((color) => (
        <ProductCard
          key={color}
          type="GifticonOffering"
          imageUrl={SAMPLE_IMG}
          brand="스타벅스"
          title="스타벅스 아메리카노 Tall 사이즈"
          mdTag={color}
          color={color}
        />
      ))}
    </div>
  ),
  decorators: [(Story) => <Story />],
}

// ─── 8. Banner ───────────────────────────────────────────────────────────────

export const Banner: Story = {
  args: {
    type: 'Banner',
    imageUrl: SAMPLE_BANNER_IMG,
    bannerSubtitle: '최대 30%',
    bannerTitleImage: undefined,
    bannerTag: '바로가기',
  },
}

// ─── 9. Upcoming ─────────────────────────────────────────────────────────────

export const Upcoming: Story = {
  args: {
    type: 'Upcoming',
    imageUrl: SAMPLE_BG_IMG,
    countdown: 'D-3',
    openDate: '2월 13일',
    openTime: '12:00',
    title: '설 명절 기획전 OPEN',
  },
}

// ─── All Variants Grid ────────────────────────────────────────────────────────

export const AllVariants: Story = {
  name: '전체 변형 그리드',
  render: () => (
    <div className="grid gap-[24px]" style={{ width: '360px', gridTemplateColumns: 'repeat(2, 162px)' }}>
      <div><p className="text-[10px] mb-[4px] opacity-50">Gifticon</p><ProductCard type="Gifticon" imageUrl={SAMPLE_IMG} brand="스타벅스" title="아이스 아메리카노 Tall" showDiscount discount="30%" price="3,900원" /></div>
      <div><p className="text-[10px] mb-[4px] opacity-50">Outbound</p><ProductCard type="Outbound" imageUrl={SAMPLE_IMG} title="신세계 상품권 1만원" showDiscount discount="10%" price="9,000원" showRating rating="4.7" reviewCount="387" showTag pointLabel="540P 적립" /></div>
      <div><p className="text-[10px] mb-[4px] opacity-50">DiscountDeal</p><ProductCard type="DiscountDeal" imageUrl={SAMPLE_BG_IMG} title={'치킨 타임은\n60계로'} discount="40%" price="22,200원" timer="23:59:59" /></div>
      <div><p className="text-[10px] mb-[4px] opacity-50">DiscountDeal Soldout</p><ProductCard type="DiscountDeal_Soldout" imageUrl={SAMPLE_BG_IMG} title={'치킨 타임은\n60계로'} timer="00:00:00" /></div>
      <div><p className="text-[10px] mb-[4px] opacity-50">HotDeal</p><ProductCard type="HotDeal" imageUrl={SAMPLE_BG_IMG} title={'신세계 상품권\n1만원권'} discount="10%" price="9,000원" daysLeft="3일 남음" /></div>
      <div><p className="text-[10px] mb-[4px] opacity-50">HotDeal Soldout</p><ProductCard type="HotDeal_Soldout" imageUrl={SAMPLE_BG_IMG} title={'신세계 상품권\n1만원권'} daysLeft="3일 남음" /></div>
      <div><p className="text-[10px] mb-[4px] opacity-50">Movie</p><ProductCard type="Movie" imageUrl={SAMPLE_TALL_IMG} brand="하얼빈" filmRating="15" eggRating="97%" bookingRate="예매율 53.95%" rank="1" /></div>
      <div><p className="text-[10px] mb-[4px] opacity-50">GifticonOffering</p><ProductCard type="GifticonOffering" imageUrl={SAMPLE_IMG} brand="스타벅스" title="아메리카노 Tall" mdTag="MD 추천" color="Blue" /></div>
      <div style={{ gridColumn: 'span 2' }}><p className="text-[10px] mb-[4px] opacity-50">ListRanking</p><ProductCard type="ListRanking" listTitle="TOP 기프티콘" items={[{ imageUrl: '', name: '베스킨라빈스' }, { imageUrl: '', name: '동원참치' }, { imageUrl: '', name: '아기 빨래세제' }, { imageUrl: '', name: '여성 홈웨어' }]} /></div>
      <div><p className="text-[10px] mb-[4px] opacity-50">Banner</p><ProductCard type="Banner" imageUrl={SAMPLE_BANNER_IMG} bannerSubtitle="최대 30%" bannerTag="바로가기" /></div>
      <div><p className="text-[10px] mb-[4px] opacity-50">Upcoming</p><ProductCard type="Upcoming" imageUrl={SAMPLE_BG_IMG} countdown="D-3" openDate="2월 13일" openTime="12:00" title="설 명절 기획전 OPEN" /></div>
    </div>
  ),
  decorators: [(Story) => <Story />],
}
