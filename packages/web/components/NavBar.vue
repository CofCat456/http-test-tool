<script setup lang="ts">
const color = useColorMode()

function toggleDark() {
  color.preference = color.value === 'dark' ? 'light' : 'dark'
}
</script>

<template>
  <Badge text-3xl font-200 />
  <LastUpdateTime />
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
