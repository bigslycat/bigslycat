// @ts-check

import { copyFileSync } from 'node:fs'
import { resolve } from 'node:path'

copyFileSync(
  resolve(import.meta.dirname, 'tsconfig.eslint.json'),
  resolve(process.cwd(), 'tsconfig.eslint.json'),
)

copyFileSync(
  resolve(import.meta.dirname, 'initial-config.js'),
  resolve(process.cwd(), 'eslint.config.js'),
)
