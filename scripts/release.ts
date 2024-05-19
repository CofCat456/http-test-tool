import { fileURLToPath } from 'node:url'
import { dirname, join, resolve } from 'node:path'
import { consola } from 'consola'
import { copySync, ensureDirSync, pathExists, removeSync } from 'fs-extra/esm'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const releaseMacDir = join(resolve(__dirname, '..'), 'http-test-tool-mac')

if (pathExists(releaseMacDir))
  removeSync(releaseMacDir)
else
  ensureDirSync(releaseMacDir)

const releaseWindowDir = join(resolve(__dirname, '..'), 'http-test-tool-window')

if (pathExists(releaseWindowDir))
  removeSync(releaseWindowDir)
else
  ensureDirSync(releaseWindowDir)

const releaseUbuntuDir = join(resolve(__dirname, '..'), 'http-test-tool-ubuntu')

if (pathExists(releaseUbuntuDir))
  removeSync(releaseUbuntuDir)
else
  ensureDirSync(releaseUbuntuDir)

// 原始檔案路徑
const originalReadmePath = join(resolve(__dirname, '..'), 'README.md')
const originalRunScriptMainPath = join(resolve(__dirname, '../packages/run/index.mjs'))
const originalRunShellScriptPath = join(resolve(__dirname, '../packages/run/run.sh'))
const originalRunBatScriptPath = join(resolve(__dirname, '../packages/run/run.bat'))
const originalOutputPath = join(resolve(__dirname, '../packages/web/.output'))

consola.info('新檔案路徑於 release-mac 資料夾')
const newMacReadmePath = join(releaseMacDir, 'README.md')
const newMacRunScriptMainPath = join(releaseMacDir, 'index.mjs')
const newMacRunScriptPath = join(releaseMacDir, 'run.sh')
const newMacOutputPath = join(releaseMacDir, '.output')

consola.info('移動檔案到 release-mac 資料夾...')
copySync(originalReadmePath, newMacReadmePath, { overwrite: true })
copySync(originalRunScriptMainPath, newMacRunScriptMainPath, { overwrite: true })
copySync(originalRunShellScriptPath, newMacRunScriptPath, { overwrite: true })
copySync(originalOutputPath, newMacOutputPath)

consola.info('新檔案路徑於 release-window 資料夾...')
const newWindowReadmePath = join(releaseWindowDir, 'README.md')
const newWindowRunScriptMainPath = join(releaseWindowDir, 'index.mjs')
const newWindowRunScriptPath = join(releaseWindowDir, 'run.bat')
const newWindowOutputPath = join(releaseWindowDir, '.output')

consola.info('移動檔案到 release-window 資料夾...')
copySync(originalReadmePath, newWindowReadmePath, { overwrite: true })
copySync(originalRunScriptMainPath, newWindowRunScriptMainPath, { overwrite: true })
copySync(originalRunBatScriptPath, newWindowRunScriptPath, { overwrite: true })
copySync(originalOutputPath, newWindowOutputPath)

consola.info('新檔案路徑於 release-ubuntu 資料夾...')
const newUbuntuReadmePath = join(releaseUbuntuDir, 'README.md')
const newUbuntuRunScriptMainPath = join(releaseUbuntuDir, 'index.mjs')
const newUbuntuRunScriptPath = join(releaseUbuntuDir, 'run.sh')
const newUbuntuOutputPath = join(releaseUbuntuDir, '.output')

consola.info('移動檔案到 release-ubuntu 資料夾...')
copySync(originalReadmePath, newUbuntuReadmePath, { overwrite: true })
copySync(originalRunScriptMainPath, newUbuntuRunScriptMainPath, { overwrite: true })
copySync(originalRunShellScriptPath, newUbuntuRunScriptPath, { overwrite: true })
copySync(originalOutputPath, newUbuntuOutputPath)

consola.success('所有檔案打包完成 !');
