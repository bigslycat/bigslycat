# @bigslycat/eslint

My ESLint config.

## Usage

Install:

```sh
npm i -D @bigslycat/eslint @bigslycat/prettier eslint prettier typescript
# or
yarn add -D @bigslycat/eslint @bigslycat/prettier eslint prettier typescript
```

## Init config

```sh
npx init-eslint
# or
yarn init-eslint
```

## Manual init

```sh
touch eslint.config.js
touch tsconfig.eslint.json
```

#### eslint.config.js

```js
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
```

#### tsconfig.eslint.json

```json
{
  "extends": "./tsconfig.json",
  "compilerOptions": {
    "noEmit": true
  },
  "include": ["*.js", "src/**/*.js", "**/*.ts", "**/*.tsx"]
}
```
