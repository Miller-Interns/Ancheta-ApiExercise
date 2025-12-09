<template>
  <div class="w-full mt-6 px-4 sm:px-6 lg:px-8 overflow-x-hidden">

    <!-- Carousel -->
    <Carousel :value="bookGroups" :numVisible="1" :numScroll="1" :circular="bookGroups.length > 1" :autoplayInterval="0"
      class="w-full">
      <!-- Custom Prev Button -->
      <template #previcon>
        <button
          class="text-xl font-[HarryP] px-4 py-2 bg-[#f2e3c6] text-black font-semibold rounded-lg shadow hover:bg-[#e7d4b2] transition">
          Prev
        </button>
      </template>

      <!-- Custom Next Button -->
      <template #nexticon>
        <button
          class="text-xl font-[HarryP] px-4 py-2 bg-[#f2e3c6] text-black font-semibold rounded-lg shadow hover:bg-[#e7d4b2] transition">
          Next
        </button>
      </template>

      <!-- Book Card -->
      <template #item="{ data: group }">
        <div class="flex flex-col items-center w-full">
          <div v-for="book in group" :key="book.title"
            class="border rounded-xl shadow p-4 w-full max-w-md bg-[rgba(255,247,230,0.9)] flex flex-col">
            <h3 class="text-xl font-serif font-semibold mb-2">{{ book.title }}</h3>
            <p><strong>Original Title:</strong> {{ book.originalTitle }}</p>
            <p><strong>Release Date:</strong> {{ book.releaseDate }}</p>
            <p><strong>Description:</strong> {{ book.description }}</p>
            <p><strong>Pages:</strong> {{ book.pages }}</p>

            <img :src="book.cover" alt="Cover Image" class="mt-3 w-full h-auto object-contain rounded-lg" />
          </div>

        </div>
      </template>
    </Carousel>
  </div>
</template>

<script setup lang="ts">
import { onMounted, computed } from 'vue'
import Carousel from 'primevue/carousel'
import { useDataStore } from '@/stores/useDataStore'
import type { Book } from '@/types'  // <-- import the type

const store = useDataStore()

onMounted(() => store.loadBooks())

// Group books into slides of 1 per carousel
const bookGroups = computed(() => {
  const groups: any[][] = []
  const books = store.books
  for (let i = 0; i < books.length; i += 1) {
    groups.push([books[i]])
  }
  return groups
})
</script>
