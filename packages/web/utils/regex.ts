const regexApi = /^https?:\/\/(?:\d{1,3}\.){3}\d{1,3}(?::\d+)?\/api/
const regexBase64 = /^[A-Z0-9+/]+={0,2}$/i
const regexImageOrImg = /\b(?:img|image)\b/i
const regexURLQuery = /\?/
const regexURLExtensions = /\.(?:svg|ico|vue)$/i
const regexURLNuxt = /_nuxt/
const regexURLLocalhost = /localhost/

/**
 * 检查 URL 是否没有带查询参数。
 *
 * @param url 要检查的 URL 字符串。
 * @returns 返回 true 如果 URL 没有带查询参数，否则返回 false。
 */
export function checkURLHasNoQuery(url: string): boolean {
  return !regexURLQuery.test(url)
}

/**
 * 檢查 URL 是否包含 .svg 或 .ico 擴展名。
 *
 * @param url 要檢查的 URL 字符串。
 * @returns 返回 true 如果 URL 包含 .svg .ico .vue  擴展名，否則返回 false。
 */
export function checkURLForExtensions(url: string): boolean {
  return regexURLExtensions.test(url)
}

/**
 * 檢查 URL 是否包含 `_nuxt`。
 *
 * @param url 要檢查的 URL 字符串。
 * @returns 返回 true 如果 URL 包含 `_nuxt`，否則返回 false。
 */
export function checkURLForNuxt(url: string): boolean {
  return regexURLNuxt.test(url)
}

/**
 * 檢查 URL 是否包含 'localhost'。
 *
 * @param url 要檢查的 URL 字符串。
 * @returns 返回 true 如果 URL 包含 'localhost'，否則返回 false。
 */
export function checkURLForLocalhost(url: string): boolean {
  return regexURLLocalhost.test(url)
}

/**
 * 檢查一個字符串是否為有效的 Base64 編碼數據。
 *
 * @param str 要檢查的字符串。
 * @returns 返回 true 如果字符串是有效的 Base64 編碼數據，否則返回 false。
 */
export function isValidBase64<T = string>(str: T): boolean {
  if (typeof str !== 'string')
    return false

  return regexBase64.test(str)
}

/**
 * 檢查一個字符串是否包含 "image" 或 "img"。
 *
 * @param str 要檢查的字符串。
 * @returns 返回 true 如果字符串包含 "image" 或 "img"，否則返回 false。
 */
export function containsImageOrImg<T = string>(str: T): boolean {
  if (typeof str !== 'string')
    return false

  return regexImageOrImg.test(str)
}

/**
 * 檢查 URL 是否是對 Server 的 API 請求。
 *
 * @param url 要檢查的 URL 字符串。
 * @returns 返回 true 如果 URL 是 'IP地址/api'，否則返回 false。
 */
export function checkURLForAPI(url: string): boolean {
  return regexApi.test(url)
}
