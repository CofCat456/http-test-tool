<script setup lang="ts">
defineProps<{
  code: any
}>()
</script>

<template>
  <pre block max-w-full of-auto break-words text-base leading-relaxed font-mono v-text="JSON.stringify(code, null, 4)" />
</template>

<style scoped>
 pre {
  page-break-inside: avoid;
}
</style>
