import type { Meta, StoryObj } from '@storybook/react'
import SearchInput from './SearchInput'

const meta: Meta<typeof SearchInput> = {
  title: '적립쇼핑/SearchInput',
  component: SearchInput,
  parameters: { layout: 'fullscreen' },
  decorators: [(S) => <div className="w-[var(--frame-mobile-w)] bg-[var(--primitive-white)] p-[var(--products-spacing-14)]"><S /></div>],
}
export default meta
type Story = StoryObj<typeof SearchInput>

export const 기본: Story = {}
export const 입력됨: Story = { args: { value: '가습기' } }
