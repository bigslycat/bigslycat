// @ts-check

import { config } from 'typescript-eslint'
import { config as baseConfig } from '@bigslycat/eslint'

export default config(
  {
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.eslint.json'],
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },

  ...baseConfig,
)
