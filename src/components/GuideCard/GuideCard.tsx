import type { GuideCardProps } from './GuideCard.types'

/**
 * Figma: CardType1 / CardType2 / CardType_Bonus1 / CardType_Bonus2
 *        (SP08_4 이용가이드 20041:130474)
 *
 * 네 카드가 같은 껍데기를 쓴다 — 흰 배경 · r20 · 테두리 4% · pt36 px20 · gap30.
 * 다른 건 아래쪽 액션/안내 유무뿐이라 한 컴포넌트로 덮었다.
 */
export default function GuideCard({
  title,
  body,
  image,
  imageAlt = '',
  actions,
  note,
  className,
}: GuideCardProps) {
  const hasSub = Boolean(actions?.length || note)
  return (
    <section
      className={
        className ??
        'flex w-full flex-col items-center gap-[var(--guide-card-gap)] overflow-clip rounded-[var(--guide-card-r)] border border-solid border-[var(--primitive-black-opacity-50)] bg-[var(--primitive-white)] pt-[var(--guide-card-pt)] px-[var(--guide-card-px)]'
      }
      style={{ maxWidth: 'var(--guide-card-max-w)', paddingBottom: hasSub ? 'var(--guide-card-pb)' : undefined }}
    >
      <div className="flex flex-col items-center gap-[var(--guide-text-gap)] text-center">
        <h2 className="text-[length:var(--typeset-2xl-size)] leading-[var(--typeset-2xl-lh)] font-bold text-[var(--primitive-sp-black)] tracking-[0]">
          {title}
        </h2>
        {body && (
          <p className="text-[length:var(--typeset-md-compact-size)] leading-[var(--typeset-md-compact-lh)] font-normal text-[var(--primitive-blueblack-200)] tracking-[0]">
            {body}
          </p>
        )}
      </div>

      <img src={image} alt={imageAlt} className="block w-full max-w-full" />

      {hasSub && (
        <div className="flex w-full flex-col items-center gap-[var(--guide-sub-gap)]">
          {actions?.map((a) => (
            <button
              key={a.label}
              type="button"
              onClick={a.onClick}
              className="flex w-full items-center justify-center rounded-[var(--radius-max)] bg-[var(--primitive-black-800)] text-[length:var(--typeset-md-size)] leading-[var(--typeset-md-lh)] font-medium text-[var(--primitive-black-200)] tracking-[0]"
              style={{ height: 'var(--guide-btn-h)' }}
            >
              {a.label}
            </button>
          ))}
          {note && (
            <p className="py-[var(--guide-noti-py)] text-center text-[length:var(--typeset-sm-size)] leading-[var(--typeset-sm-lh)] font-normal text-[var(--primitive-blueblack-200)] tracking-[0]">
              {note}
            </p>
          )}
        </div>
      )}
    </section>
  )
}
