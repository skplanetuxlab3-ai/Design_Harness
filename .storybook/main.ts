import type { StorybookConfig } from '@storybook/react-vite'

const config: StorybookConfig = {
  stories: ['../src/**/*.stories.@(ts|tsx)'],
  addons: ['@storybook/addon-essentials'],
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
  docs: { autodocs: 'tag' },
  // vite.config.ts 의 dev 서버 설정(port 5174 + strictPort)을 그대로 물려받으면
  // Storybook 이 자기 포트(6006)를 못 쓴다. 서버 설정만 비운다.
  viteFinal: async (config) => {
    config.server = { ...config.server, port: undefined, strictPort: false }
    return config
  },
}

export default config
