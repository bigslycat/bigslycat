// @ts-check

import { config } from 'typescript-eslint'
import { config as baseConfig } from '@bigslycat/eslint'

export default config(
  {
    ignores: ['**/generated.ts', '**/generated/'],
  },

  {
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.eslint.json', './packages/*/tsconfig.json'],
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },

  ...baseConfig,
)
