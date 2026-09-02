import type { SearchResultItemProps } from './SearchResultItem.types'
// Figma: Item 19723:155593 (Primary List / SP08_3_검색 결과)
import stampIcon from '../../assets/icon-stamp-12_19723-155528.svg'

/**
 * 검색 결과 카드.
 *
 * ProductCard 의 변형이 아니다 — 포인트 배지가 이미지 위에 얹히고,
 * 평점 대신 스탬프 문구가 붙는다. 폭은 부모(2열 그리드)가 정한다.
 */
export default function SearchResultItem({
  brand,
  title,
  discount,
  price,
  imageUrl,
  point,
  stampLabel,
  onClick,
  className,
}: SearchResultItemProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={
        className ??
        'flex w-full flex-col items-center gap-[var(--sresult-gap)] overflow-clip pb-[var(--sresult-pb)] text-left'
      }
    >
      {/* img_contentarea 19723:155398 */}
      <span
        className="relative block w-full shrink-0 overflow-clip rounded-[var(--sresult-img-r)] border border-solid border-[var(--primitive-shopping-border)] bg-[var(--primitive-white)]"
        style={{ aspectRatio: '1 / 1' }}
      >
        {imageUrl && (
          <img src={imageUrl} alt="" aria-hidden className="absolute inset-0 block size-full object-cover" />
        )}
        {/* Overlay layer — 이미지와 바닥색을 구분한다 */}
        <span aria-hidden className="absolute inset-0 block bg-[var(--primitive-black-opacity-50)]" />
        {point && (
          <span
            className="absolute flex flex-col items-center justify-center overflow-clip p-[var(--sresult-bullet-p)]"
            style={{ right: 'var(--sresult-bullet-inset)', top: 'var(--sresult-bullet-inset)', minWidth: 'var(--sresult-bullet-min-w)' }}
          >
            <span
              className="flex flex-col items-center justify-center whitespace-nowrap rounded-[var(--sresult-point-r)] px-[var(--sresult-point-px)] text-right text-[length:var(--typeset-md-compact-size)] leading-[var(--typeset-md-compact-lh)] font-bold text-[var(--primitive-white)] tracking-[0]"
              style={{
                backgroundColor: 'var(--color-brand-ocb-instant)',
                height: 'var(--sresult-point-h)',
                minWidth: 'var(--sresult-point-min-w)',
              }}
            >
              {point}
            </span>
          </span>
        )}
      </span>

      {/* Contents 19723:155404 */}
      <span className="flex w-full shrink-0 flex-col items-start gap-[var(--sresult-contents-gap)] px-[var(--sresult-contents-px)]">
        <span className="flex w-full flex-col items-start gap-px">
          <span className="flex w-full flex-col items-start gap-[var(--sresult-text-gap)]">
            <span className="w-full overflow-hidden text-ellipsis whitespace-nowrap text-[length:var(--typeset-xs-size)] leading-[var(--typeset-xs-lh)] font-normal text-[var(--primitive-blueblack-300)] tracking-[0]">
              {brand}
            </span>
            <span
              className="w-full overflow-hidden text-ellipsis text-[length:var(--typeset-sm-size)] leading-[var(--typeset-sm-lh)] font-normal text-[var(--primitive-black)] tracking-[0]"
              style={{ maxHeight: 'var(--sresult-title-max-h)' }}
            >
              {title}
            </span>
          </span>

          {/* Price 19723:155409 */}
          <span className="flex w-full flex-col items-start justify-center gap-[var(--products-spacing-02)]">
            <span className="flex items-center gap-[var(--products-spacing-02)] whitespace-nowrap text-[length:var(--typeset-md-size)] leading-[var(--typeset-md-lh)] font-bold tracking-[0]">
              {discount && <span className="text-[var(--color-brand-ocb-pink)]">{discount}</span>}
              <span className="overflow-hidden text-ellipsis text-[var(--primitive-black)]">{price}</span>
            </span>
            {stampLabel && (
              <span className="flex items-center gap-[var(--products-spacing-02)]">
                <span className="relative block shrink-0 size-[var(--sresult-stamp-icon)]">
                  <img
                    src={stampIcon}
                    alt=""
                    aria-hidden
                    className="absolute block max-w-none"
                    style={{ left: '1px', top: 0, width: '10px', height: '10.312px' }}
                  />
                </span>
                <span className="whitespace-nowrap text-[length:var(--typeset-xs-size)] font-medium text-[var(--primitive-shopping-purple-700)] tracking-[0]">
                  {stampLabel}
                </span>
              </span>
            )}
          </span>
        </span>
      </span>
    </button>
  )
}
