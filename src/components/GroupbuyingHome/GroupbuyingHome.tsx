import { useState } from 'react'
import SocialDealCard from '../SocialDealCard'
import type { SocialDealCardProps } from '../SocialDealCard/SocialDealCard.types'

// ─── Figma CDN 에셋 (node 20341-19611, 7일 만료 — TODO: src/assets/ 로컬 교체) ───
const BANNER = {
  bill:    'https://www.figma.com/api/mcp/asset/640ddc1c-ee97-424d-bfa1-46c2f4000175',
  circle1: 'https://www.figma.com/api/mcp/asset/e7eb6568-9611-4abc-856a-7a0027f5de3f',
  base:    'https://www.figma.com/api/mcp/asset/a921e34e-3737-44e1-99cd-e8295ac32d40',
  circle2: 'https://www.figma.com/api/mcp/asset/6ed35c26-cbdf-401a-8a4a-7b9ee5e14495',
}
const DEAL_IMG = {
  shinsegae: 'https://www.figma.com/api/mcp/asset/e9d7993a-649c-41d4-a29b-8b670521f457',
  soldout:   'https://www.figma.com/api/mcp/asset/17f11d20-d5f4-4688-bdc8-511ba680bcb0',
  dongwon:   'https://www.figma.com/api/mcp/asset/80b50992-302b-47cb-b792-72d1a9ea742a',
  icecream:  'https://www.figma.com/api/mcp/asset/8236a58d-d57d-46b6-90dc-55672bd82267',
  starbucks: 'https://www.figma.com/api/mcp/asset/3da706ef-b4e7-48d1-abc4-c75295768b0e',
}
const COMINGSOON_IMG = 'https://www.figma.com/api/mcp/asset/63e56abd-29e1-4f69-b61f-181473165b37'

// ── 소셜딜 카드 데이터 ──────────────────────────────────────────
const DEALS: SocialDealCardProps[] = [
  { imageUrl: DEAL_IMG.shinsegae, title: '설날 선물의 기본템\n신세계 상품권 1만원권', discount: '3%', price: '9,700원', accent: 'yellow', badgeType: 'timer', badgeLabel: '88:88:88', joining: true },
  { imageUrl: DEAL_IMG.soldout, title: '일이삼사오육칠팔구십일이삼\n일이삼사오육칠팔구십일이삼', discount: '30%', price: '15,400원', accent: 'yellow', badgeType: 'timer', badgeLabel: '88:88:88', joining: true, soldout: true },
  { imageUrl: DEAL_IMG.dongwon, title: '동원참치캔 하나로 즐기는\n대한민국 건강 식단', discount: '40%', price: '14,100원', accent: 'yellow', badgeType: 'timer', badgeLabel: '88:88:88', joining: true },
  { imageUrl: DEAL_IMG.icecream, title: '아이스크림이 생각 날\n순간을 위해', discount: '30%', price: '12,500원', accent: 'pink', badgeType: 'days', badgeLabel: '3일 남음', joining: true },
  { imageUrl: DEAL_IMG.starbucks, title: '자주 가는 스타벅스\n더 합리적으로', discount: '15%', price: '3,990원', accent: 'pink', badgeType: 'days', badgeLabel: '3일 남음', joining: true },
]

const COMINGSOON = [
  { dday: 'D-3', date: '2월 13일', time: '12:00', name: '설날 선물의 기본템\n신세계 상품권 1만원권' },
  { dday: 'D-3', date: '2월 13일', time: '12:00', name: '60계치킨 치킨 세트' },
  { dday: 'D-3', date: '2월 13일', time: '12:00', name: '60계치킨 치킨 세트' },
]

// ── 공동구매 일러스트 배너 ──────────────────────────────────────
function GroupBuyingBanner() {
  return (
    <div
      className="relative overflow-hidden w-full"
      style={{ height: 'var(--gbuying-banner-h)', backgroundColor: 'var(--gbuying-banner-surface)' }}
    >
      <img src={BANNER.circle1} alt="" aria-hidden className="absolute pointer-events-none" style={{ left: '-59px', top: 'calc(50% + 42px)', width: '240px', height: '240px', transform: 'translateY(-50%)' }} />
      <img src={BANNER.base} alt="" aria-hidden className="absolute pointer-events-none object-cover" style={{ left: '50%', bottom: 0, width: '360px', height: '100px', transform: 'translateX(-50%)' }} />
      <img src={BANNER.bill} alt="" aria-hidden className="absolute pointer-events-none" style={{ left: '132px', top: '-30px', width: '195.827px', height: '161.896px' }} />
      <img src={BANNER.circle2} alt="" aria-hidden className="absolute pointer-events-none" style={{ left: '304px', top: 'calc(50% - 18px)', width: '92px', height: '92px', mixBlendMode: 'multiply', transform: 'translateY(-50%)' }} />
      <p
        className="absolute font-bold whitespace-nowrap"
        style={{ left: 'var(--gbuying-banner-pl)', top: '68px', fontSize: '36px', lineHeight: '20px', letterSpacing: '-0.5px', color: 'var(--gbuying-banner-title)' }}
      >
        가격이 내려가는
      </p>
      <p
        className="absolute font-bold whitespace-nowrap"
        style={{ left: '138px', top: '32px', fontSize: '14px', lineHeight: '20px', letterSpacing: '-0.5px', color: 'var(--gbuying-banner-subtitle)' }}
      >
        모이면 모일수록
      </p>
    </div>
  )
}

// ── comingsoon (오픈예정) 카드 ──────────────────────────────────
function ComingSoonCard({ item, center }: { item: typeof COMINGSOON[number]; center?: boolean }) {
  const nameLines = item.name.split('\n')
  return (
    <div
      className="relative shrink-0 overflow-clip border border-solid"
      style={{
        width: 'var(--socialdeal-card-small-w)',
        height: 'var(--socialdeal-card-small-h)',
        borderRadius: 'var(--radius-200)',
        borderColor: 'var(--socialdeal-upcoming-border)',
      }}
    >
      <img src={COMINGSOON_IMG} alt="" aria-hidden className="absolute inset-0 w-full h-full object-cover pointer-events-none" />
      <div
        className={`absolute inset-0 flex flex-col items-center text-center ${center ? 'justify-center' : ''}`}
        style={{
          backgroundColor: 'var(--socialdeal-upcoming-overlay)',
          paddingTop: center ? undefined : '60px',
          gap: 'var(--products-spacing-40)',
        }}
      >
        <div className="flex flex-col items-center w-full" style={{ gap: 'var(--socialdeal-upcoming-date-gap)' }}>
          <span className="font-bold w-full" style={{ fontSize: 'var(--typeset-lg-size)', lineHeight: 'var(--typeset-lg-lh)', color: 'var(--socialdeal-upcoming-dday-text)' }}>
            {item.dday}
          </span>
          <div className="font-bold w-full" style={{ fontSize: 'var(--typeset-4xl-size)', lineHeight: 'var(--typeset-4xl-lh)', color: 'var(--primitive-white)' }}>
            <p>{item.date}</p>
            <p>{item.time}</p>
          </div>
        </div>
        <div className="font-normal whitespace-nowrap" style={{ fontSize: 'var(--typeset-sm-size)', lineHeight: 'var(--typeset-sm-lh)', color: 'var(--primitive-white)' }}>
          {nameLines.map((l, i) => <p key={i}>{l}</p>)}
        </div>
      </div>
    </div>
  )
}

// ── 알림설정 카드 ───────────────────────────────────────────────
function NotificationCard() {
  const [on, setOn] = useState(false)
  return (
    <div
      className="flex items-center justify-center w-full border border-solid"
      style={{
        gap: 'var(--gbuying-noti-gap)',
        padding: 'var(--gbuying-noti-p)',
        borderRadius: 'var(--gbuying-noti-r)',
        backgroundColor: 'var(--gbuying-noti-surface)',
        borderColor: 'var(--gbuying-noti-border)',
        boxShadow: '0px 3px 20px 3px rgba(0,0,0,0.03)',
      }}
    >
      <p
        className="flex-1 min-w-0 font-bold"
        style={{ fontSize: 'var(--typeset-md-size)', lineHeight: 'var(--typeset-md-lh)', color: 'var(--gbuying-noti-text)' }}
      >
        공동구매 혜택과<br />이벤트가 있을 때 알려드려요
      </p>
      <button
        type="button"
        role="switch"
        aria-checked={on}
        aria-label="공동구매 알림 받기"
        onClick={() => setOn(v => !v)}
        className="flex items-center shrink-0"
        style={{
          width: 'var(--gbuying-noti-toggle-w)',
          height: 'var(--gbuying-noti-toggle-h)',
          padding: 'var(--gbuying-noti-toggle-p)',
          borderRadius: 'var(--radius-max)',
          backgroundColor: on ? 'var(--filled-primary-surface)' : 'var(--gbuying-noti-toggle-track)',
          justifyContent: on ? 'flex-end' : 'flex-start',
          transition: 'background-color 0.15s, justify-content 0.15s',
        }}
      >
        <span
          className="block"
          style={{
            width: 'var(--gbuying-noti-toggle-knob)',
            height: 'var(--gbuying-noti-toggle-knob)',
            borderRadius: 'var(--radius-max)',
            backgroundColor: 'var(--gbuying-noti-toggle-knob)',
            boxShadow: '0px 1.5px 5px 0px rgba(0,0,0,0.1)',
          }}
        />
      </button>
    </div>
  )
}

// ── 푸터 ───────────────────────────────────────────────────────
function Footer() {
  return (
    <div
      className="flex flex-col items-start w-full overflow-clip"
      style={{ paddingInline: 'var(--gbuying-footer-px)', paddingBlock: 'var(--gbuying-footer-py)' }}
    >
      <p className="font-normal whitespace-nowrap" style={{ fontSize: 'var(--typeset-md-size)', lineHeight: 'var(--typeset-md-lh)', color: 'var(--gbuying-footer-company)' }}>
        OK캐쉬백 쇼핑
      </p>
      <div className="flex flex-wrap items-center pt-[12px] gap-[4px_8px] w-full">
        <span className="font-normal whitespace-nowrap" style={{ fontSize: 'var(--typeset-sm-size)', lineHeight: 'var(--typeset-sm-lh)', color: 'var(--gbuying-footer-link)' }}>
          쇼핑 서비스 이용약관
        </span>
        <span className="w-px h-[12px]" style={{ backgroundColor: 'var(--gbuying-footer-divider)' }} />
        <span className="font-normal whitespace-nowrap" style={{ fontSize: 'var(--typeset-sm-size)', lineHeight: 'var(--typeset-sm-lh)', color: 'var(--gbuying-footer-company)' }}>
          통신판매중개자 안내
        </span>
      </div>
    </div>
  )
}

export default function GroupbuyingHome() {
  return (
    <div style={{ backgroundColor: 'var(--gbuying-surface)' }}>
      {/* ① 일러스트 배너 */}
      <GroupBuyingBanner />

      {/* ② Building Blocks */}
      <div className="flex flex-col items-center pb-[20px]" style={{ gap: 'var(--gbuying-list-gap)' }}>
        {/* 소셜딜 카드 리스트 */}
        <div className="flex flex-col items-center w-full" style={{ gap: 'var(--gbuying-list-gap)', paddingInline: 'var(--gbuying-px)' }}>
          {DEALS.map((deal, i) => (
            <SocialDealCard key={i} {...deal} />
          ))}
        </div>

        {/* comingsoon 가로 리스트 */}
        <div
          className="flex items-center overflow-x-auto w-full"
          style={{ gap: 'var(--gbuying-comingsoon-gap)', paddingInline: 'var(--gbuying-px)', scrollbarWidth: 'none' } as React.CSSProperties}
        >
          {COMINGSOON.map((item, i) => (
            <ComingSoonCard key={i} item={item} center={i === 2} />
          ))}
        </div>

        {/* 알림설정 카드 */}
        <div className="w-full" style={{ paddingInline: 'var(--gbuying-px)' }}>
          <NotificationCard />
        </div>
      </div>

      {/* ③ 푸터 */}
      <Footer />
    </div>
  )
}
