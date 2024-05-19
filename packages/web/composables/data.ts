import { acceptHMRUpdate, defineStore } from 'pinia'

import type { Data } from '~/types'

export const useDataStore = defineStore('data', () => {
  const urlData = ref<Data>()

  return {
    urlData,
  }
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useDataStore, import.meta.hot))
