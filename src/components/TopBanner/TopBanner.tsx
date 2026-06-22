import type { TopBannerProps } from './TopBanner.types'

// ─── Figma CDN 에셋 (7일 만료 — TODO: src/assets/ 로컬 교체 필요) ───
const DEFAULT_BANNER_IMG = 'https://www.figma.com/api/mcp/asset/abdb6ec8-ff01-4389-ae07-ee9e7510bc23'

export default function TopBanner({
  imageUrl = DEFAULT_BANNER_IMG,
  title = '영화 할인,\n따로 찾지 마세요',
  buttonLabel = '영화 예매하기',
  total = 3,
  activeIndex = 0,
  onButtonClick,
  className,
}: TopBannerProps) {
  const lines = title.split('\n')
  // pagination/dot: max 4개, 2~3개는 dot 노출, 1개 이하는 미노출
  const dotCount = Math.min(total, 4)
  const showDots = dotCount >= 2

  return (
    <div
      className={className ?? 'relative w-full overflow-hidden'}
      style={{ height: 'var(--topbanner-h)', backgroundColor: 'var(--topbanner-surface)' }}
    >
      {/* 배경 이미지 (중앙 정렬, 2x 크롭) */}
      <img
        src={imageUrl}
        alt=""
        aria-hidden
        className="absolute top-0 left-1/2 -translate-x-1/2 max-w-none object-cover pointer-events-none"
        style={{ width: 'var(--topbanner-img-w)', height: 'var(--topbanner-h)' }}
      />

      {/* 상단 그라데이션 (sp_black → 투명) */}
      <div
        className="absolute top-0 inset-x-0"
        style={{
          height: 'var(--topbanner-grad-h)',
          background:
            'linear-gradient(to bottom, var(--topbanner-grad-top) 0%, rgba(24,24,24,0.6) 50%, rgba(24,24,24,0) 100%)',
        }}
      />
      {/* 하단 그라데이션 (투명 → white) */}
      <div
        className="absolute inset-x-0"
        style={{
          top: 'var(--topbanner-grad-h)',
          height: 'var(--topbanner-grad-h)',
          background:
            'linear-gradient(to bottom, rgba(255,255,255,0) 0%, rgba(255,255,255,0.6) 50%, var(--topbanner-grad-bottom) 100%)',
        }}
      />

      {/* 콘텐츠 (카피 + CTA + 페이지네이션) */}
      <div
        className="absolute left-1/2 -translate-x-1/2 flex flex-col items-center"
        style={{ top: 'var(--topbanner-contents-top)', width: 'var(--topbanner-contents-w)', gap: 'var(--topbanner-contents-gap)' }}
      >
        <div className="flex flex-col items-center w-full" style={{ gap: 'var(--topbanner-admin-gap)' }}>
          {/* 카피 */}
          <p
            className="text-center font-bold whitespace-nowrap"
            style={{
              color: 'var(--topbanner-title-text)',
              fontSize: 'var(--typeset-4xl-size)',
              lineHeight: 'var(--topbanner-title-lh)',
              letterSpacing: 'var(--typeset-4xl-tracking)',
            }}
          >
            {lines.map((l, i) => (
              <span key={i} className="block">{l}</span>
            ))}
          </p>

          {/* CTA 버튼 */}
          <button
            type="button"
            onClick={onButtonClick}
            className="flex items-center justify-center"
            style={{
              height: 'var(--topbanner-btn-h)',
              paddingInline: 'var(--topbanner-btn-px)',
              borderRadius: 'var(--topbanner-btn-r)',
              backgroundColor: 'var(--topbanner-btn-surface)',
            }}
          >
            <span
              className="font-bold text-center whitespace-nowrap"
              style={{
                color: 'var(--topbanner-btn-text)',
                fontSize: 'var(--typeset-md-size)',
                lineHeight: 'var(--typeset-md-lh)',
                letterSpacing: 'var(--typeset-md-tracking)',
              }}
            >
              {buttonLabel}
            </span>
          </button>
        </div>

        {/* 페이지네이션 닷 */}
        {showDots && (
          <div
            className="flex items-center"
            style={{ gap: 'var(--topbanner-dot-gap)', height: '8px' }}
            role="tablist"
            aria-label="배너 페이지"
          >
            {Array.from({ length: dotCount }).map((_, i) => {
              const active = i === activeIndex
              return (
                <span
                  key={i}
                  aria-hidden
                  style={{
                    height: 'var(--topbanner-dot-h)',
                    width: active ? 'var(--topbanner-dot-active-w)' : 'var(--topbanner-dot-h)',
                    borderRadius: 'var(--topbanner-dot-r)',
                    backgroundColor: 'var(--topbanner-dot)',
                    opacity: active ? 0.6 : 0.2,
                  }}
                />
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}
