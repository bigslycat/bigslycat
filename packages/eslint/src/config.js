// @ts-check

import { configs } from 'typescript-eslint'
import prettier from 'eslint-plugin-prettier/recommended'
import hooks from 'eslint-plugin-react-hooks'

/** @type {import("typescript-eslint").ConfigWithExtends[]} */
export const config = [
  {
    ignores: ['.yarn/', '**/node_modules/', '**/lib/', '**/build/', '**/dist/'],
  },

  configs.base,

  {
    files: [
      '**/*.js',
      '**/*.mjs',
      '**/*.cjs',
      '**/*.jsx',
      '**/*.ts',
      '**/*.tsx',
      '**/*.mts',
      '**/*.cts',
    ],

    languageOptions: {
      sourceType: 'module',
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
    },

    plugins: {
      hooks,
    },

    rules: {
      'hooks/rules-of-hooks': 'error',
      'hooks/exhaustive-deps': 'error',
    },
  },

  prettier,
]
