<script setup lang="ts">
import { appName } from '~/constants'

import { version } from '~~/package.json'
</script>

<template>
  <div>
    <a
      href="https://github.com/CofCat456/http-test-tool" target="_blank"
      flex="inline gap-2 items-center" mr1
    >
      {{ appName }}
    </a>
    <a
      ml1 inline-block translate-y--5 text-0.6em font-200 font-mono op50
      :href="`https://github.com/CofCat456/http-test-tool/releases/tag/v${version}`" target="_blank"
    >
      v{{ version }}
    </a>
  </div>
</template>
