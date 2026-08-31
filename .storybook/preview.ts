import type { Preview } from '@storybook/react'
// 디자인 토큰을 로드한다 — 이게 없으면 모든 var(--*) 가 비어 컴포넌트가 무너진다
import '../src/styles/globals.css'

const preview: Preview = {
  parameters: {
    controls: { matchers: { color: /(background|color)$/i, date: /Date$/i } },
    backgrounds: {
      default: 'light',
      values: [
        { name: 'light', value: '#ffffff' },
        { name: 'surface', value: '#fafafa' },
        { name: 'dark', value: '#1e2032' },
      ],
    },
    options: {
      storySort: { order: ['Atoms', 'Molecules', 'Components', 'Navigation', 'Screens'] },
    },
  },
}

export default preview
