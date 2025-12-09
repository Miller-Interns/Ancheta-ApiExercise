<template>
  <div class="grid grid-cols-[repeat(auto-fill,minmax(220px,1fr))] gap-4 mt-6">

    <div v-for="house in store.houses" :key="house.house"
      class="border rounded-xl bg-[rgba(255,247,230,0.9)] shadow-sm flex flex-col overflow-hidden">

      <!-- House Image (max height, fully visible) -->
      <img :src="`/image/${house.house.toLowerCase()}.jpg`" alt="House Image"
        class="w-full max-h-64 object-contain rounded-t-lg mb-4" />

      <!-- House Info -->
      <div class="px-4 pb-4 flex flex-col gap-1">
        <h3 class="text-xl font-semibold font-[HarryP]">{{ house.house }}</h3>

        <p><strong>Emoji:</strong> {{ house.emoji }}</p>
        <p><strong>Founder:</strong> {{ house.founder }}</p>

        <p class="mt-2 font-semibold">Colors:</p>
        <ul v-if="house.colors.length" class="list-disc ml-6 text-sm">
          <li v-for="(color, i) in house.colors" :key="i">{{ color }}</li>
        </ul>
        <p v-else class="italic text-gray-600 text-sm">None</p>

        <p class="mt-2"><strong>Animal:</strong> {{ house.animal }}</p>
      </div>
    </div>

  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useDataStore } from '@/stores/useDataStore'
import type { House } from '@/types'  // <-- import the type

const store = useDataStore()

onMounted(() => {
  store.loadHouses()
})
</script>
