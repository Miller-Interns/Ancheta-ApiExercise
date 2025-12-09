<template>
  <div class="w-full mt-6 px-4 sm:px-6 lg:px-8">

    <!-- Book Display -->
    <div v-if="currentBook"
      class="flex flex-col md:flex-row items-start gap-6 max-w-4xl mx-auto bg-[rgba(255,247,230,0.9)] p-6 rounded-xl shadow">

      <!-- Left: Book Cover -->
      <div class="w-full md:w-1/2 flex justify-center">
        <img :src="currentBook.cover" alt="Book Cover"
          class="w-full h-auto max-h-[400px] object-contain rounded-lg shadow" />
      </div>

      <!-- Right: Book Details -->
      <div class="w-full md:w-1/2 flex flex-col gap-3">
        <h2 class="text-2xl font-[HarryP] font-semibold">{{ currentBook.title }}</h2>
        <p><strong>Original Title:</strong> {{ currentBook.originalTitle }}</p>
        <p><strong>Release Date:</strong> {{ currentBook.releaseDate }}</p>
        <p><strong>Description:</strong> {{ currentBook.description }}</p>
        <p><strong>Pages:</strong> {{ currentBook.pages }}</p>
      </div>
    </div>

    <!-- Pagination Controls -->
    <div class="flex justify-center gap-3 mt-6">
      <button @click="prevPage" :disabled="currentPage === 1" class="px-4 py-2 bg-[#f2e3c6] rounded shadow">
        < </button>

          <button v-for="num in totalPages" :key="num" @click="goToPage(num)"
            :class="num === currentPage ? 'px-3 py-1 rounded shadow font-semibold bg-[#c8b083] text-white' : 'px-3 py-1 rounded shadow font-semibold bg-[#f2e3c6]'">
            {{ num }}
          </button>

          <button @click="nextPage" :disabled="currentPage === totalPages"
            class="px-4 py-2 bg-[#f2e3c6] rounded shadow">></button>
    </div>

  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useDataStore } from '@/stores/useDataStore'

const store = useDataStore()
const currentPage = ref(1)
const itemsPerPage = 1  // one book per page

// Load books on mount
onMounted(() => store.loadBooksPage(currentPage.value))

// Compute total pages
const totalPages = computed(() => Math.ceil(store.bookTotalCount / itemsPerPage))

// Current book based on page
const currentBook = computed(() => store.books[0] || null) // store.books is updated on page load

// Pagination functions
function goToPage(page: number) {
  currentPage.value = page
  store.loadBooksPage(currentPage.value)
}

function nextPage() {
  if (currentPage.value < totalPages.value) goToPage(currentPage.value + 1)
}

function prevPage() {
  if (currentPage.value > 1) goToPage(currentPage.value - 1)
}
</script>
