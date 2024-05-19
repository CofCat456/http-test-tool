<script setup lang="ts">
defineProps<{
  name: string
}>()
</script>

<template>
  <p text-base text-sky font-mono italic>
    {{ name.charAt(0).toUpperCase() + name.slice(1) }}
  </p>
</template>
