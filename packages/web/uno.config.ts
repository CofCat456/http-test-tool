import {
  defineConfig,
  presetAttributify,
  presetIcons,
  presetTypography,
  presetUno,
  presetWebFonts,
  transformerDirectives,
  transformerVariantGroup,
} from 'unocss'

export default defineConfig({
  shortcuts: {
    'color-base': 'color-neutral-500 dark:color-neutral-300',
    'bg-base': 'bg-white dark:bg-[#222]',
    'border-base': 'border-#aaa3',

    'bg-tooltip': 'bg-white:75 dark:bg-neutral-900:75 backdrop-blur-8',
    'bg-glass': 'bg-white:75 dark:bg-neutral-900:75 backdrop-blur-5',
    'bg-code': 'bg-gray5:5',
    'bg-hover': 'bg-[#222]:5',

    'color-active': 'color-sky-600 dark:color-sky-400',
    'border-active': 'border-sky-600/25 dark:border-sky-400/25',
    'bg-active': 'bg-sky-400:10',

    'btn-action': 'border border-base rounded flex gap-2 items-center px2 py1 op75 hover:op100 hover:bg-hover',
    'btn-action-sm': 'btn-action text-sm',
    'btn-action-active': 'color-active border-active! bg-active op100!',

    'badge': 'border border-base rounded flex items-center px2',
    'badge-active': 'badge border-amber:50 text-amber bg-amber:5',
    'btn-badge': 'badge hover:bg-active',
  },
  presets: [
    presetUno(),
    presetAttributify(),
    presetIcons({
      scale: 1.2,
    }),
    presetTypography(),
    presetWebFonts({
      fonts: {
        sans: 'Inter',
        mono: 'Space Mono',
      },
    }),
  ],
  transformers: [
    transformerDirectives(),
    transformerVariantGroup(),
  ],
})
