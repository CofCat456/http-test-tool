<script setup lang="ts">
import { Dropdown } from 'floating-vue'

defineProps<{
  text: string
}>()

const { copy, copied } = useClipboard({
  legacy: true,
})
</script>

<template>
  <div cursor-pointer p4 @click="copy(text)">
    <Dropdown
      placement="top"
      auto-hide
      :distance="10"
      :triggers="[]"
      :shown="copied"
    >
      <div i-carbon-copy :class="copied ? 'text-green' : ''" />
      <template #popper>
        <p m2 text-sm text-green font-mono>
          已複製
        </p>
      </template>
    </Dropdown>
  </div>
</template>
