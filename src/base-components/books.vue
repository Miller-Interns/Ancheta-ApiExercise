<template>
  <div class="w-full mt-6 px-4 sm:px-6 lg:px-8">
    <div v-if="currentBook"
      class="flex flex-col md:flex-row items-start gap-6 max-w-4xl mx-auto bg-[rgba(255,247,230,0.9)] p-6 rounded-xl shadow">

      <div class="w-full md:w-1/2 flex justify-center">
        <img :src="currentBook.cover" alt="Book Cover"
          class="w-full h-auto max-h-[400px] object-contain rounded-lg shadow" />
      </div>

      <div class="w-full md:w-1/2 flex flex-col gap-3">
        <h2 class="text-2xl font-serif font-semibold">{{ currentBook.title }}</h2>
        <p><strong>Original Title:</strong> {{ currentBook.originalTitle }}</p>
        <p><strong>Release Date:</strong> {{ currentBook.releaseDate }}</p>
        <p><strong>Description:</strong> {{ currentBook.description }}</p>
        <p><strong>Pages:</strong> {{ currentBook.pages }}</p>
      </div>
    </div>

    <div class="flex flex-wrap justify-center items-center gap-2 sm:gap-3 mt-6">
      <button @click="prevPage" :disabled="currentPage === 1" class="px-3 sm:px-4 py-2 bg-[#f2e3c6] rounded shadow text-sm sm:text-base
           disabled:opacity-40 disabled:cursor-not-allowed
           hover:bg-[#e5d3b5] transition">
        &lt;
      </button>

      <button v-for="num in totalPages" :key="num" @click="goToPage(num)" class="px-3 py-1 sm:px-4 sm:py-2 rounded shadow font-semibold text-sm sm:text-base
           transition" :class="num === currentPage
            ? 'bg-[#c8b083] text-white shadow-md'
            : 'bg-[#f2e3c6] hover:bg-[#e5d3b5] text-[#3c2a18]'">
        {{ num }}
      </button>

      <button @click="nextPage" :disabled="currentPage === totalPages" class="px-3 sm:px-4 py-2 bg-[#f2e3c6] rounded shadow text-sm sm:text-base
           disabled:opacity-40 disabled:cursor-not-allowed
           hover:bg-[#e5d3b5] transition">
        &gt;
      </button>

    </div>


  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useDataStore } from '@/stores/useDataStore'

const store = useDataStore()
const currentPage = ref(1)
const itemsPerPage = 1

onMounted(() => store.loadBooksPage(currentPage.value))

const totalPages = computed(() => Math.ceil(store.bookTotalCount / itemsPerPage))

const currentBook = computed(() => store.books[0] || null)
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
