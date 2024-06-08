<script setup lang="ts">
import Fuse from 'fuse.js'

import type { Data } from '~/types'

const dataStore = useDataStore()

const { urlData } = storeToRefs(dataStore)

const date = ref(useDateFormat(useNow(), 'YYYY-MM-DD HH:mm:ss'))
const datasState = ref<boolean[]>([])

const { data, pending, refresh } = await useFetch<Data[]>('/api/url', {
  query: { date: date.value },
})

const parsedData = computed(() => data.value
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

// filter
const search = ref('')
const filtered = ref(parsedData.value)

const fuse = computed(() => new Fuse(parsedData.value, {
  keys: ['created_at', 'url'],
  threshold: 0.5,
}))

debouncedWatch(
  [search, () => parsedData.value],
  () => {
    if (search.value.length === 0)
      return filtered.value = parsedData.value

    filtered.value = fuse.value.search(search.value).map(i => i.item)
  },
  {
    debounce: 200,
  },
)
</script>

<template>
  <div flex="~ col gap-3" py4>
    <div relative flex>
      <input
        v-model="search"
        placeholder="Filter matching with url..."
        border="~ base rounded-full"
        :class="search ? 'font-mono' : ''" w-full bg-transparent px3 py2 pl10
        outline-none
      >
      <div absolute bottom-0 left-0 top-0 flex="~ items-center justify-center" p4 op50>
        <div i-carbon:search />
      </div>
    </div>
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

    <Loading v-if="pending" />
    <template v-else-if="!parsedData.length">
      <div mt5 italic op50>
        No matched data.
      </div>
    </template>
    <template v-else>
      <template v-for="item, idx of filtered" :key="item.id">
        <HistoryItem v-bind="item" v-model:open="datasState[idx]" :idx />
      </template>
    </template>
  </div>
</template>
