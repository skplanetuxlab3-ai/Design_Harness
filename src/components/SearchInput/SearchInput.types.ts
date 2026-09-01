export interface SearchInputProps {
  placeholder?: string
  value?: string
  onChange?: (value: string) => void
  onSubmit?: (value: string) => void
  className?: string
}
