<script setup lang="ts">
import type { Data } from '~/types'

const dataStore = useDataStore()

const { urlData } = storeToRefs(dataStore)

const date = ref(useDateFormat(useNow(), 'YYYY-MM-DD HH:mm:ss'))

const { data, refresh } = await useFetch<Data[]>('/api/urlByDate', {
  query: { date: date.value },
})

const parsedData = computed(() =>
  data.value
    ? data.value.map(item => ({
      ...item,
      data: JSON.parse(String(item.data)),
    }))
    : [],
)

const getTotalGetRequests = computed(() => parsedData.value.filter(item => item.event === 'GET').length)
const getTotalPostRequests = computed(() => parsedData.value.length - getTotalGetRequests.value)

watch(urlData, () => {
  refresh()
}, {
  deep: true,
})
</script>

<template>
  <Suspense>
    <ClientOnly>
      <div flex="~ col gap-3" my4>
        <div text-gray:75>
          There are a total of <span text-sky>{{ parsedData.length }}</span> records, including
          <span text-sky>{{ getTotalGetRequests }}  GET</span> requests
          and <span text-sky>{{ getTotalPostRequests }} POST</span> requests.
        </div>
        <template v-for="item, index of parsedData" :key="item.id">
          <HistoryItem :index v-bind="item" />
        </template>
      </div>
    </ClientOnly>
    <template #fallback>
      <Loading />
    </template>
  </Suspense>
</template>
