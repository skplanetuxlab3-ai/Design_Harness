import type { NoDataProps } from './NoData.types'
// Figma: nodata 19807:157630
import nodataIcon from '../../assets/icon-nodata-48_1197-47375.svg'

const DEFAULT_LINES = ['검색 결과가 없어요.', '다른 검색어를 입력하거나', '철자가 정확한지 확인해 주세요.']

export default function NoData({ lines = DEFAULT_LINES, className }: NoDataProps) {
  return (
    <div
      className={
        className ??
        'flex w-full flex-col items-center justify-center px-[var(--nodata-px)] py-[var(--nodata-py)]'
      }
    >
      <div className="flex shrink-0 flex-col items-center gap-[var(--nodata-gap)]">
        <img src={nodataIcon} alt="" aria-hidden className="block shrink-0 size-[var(--nodata-icon)]" />
        <p
          className="text-center text-[length:var(--typeset-md-size)] leading-[var(--typeset-md-lh)] font-normal text-[var(--primitive-black-200)]"
          style={{ width: 'var(--nodata-text-w)', maxWidth: '100%' }}
        >
          {lines.map((l, i) => (
            <span key={i} className="block">{l}</span>
          ))}
        </p>
      </div>
    </div>
  )
}
