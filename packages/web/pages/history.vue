<script setup lang="ts">
import type { Data } from '~/types'

const dataStore = useDataStore()

const { urlData } = storeToRefs(dataStore)

const date = ref(useDateFormat(useNow(), 'YYYY-MM-DD HH:mm:ss'))

const { data, refresh } = await useFetch<Data[]>('/api/url', {
  query: { date: date.value, count: 100 },
})

const datasState = ref<boolean[]>([])

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

function expandAll() {
  datasState.value = datasState.value.map(() => true)
}

function collapseAll() {
  datasState.value = datasState.value.map(() => false)
}

watchImmediate(parsedData, (newVal) => {
  datasState.value = newVal.map((_, idx) => datasState.value[idx] ?? true)
})

watchDeep(urlData, () => {
  refresh()
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

        <div flex="~ gap-2 items-center wrap">
          <div flex-auto />
          <button
            px3 btn-action
            @click="expandAll"
          >
            Expand All
          </button>
          <button
            px3 btn-action
            @click="collapseAll"
          >
            Collapse All
          </button>
        </div>

        <template v-for="item, idx of parsedData" :key="item.id">
          <HistoryItem v-bind="item" v-model:open="datasState[idx]" :idx />
        </template>
      </div>
    </ClientOnly>
    <template #fallback>
      <Loading />
    </template>
  </Suspense>
</template>
