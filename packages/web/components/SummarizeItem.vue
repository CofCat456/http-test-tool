<script setup lang="ts">
import { Dropdown } from 'floating-vue'

defineProps<{
  icon: string
  color: string
  title: string
  number?: number
}>()
</script>

<template>
  <div flex="~ items-center">
    <Dropdown
      placement="top"
      auto-hide
      :distance="10"
      :triggers="['hover', 'focus']"
    >
      <div
        flex="~ items-center gap-2"
        :class="color"
      >
        <div :class="icon" />
        <span v-if="number" min-w-6 :class="`text-${color}`">{{ number || '' }}</span>
      </div>
      <template #popper>
        <p m2 text-sm font-mono>
          {{ number ?? '' }} {{ title }}
        </p>
      </template>
    </Dropdown>
    <div v-if="!number" mr-6 />
  </div>
</template>
