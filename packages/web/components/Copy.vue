<script setup lang="ts">
defineProps<{
  text: string
}>()

const { copy, copied } = useClipboard({
  legacy: true,
})
</script>

<template>
  <div cursor-pointer p4 @click="copy(text)">
    <VDropdown
      placement="top"
      :distance="10"
      :triggers="[]"
      :shown="copied"
      :auto-hide="true"
    >
      <div i-carbon-copy :class="copied ? 'text-green' : ''" />
      <template #popper>
        <p m2 text-sm text-green font-mono>
          已複製
        </p>
      </template>
    </VDropdown>
  </div>
</template>
