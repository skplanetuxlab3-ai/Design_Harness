import { useState } from 'react'
import type { NotificationSettingProps } from './NotificationSetting.types'

// Figma: bars / notification / setting (19960:176169)
// 적립쇼핑·공동구매 두 화면이 같은 컴포넌트를 쓴다.

export default function NotificationSetting({
  message = '적립캐치 알림켜고 혜택 챙기세요.',
  switchLabel = '알림 받기',
  checked,
  defaultChecked = false,
  onChange,
  className,
}: NotificationSettingProps) {
  const [inner, setInner] = useState(defaultChecked)
  const on = checked ?? inner

  const toggle = () => {
    const next = !on
    if (checked === undefined) setInner(next)
    onChange?.(next)
  }

  return (
    <div
      className={`flex w-full items-center justify-center border border-solid ${className ?? ''}`}
      style={{
        gap: 'var(--noti-setting-gap)',
        padding: 'var(--noti-setting-p)',
        borderRadius: 'var(--noti-setting-r)',
        backgroundColor: 'var(--noti-setting-surface)',
        borderColor: 'var(--noti-setting-border)',
        boxShadow:
          'var(--elevation-glow-x) var(--elevation-glow-y) var(--elevation-glow-blur) var(--elevation-glow-spread) var(--elevation-glow-color)',
      }}
    >
      <p
        className="min-w-0 flex-1 font-bold"
        style={{
          fontSize: 'var(--typeset-md-size)',
          lineHeight: 'var(--typeset-md-lh)',
          color: 'var(--noti-setting-text)',
        }}
      >
        {message}
      </p>
      <button
        type="button"
        role="switch"
        aria-checked={on}
        aria-label={switchLabel}
        onClick={toggle}
        className="flex shrink-0 items-center"
        style={{
          width: 'var(--noti-setting-toggle-w)',
          height: 'var(--noti-setting-toggle-h)',
          padding: 'var(--noti-setting-toggle-p)',
          borderRadius: 'var(--radius-max)',
          backgroundColor: on ? 'var(--filled-primary-surface)' : 'var(--noti-setting-toggle-track)',
          justifyContent: on ? 'flex-end' : 'flex-start',
          transition: 'background-color 0.15s',
        }}
      >
        <span
          className="block"
          style={{
            width: 'var(--noti-setting-knob-size)',
            height: 'var(--noti-setting-knob-size)',
            borderRadius: 'var(--radius-max)',
            backgroundColor: 'var(--noti-setting-knob-color)',
            boxShadow:
              'var(--elevation-105dp-x) var(--elevation-105dp-y) var(--elevation-105dp-blur) var(--elevation-105dp-spread) var(--elevation-105dp-color)',
          }}
        />
      </button>
    </div>
  )
}
