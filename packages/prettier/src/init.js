// @ts-check

import { copyFileSync } from 'fs'
import { resolve } from 'path/posix'

copyFileSync(
  resolve(import.meta.dirname, 'initial-config.js'),
  resolve(process.cwd(), 'prettier.config.js'),
)
