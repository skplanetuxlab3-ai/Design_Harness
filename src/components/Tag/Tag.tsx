import type { TagProps } from './Tag.types'

// Point 아이콘 (보라색 P 심볼) — TODO: 로컬 SVG로 교체
const POINT_ICON_URL = 'https://www.figma.com/api/mcp/asset/12cfd728-4fff-434c-8e3c-0e6b2770c026'
const POINT_ICON_TYPE6_URL = 'https://www.figma.com/api/mcp/asset/27c9c21a-94b7-4d06-baa0-01ddc2c7d234'

const TAG_STYLES = {
  Point: {
    bg: 'bg-[var(--primitive-shopping-purple-900)]',
    border: '',
    textCls: 'text-[var(--primitive-shopping-purple-600)]',
    hasIcon: true,
    iconUrl: POINT_ICON_URL,
  },
  Type6: {
    bg: 'bg-[var(--color-brand-primary)]',
    border: '',
    textCls: 'text-[var(--primitive-white)]',
    hasIcon: true,
    iconUrl: POINT_ICON_TYPE6_URL,
  },
  Basic: {
    bg: 'bg-[var(--primitive-black-800)]',
    border: '',
    textCls: 'text-[var(--primitive-black-300)]',
    hasIcon: false,
    iconUrl: '',
  },
  Other: {
    bg: 'bg-[var(--primitive-white)]',
    border: 'border border-[var(--primitive-black-800)]',
    textCls: 'text-[var(--primitive-black-300)]',
    hasIcon: false,
    iconUrl: '',
  },
  Benefit: {
    bg: 'bg-[var(--primitive-pink-900)]',
    border: '',
    textCls: 'text-[var(--primitive-shopping-pink)]',
    hasIcon: false,
    iconUrl: '',
  },
  OkiClub: {
    bg: 'bg-[var(--primitive-okiclub-bg)]',
    border: '',
    textCls: 'text-[var(--primitive-okiclub-pink)]',
    hasIcon: false,
    iconUrl: '',
  },
} as const

export default function Tag({
  type = 'Point',
  label = '태그명',
  point = '540P 적립',
  benefit = '혜택입력',
  className,
}: TagProps) {
  const style = TAG_STYLES[type]

  const displayText = () => {
    if (type === 'Point' || type === 'Type6') return point
    if (type === 'Benefit') return benefit
    if (type === 'OkiClub') return '오키클럽'
    return label
  }

  const containerCls =
    className ??
    [
      'inline-flex h-[18px] items-center px-[4px] py-[2px] rounded-[var(--radius-050)]',
      style.bg,
      style.border,
      (type === 'Point' || type === 'Type6') ? 'gap-[2px]' : '',
    ]
      .filter(Boolean)
      .join(' ')

  const textCls = [
    'text-[10px] leading-[15px] tracking-[0] font-semibold whitespace-nowrap shrink-0',
    style.textCls,
  ].join(' ')

  return (
    <span className={containerCls} aria-label={`${type} 태그: ${displayText()}`}>
      {style.hasIcon && (
        <img
          src={style.iconUrl}
          alt=""
          aria-hidden="true"
          className="size-[10px] shrink-0 object-contain"
        />
      )}
      <span className={textCls}>{displayText()}</span>
    </span>
  )
}
