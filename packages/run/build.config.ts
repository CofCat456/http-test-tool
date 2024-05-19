import { defineBuildConfig } from 'unbuild'

export default defineBuildConfig({
  entries: [
    'src/index',
  ],
  outDir: '.',
  failOnWarn: false,
  clean: false,
})
