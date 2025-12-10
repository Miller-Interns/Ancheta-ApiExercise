<template>
  <div class="mt-6">

    <div class="grid grid-cols-[repeat(auto-fill,minmax(220px,1fr))] gap-4">
      <div v-for="house in store.houses" :key="house.house"
        class="border rounded-xl bg-[rgba(255,247,230,0.9)] shadow-sm flex flex-col overflow-hidden">

        <img :src="`/image/${house.house.toLowerCase()}.jpg`" alt="House Image"
          class="w-full max-h-64 object-contain rounded-t-lg mb-4" />

        <div class="px-4 pb-4 flex flex-col gap-1">
          <h3 class="text-xl font-semibold font-[HarryP]">{{ house.house }}</h3>
          <p><strong>Emoji:</strong> {{ house.emoji }}</p>
          <p><strong>Founder:</strong> {{ house.founder }}</p>

          <p class="mt-2 font-semibold">Colors:</p>
          <ul v-if="house.colors.length" class="text-center text-sm">
            <li v-for="(color, i) in house.colors" :key="i" class="flex items-center justify-center gap-2">
              <span class="w-2 h-2 bg-[#3c2a18] rounded-full inline-block"></span>
              <span>{{ color }}</span>
            </li>
          </ul>

          <p v-else class="italic text-gray-600 text-sm">None</p>

          <p class="mt-2"><strong>Animal:</strong> {{ house.animal }}</p>
        </div>
      </div>
    </div>

  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useDataStore } from '@/stores/useDataStore'

const store = useDataStore()

onMounted(() => {
  store.loadHousesPage(1)
})
</script>
