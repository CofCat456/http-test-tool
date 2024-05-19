import { defaultExclude, defineConfig } from 'vitest/config'
import { alias } from './alias'

export default defineConfig({
  optimizeDeps: {
    entries: [],
  },
  resolve: {
    alias,
  },
  test: {
    name: 'unit',
    testTimeout: 30_000,
    exclude: [...defaultExclude],
  },
})
