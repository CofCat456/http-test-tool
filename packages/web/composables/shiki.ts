import type { HighlighterCore } from 'shiki/core'
import { getHighlighterCore } from 'shiki/core'

export const shiki = shallowRef<HighlighterCore>()

getHighlighterCore({
  themes: [
    import('shiki/themes/vitesse-light.mjs'),
    import('shiki/themes/vitesse-dark.mjs'),
  ],
  langs: [
    import('shiki/langs/javascript.mjs'),
    import('shiki/langs/typescript.mjs'),
  ],
  loadWasm: import('shiki/wasm'),
}).then((highlighter) => {
  shiki.value = highlighter
})

export function sanitizeHtml(html: string) {
  return html.replace(/</g, '&lt;').replace(/>/g, '&gt;')
}
