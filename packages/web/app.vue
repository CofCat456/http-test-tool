<script setup lang="ts">
import { isDeepEqual } from '@antfu/utils'
import 'floating-vue/dist/style.css'
import './style/global.css'

import type { ParseData } from './types'

import { appName } from '~/constants'

const dataStore = useDataStore()

const { urlData } = storeToRefs(dataStore)

const host = import.meta.server ? 'localhost:3000' : location?.host ?? 'localhost:3000'

const { data } = useWebSocket(`ws://${host}/api/ws`, {
  onMessage: () => {
    const parsedData = JSON.parse(data.value) as ParseData

    const newData = {
      ...parsedData,
      data: JSON.parse(parsedData.data),
    }

    if (!isDeepEqual(urlData.value, newData)) {
      urlData.value = {
        ...newData,
      }
    }
  },
})

useHead({
  title: appName,
})
</script>

<template>
  <NuxtLayout>
    <NavBar />
    <NuxtPage />
  </NuxtLayout>
</template>
