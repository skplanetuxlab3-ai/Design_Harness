import type { AppBarProps } from './AppBar.types'
// Figma: top_appbar — mode=light 15679:119724 / mode=dark 15679:119723
// ※ TopNavBar 도 자체 appbar 를 품고 있다(쇼핑 dark 변형 + 탭바 일체형).
//   같은 Figma 컴포넌트라 언젠가 합쳐야 한다.
import backIcon from '../../assets/icon-historyback-24_1419-667.svg'

export default function AppBar({
  title = '',
  mode = 'light',
  showBack = true,
  onBack,
  trailing,
  className,
}: AppBarProps) {
  const dark = mode === 'dark'
  return (
    <div
      className={
        className ??
        'flex w-full shrink-0 items-center justify-end overflow-clip px-[var(--appbar-px)] h-[var(--appbar-h)] min-h-[var(--appbar-h)]'
      }
      style={{ backgroundColor: dark ? 'var(--top-appbar-surface)' : 'var(--primitive-white)' }}
    >
      <div className="flex min-w-0 flex-1 items-center">
        {showBack && (
          <button
            type="button"
            onClick={onBack}
            aria-label="뒤로 가기"
            className="flex shrink-0 items-center justify-center overflow-clip size-[var(--appbar-touch)]"
          >
            <img
              src={backIcon}
              alt=""
              aria-hidden
              className="block shrink-0 size-[var(--appbar-icon)]"
              style={dark ? { filter: 'invert(1)' } : undefined}
            />
          </button>
        )}
        <p
          className="min-w-0 flex-1 overflow-hidden text-ellipsis whitespace-nowrap text-[length:var(--typeset-xl-size)] leading-[var(--typeset-xl-lh)] font-bold tracking-[var(--typeset-xl-tracking)]"
          style={{ color: dark ? 'var(--primitive-white)' : 'var(--primitive-black)' }}
        >
          {title}
        </p>
      </div>
      {trailing}
    </div>
  )
}
