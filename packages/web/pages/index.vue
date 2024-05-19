<script setup lang="ts">
const dataStore = useDataStore()

const { urlData } = storeToRefs(dataStore)
</script>

<template>
  <div v-if="urlData">
    <div flex="~ col gap-3" my4>
      <div relative flex class="group">
        <input
          v-model="urlData.url"
          placeholder="Loading Last Url..."
          border="~ base rounded-full"

          disabled w-full bg-transparent px10 py2 outline-none
          :class="urlData.data ? 'font-mono' : ''"
        >
        <div absolute bottom-0 left-0 top-0 flex="~ items-center justify-center" p4 op50>
          <div i-carbon-link />
        </div>

        <Copy absolute bottom-0 right-0 top-0 op0 transition-opacity group-hover:op100 flex="~ items-center justify-center" :text="urlData.url" />
      </div>

      <div flex="~ gap-2 items-center wrap" mb-2>
        <div>
          <div
            flex="~ gap-2 items-center wrap"
            border="~ sky/20 rounded-full" bg-sky:10 px3 py1
          >
            <div i-carbon-information text-sky />
            {{ urlData.event }}
          </div>
        </div>
      </div>

      <Item name="Source Data" no-color :index="0" :value="urlData.data" />

      <template v-for="(value, name, index) of urlData.data" :key="name">
        <Item
          :index="index + 1"
          :name
          :value
        />
      </template>
    </div>
  </div>
  <Loading v-else />
</template>
