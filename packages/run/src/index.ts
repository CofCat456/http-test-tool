import os from 'node:os'
import { exec } from 'node:child_process'
import prompts from 'prompts'
import open from 'open'
import consola from 'consola'
import {
  blue,
  cyan,
  green,
  lightBlue,
  lightGreen,
  red,
  reset,
  yellow,
} from 'kolorist'

const koloristColors: KoloristColor[] = [
  blue,
  cyan,
  green,
  lightBlue,
  lightGreen,
  yellow,
]

type KoloristColor = (text: string) => string

/**
 * 檢索當前機器的 IPv4 地址。
 * @returns {string[]} 返回 IPv4 地址的陣列。
 */
function getIPv4Addresses(): string[] {
  const interfaces = os.networkInterfaces()
  const ipv4Addresses: string[] = []

  for (const key in interfaces) {
    const iface = interfaces[key]
    if (iface) { // 檢查 iface 是否存在
      for (const config of iface) {
        if (config.family === 'IPv4' && !config.internal)
          ipv4Addresses.push(config.address)
      }
    }
  }

  return ipv4Addresses
}

/**
 * 根據平台檢索作業系統名稱。
 * @returns {string} 返回作業系統的名稱。
 */
function getOperatingSystem(): string {
  const platform = os.platform() // 獲取作業系統平台

  switch (platform) {
    case 'aix':
    case 'freebsd':
    case 'linux':
    case 'openbsd':
    case 'android':
      return 'Unix'
    case 'darwin':
      return 'MacOS'
    case 'win32':
      return 'Windows'
    default:
      return 'Unknown'
  }
}

const command = 'node .output/server/index.mjs'
const operatingSystem = getOperatingSystem()

async function init() {
  let result: prompts.Answers<'ipv4'>

  try {
    result = await prompts({
      type: 'select',
      name: 'ipv4',
      message: reset('Select an ip to start server:'),
      initial: 0,
      choices: getIPv4Addresses().map((ip, idx) => {
        const Color = koloristColors[idx % koloristColors.length]
        return {
          title: Color(ip),
          value: ip,
        }
      }),
    }, {
      onCancel: () => {
        throw new Error(`${red('✖')} Operation cancelled`)
      },
    })
  }
  catch (cancelled) {
    consola.warn(cancelled.message)
    return
  }

  const { ipv4 } = result

  consola.info(`\Starting server on ${ipv4}...`)

  if (operatingSystem === 'Windows')
    exec(`cmd /c set "HOST=${ipv4}" ^&^& ${command}`)
  else
    exec(`HOST=${ipv4} ${command}`)

  consola.success(`Done. Now running on http://${ipv4}:3000`)

  open(`http://${ipv4}:3000`)
}

init().catch((e) => {
  consola.warn(e)
})
