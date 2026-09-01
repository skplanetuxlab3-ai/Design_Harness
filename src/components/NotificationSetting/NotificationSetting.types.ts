export interface NotificationSettingProps {
  /** 안내 문구. 줄바꿈이 필요하면 ReactNode 를 넘긴다. */
  message?: React.ReactNode
  /** 스위치 접근성 레이블 */
  switchLabel?: string
  /** 제어형으로 쓸 때. 미지정 시 내부 상태로 동작한다. */
  checked?: boolean
  defaultChecked?: boolean
  onChange?: (on: boolean) => void
  className?: string
}
