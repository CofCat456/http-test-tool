<script setup lang="ts">
import type { ParseData } from './types'

import { appName } from '~/constants'

import './style/global.css'

const dataStore = useDataStore()

const { urlData } = storeToRefs(dataStore)

const host = import.meta.server ? 'localhost:3000' : location?.host ?? 'localhost:3000'

const { data } = useWebSocket(`ws://${host}/api/ws`, {
  onMessage: () => {
    const parsedData = JSON.parse(data.value) as ParseData

    urlData.value = {
      ...parsedData,
      data: JSON.parse(parsedData.data),
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
