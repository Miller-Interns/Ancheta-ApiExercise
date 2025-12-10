<template>
  <div class="w-full mt-6 px-4 sm:px-6 lg:px-8">

    <div class="flex flex-col items-center w-full">
      <div v-for="spell in store.spells" :key="spell.spell"
        class="border p-4 rounded-xl mb-6 w-full max-w-[700px] flex flex-col gap-2 bg-[rgba(255,247,230,0.9)]">
        <h3 class="font-semibold font-serif text-xl">{{ spell.spell }}</h3>
        <p class="text-sm">{{ spell.use }}</p>
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
import { ref, computed, onMounted, watch } from 'vue'
import { useDataStore } from '@/stores/useDataStore'

const store = useDataStore()
const currentPage = ref(1)

const totalPages = computed(() => {
  return Math.ceil(store.spellTotalCount / store.spellItemsPerPage) || 1
})

watch(() => store.spellTotalCount, () => {
  if (currentPage.value > totalPages.value) {
    currentPage.value = totalPages.value
  }
})

onMounted(() => store.loadSpellsPage(currentPage.value))

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
