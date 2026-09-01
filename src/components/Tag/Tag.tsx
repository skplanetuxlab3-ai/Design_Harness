import type { TagProps } from './Tag.types'

import pointIcon from '../../assets/icon-point_936-26914.svg'

// Point 아이콘 — Figma icon / 10 / point (node 936:26914), 보라 원 + 흰 P

const POINT_ICON_URL = pointIcon
// TODO: Type6(보라 배경)용 반전 아이콘은 Figma에서 아직 못 찾음 — 임시로 같은 아이콘 사용
const POINT_ICON_TYPE6_URL = pointIcon

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
      'inline-flex h-[var(--plist-tag-h)] items-center px-[var(--plist-tag-px)] py-[var(--plist-tag-py)] rounded-[var(--radius-050)]',
      style.bg,
      style.border,
      (type === 'Point' || type === 'Type6') ? 'gap-[var(--products-spacing-02)]' : '',
    ]
      .filter(Boolean)
      .join(' ')

  const textCls = [
    'text-[length:var(--typeset-2xs-size)] leading-[var(--typeset-2xs-lh)] tracking-[0] font-semibold whitespace-nowrap shrink-0',
    style.textCls,
  ].join(' ')

  return (
    <span className={containerCls} aria-label={`${type} 태그: ${displayText()}`}>
      {style.hasIcon && (
        <img
          src={style.iconUrl}
          alt=""
          aria-hidden="true"
          className="size-[var(--typeset-2xs-size)] shrink-0 object-contain"
        />
      )}
      <span className={textCls}>{displayText()}</span>
    </span>
  )
}
