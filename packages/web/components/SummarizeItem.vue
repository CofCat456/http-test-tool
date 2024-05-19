<script setup lang="ts">
defineProps<{
  icon: string
  color: string
  title: string
  number?: number
}>()
</script>

<template>
  <div flex="~ items-center">
    <VDropdown
      placement="top"
      :distance="10"
      :triggers="['hover', 'focus']"
      :auto-hide="true"
    >
      <div
        flex="~ items-center gap-2"
        :class="color"
      >
        <div :class="icon" />
        <span v-if="number" min-w-6 :class="`text-${color}`">{{ number || '' }}</span>
      </div>
      <template #popper>
        <p m2 text-sm text-green font-mono>
          {{ number ?? '' }} {{ title }}
        </p>
      </template>
    </VDropdown>
    <div v-if="!number" mr-6 />
  </div>
</template>
