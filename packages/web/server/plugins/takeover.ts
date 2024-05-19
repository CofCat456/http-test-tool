import { addUrl } from '../utils/database'
import {
  checkURLForAPI,
  checkURLForExtensions,
  checkURLForLocalhost,
  checkURLForNuxt,
  checkURLHasNoQuery,
} from '~/utils/regex'

enum METHOD {
  GET = 'GET',
  POST = 'POST',
}

function checkGetUrl(url: string): boolean {
  return checkURLForAPI(url) || checkURLHasNoQuery(url) || checkURLForExtensions(url) || checkURLForNuxt(url) || checkURLForLocalhost(url)
}

function parseGetUrl(url: string): Record<string, any> {
  // 正則表達式用來找出 URL 中的參數
  const regex = /[?&]([^=#]+)=([^&#]*)/g
  const params: Record<string, any> = {}
  let match = regex.exec(url)

  // 使用正則表達式迭代匹配 URL 中的參數
  while (match) {
    // 將參數名稱和值解碼，放入 params 對象中
    params[decodeURIComponent(match[1])] = decodeURIComponent(match[2])
    match = regex.exec(url)
  }

  // 返回原始 URL 和包含所有參數的對象
  return params
}

export default defineNitroPlugin((nitroApp) => {
  nitroApp.hooks.hook('request', async (event) => {
    const method = event.req.method
    const url = getRequestURL(event)

    if (method === METHOD.GET) {
      if (!checkGetUrl(url.toString()))
        await addUrl(url.toString(), event.req.method!, parseGetUrl(url.toString()))
    }
    else if (method === METHOD.POST) {
      const body = await readBody(event)
      await addUrl(url.toString(), event.req.method!, body)
    }
  })
})
