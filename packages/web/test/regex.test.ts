import { describe, expect, it } from 'vitest'
import {
  checkURLForExtensions,
  checkURLForLocalhost,
  checkURLForNuxt,
  checkURLHasNoQuery,
  containsImageOrImg,
  isValidBase64,
} from '../utils/regex'

describe('regex Utils', () => {
  describe('checkURLHasNoQuery', () => {
    it('should return true if URL has no query', () => {
      const url = 'https://example.com'
      expect(checkURLHasNoQuery(url)).toBe(true)
    })

    it('should return false if URL has query', () => {
      const url = 'https://example.com?param=value'
      expect(checkURLHasNoQuery(url)).toBe(false)
    })
  })

  describe('checkURLForExtensions', () => {
    it('should return true if URL contains .svg extension', () => {
      const url = 'https://example.com/image.svg'
      expect(checkURLForExtensions(url)).toBe(true)
    })

    it('should return true if URL contains .ico extension', () => {
      const url = 'https://example.com/favicon.ico'
      expect(checkURLForExtensions(url)).toBe(true)
    })

    it('should return true if URL contains .vue extension', () => {
      const url = 'https://example.com/app.vue'
      expect(checkURLForExtensions(url)).toBe(true)
    })

    it('should return false if URL does not contain supported extensions', () => {
      const url = 'https://example.com/style.css'
      expect(checkURLForExtensions(url)).toBe(false)
    })
  })

  describe('checkURLForNuxt', () => {
    it('should return true if URL contains "_nuxt"', () => {
      const url = 'https://example.com/_nuxt/app.js'
      expect(checkURLForNuxt(url)).toBe(true)
    })

    it('should return false if URL does not contain "_nuxt"', () => {
      const url = 'https://example.com/assets/app.js'
      expect(checkURLForNuxt(url)).toBe(false)
    })
  })

  describe('checkURLForLocalhost', () => {
    it('should return true if URL contains "localhost"', () => {
      const url = 'http://localhost:3000'
      expect(checkURLForLocalhost(url)).toBe(true)
    })

    it('should return false if URL does not contain "localhost"', () => {
      const url = 'https://example.com'
      expect(checkURLForLocalhost(url)).toBe(false)
    })
  })

  describe('isValidBase64', () => {
    it('should return true if string is valid Base64 encoded data', () => {
      const str = 'SGVsbG8gd29ybGQ='
      expect(isValidBase64(str)).toBe(true)
    })

    it('should return false if string is not valid Base64 encoded data', () => {
      const str = 'Hello world'
      expect(isValidBase64(str)).toBe(false)
    })
  })

  describe('containsImageOrImg', () => {
    it('should return true if string contains "image"', () => {
      const str = 'This is an image'
      expect(containsImageOrImg(str)).toBe(true)
    })

    it('should return true if string contains "img"', () => {
      const str = 'This is an img tag'
      expect(containsImageOrImg(str)).toBe(true)
    })

    it('should return false if string does not contain "image" or "img"', () => {
      const str = 'This is a text'
      expect(containsImageOrImg(str)).toBe(false)
    })
  })
})
