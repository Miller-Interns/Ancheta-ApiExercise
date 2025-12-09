<template>
  <div class="w-full mt-6 px-4 sm:px-6 lg:px-8">

    <!-- Spell List -->
    <div class="flex flex-col items-center w-full">
      <div v-for="spell in store.spells" :key="spell.spell"
        class="border p-4 rounded-xl mb-6 w-full max-w-[700px] flex flex-col gap-2 bg-[rgba(255,247,230,0.9)]">
        <h3 class="font-semibold font-serif text-xl">{{ spell.spell }}</h3>
        <p class="text-sm">{{ spell.use }}</p>
      </div>
    </div>

    <!-- Pagination -->
    <div class="flex justify-center gap-3 mt-4">
      <button @click="prevPage" :disabled="currentPage === 1" class="px-4 py-2 bg-[#f2e3c6] rounded shadow">
        < </button>

          <button v-for="num in totalPages" :key="num" @click="goToPage(num)"
            class="px-3 py-1 rounded shadow font-semibold"
            :class="num === currentPage ? 'bg-[#c8b083] text-white' : 'bg-[#f2e3c6]'">
            {{ num }}
          </button>

          <button @click="nextPage" :disabled="currentPage === totalPages"
            class="px-4 py-2 bg-[#f2e3c6] rounded shadow">></button>
    </div>

  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'
import { useDataStore } from '@/stores/useDataStore'

const store = useDataStore()
const currentPage = ref(1)
const itemsPerPage = 3

// Compute total pages safely based on API total count
const totalPages = computed(() => {
  return Math.ceil(store.spellTotalCount / store.spellItemsPerPage) || 1
})

// Watch for totalCount changes and reset current page if needed
watch(() => store.spellTotalCount, () => {
  if (currentPage.value > totalPages.value) {
    currentPage.value = totalPages.value
  }
})

// Load first page on mount
onMounted(() => store.loadSpellsPage(currentPage.value))

// Pagination controls
function nextPage() {
  if (currentPage.value < totalPages.value) {
    currentPage.value++
    store.loadSpellsPage(currentPage.value)
  }
}

function prevPage() {
  if (currentPage.value > 1) {
    currentPage.value--
    store.loadSpellsPage(currentPage.value)
  }
}

function goToPage(page: number) {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page
    store.loadSpellsPage(currentPage.value)
  }
}
</script>
