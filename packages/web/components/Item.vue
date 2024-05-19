<script setup lang="ts" generic="T">
defineProps<{
  index: number
  name: string
  noColor?: boolean
  value: T
}>()

const open = defineModel('open', {
  default: false,
})

const hasShown = ref(open.value)
if (!hasShown.value) {
  const stop = watchEffect(() => {
    if (open.value) {
      hasShown.value = true
      stop()
    }
  })
}
</script>

<template>
  <details
    :open
    border="~ rounded-lg base" relative
    @toggle="open = $event.target.open"
  >
    <summary block>
      <div class="absolute right-[calc(100%+10px)] top-1.5" text-right font-mono op35 lt-lg:hidden>
        #{{ index }}
      </div>
      <div flex="~ gap-2 wrap items-center" cursor-pointer select-none bg-hover px2 py2 text-sm font-mono>
        <div class="[details[open]_&]:rotate-90" i-carbon-chevron-right text-base op50 transition />
        <ColorizedName v-if="name && !noColor" :name="name" />
        <span v-else>{{ name }}</span>
      </div>
    </summary>

    <div v-if="hasShown" flex="~ col gap-4" relative of-auto px4 py3>
      <template v-if="!Array.isArray(value) && typeof value === 'object'">
        <Shiki
          lang="ts"
          :code="stringifyUnquoted(value)"
          max-h-100 max-w-full w-full of-scroll rounded bg-code p2 text-sm
        />
        <Copy absolute bottom-0 right-2 top-2 op50 :text="JSON.stringify(value, null, 4)" />
      </template>
      <template v-else>
        <div flex="~ items-center gap-2" of-auto>
          原始欄位：
          <div>
            <span badge>{{ name }}</span>
          </div>
        </div>
        <div flex="~ items-center gap-2" of-auto>
          值：
          <div>
            <span badge>{{ value }}</span>
          </div>
        </div>
        <div>
          <NuxtImg
            v-if="value && containsImageOrImg(name) && isValidBase64(value)"
            placeholder
            :src="`data:image/jpeg;base64,${String(value)}`"
          />
        </div>
      </template>
    </div>
  </details>
</template>
