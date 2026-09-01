export interface SearchInputProps {
  placeholder?: string
  value?: string
  /** 입력값 우측에 커서 막대를 그린다 (Figma search_bar 의 입력중 상태) */
  showCaret?: boolean
  /** 값이 있을 때 지우기 버튼을 보인다 */
  clearable?: boolean
  onChange?: (value: string) => void
  onSubmit?: (value: string) => void
  onClear?: () => void
  /** 스토리·목업에서 실제 input 대신 정적 텍스트로 그린다 */
  readOnlyDisplay?: boolean
  className?: string
}
