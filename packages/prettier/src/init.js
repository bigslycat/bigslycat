// @ts-check

import { copyFileSync } from 'node:fs'
import { resolve } from 'node:path'

copyFileSync(
  resolve(import.meta.dirname, 'initial-config.js'),
  resolve(process.cwd(), 'prettier.config.js'),
)
