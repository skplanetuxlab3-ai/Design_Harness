import shiftIcon from '../../assets/icon-kbd-shift_66-10264.svg'
import backspaceIcon from '../../assets/icon-kbd-backspace_66-10289.svg'
import returnIcon from '../../assets/icon-kbd-return_66-10311.svg'
import type { KeyboardMockProps } from './KeyboardMock.types'

/**
 * 안드로이드 시스템 키보드 목업 — Figma `Keyboard` 19449:147766
 *
 * 디자인 시스템 요소가 아니라 OS 크롬이다. App.tsx 의 StatusBar 와 같은
 * 취급으로, 배치와 크기만 Figma 대로 맞춘 목업이다. Gboard 상단 툴바
 * (GIF·설정·번역·스티커)는 화면 검증에 기여하지 않아 생략했다.
 */

const ROW1 = [...'qwertyuiop']
const ROW2 = [...'asdfghjkl']
const ROW3 = [...'zxcvbnm']

function Key({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <span
      className={`flex items-center justify-center bg-[var(--kbd-key-surface)] h-[var(--kbd-key-h)] rounded-[var(--kbd-key-r)] ${className ?? 'flex-1'}`}
    >
      {children}
    </span>
  )
}

const LETTER = 'text-[21px] leading-[24px] text-[var(--primitive-black)]'

export default function KeyboardMock({ className }: KeyboardMockProps) {
  return (
    <div
      className={className ?? 'w-full shrink-0 bg-[var(--kbd-surface)] h-[var(--kbd-h)]'}
      aria-hidden
    >
      <div
        className="flex flex-col items-center gap-[var(--kbd-row-gap)] px-[var(--kbd-px)]"
        style={{ paddingTop: 'var(--kbd-top)' }}
      >
        <div className="flex w-full gap-[var(--kbd-px)]">
          {ROW1.map((k) => <Key key={k}><span className={LETTER}>{k}</span></Key>)}
        </div>
        <div className="flex w-full gap-[var(--kbd-px)] px-[5%]">
          {ROW2.map((k) => <Key key={k}><span className={LETTER}>{k}</span></Key>)}
        </div>
        <div className="flex w-full gap-[var(--kbd-px)]">
          <Key className="basis-[13%] shrink-0"><img src={shiftIcon} alt="" className="block size-[20px]" /></Key>
          {ROW3.map((k) => <Key key={k}><span className={LETTER}>{k}</span></Key>)}
          <Key className="basis-[13%] shrink-0"><img src={backspaceIcon} alt="" className="block size-[20px]" /></Key>
        </div>
        <div className="flex w-full gap-[var(--kbd-px)]">
          <Key className="basis-[13%] shrink-0">
            <span className="text-[12px] leading-[16px] font-medium text-[var(--primitive-black)]">?123</span>
          </Key>
          <Key className="basis-[10%] shrink-0"><span className={LETTER}>,</span></Key>
          <Key className="flex-[3]"> </Key>
          <Key className="basis-[10%] shrink-0"><span className={LETTER}>.</span></Key>
          <Key className="basis-[13%] shrink-0"><img src={returnIcon} alt="" className="block size-[20px]" /></Key>
        </div>
      </div>
    </div>
  )
}
