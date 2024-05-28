<script setup lang="ts">
const dataStore = useDataStore()

const { urlData } = storeToRefs(dataStore)

const lastUpdate = useTimeAgo(() => urlData.value ? useLocalTime(urlData.value.created_at) : '')
</script>

<template>
  <div flex="~ gap-1 items-center wrap" text-sm :class="!lastUpdate && 'animate-pulse'">
    <span op50>Last Update</span>
    <span op50>{{ lastUpdate ? lastUpdate : '...' }}</span>
  </div>
</template>
