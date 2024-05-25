<script setup lang="ts">
const color = useColorMode()

const dataStore = useDataStore()

const { urlData } = storeToRefs(dataStore)

const lastUpdate = useTimeAgo(() => urlData.value ? useLocalTime(urlData.value.created_at) : '')

function toggleDark() {
  color.preference = color.value === 'dark' ? 'light' : 'dark'
}
</script>

<template>
  <Badge text-3xl font-200 />
  <div flex="~ gap-1 items-center wrap" text-sm :class="!lastUpdate && 'animate-pulse'">
    <span op50>Last Update</span>
    <span op50>{{ lastUpdate ? lastUpdate : '...' }}</span>
  </div>
  <div flex="~ gap-3 items-center wrap" py4>
    <NuxtLink
      to="/"
      px3 py1 text-base btn-action
      active-class="btn-action-active"
    >
      <div i-carbon-wifi flex-none />
      Immediate
    </NuxtLink>
    <NuxtLink
      to="/history"
      px3 py1 text-base btn-action
      active-class="btn-action-active"
    >
      <div i-carbon-document-multiple-02 flex-none />
      History
    </NuxtLink>
    <button
      title="Toggle Dark Mode"
      i-carbon-light dark:i-carbon-moon ml1 text-xl op50 hover:op75
      @click="toggleDark()"
    />
    <NuxtLink
      href="https://github.com/CofCat456/http-test-tool" target="_blank"
      i-carbon-logo-github text-lg op50 hover:op75
    />
  </div>
</template>
