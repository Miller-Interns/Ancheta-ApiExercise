<template>
  <div class="w-full mt-6 px-4 sm:px-6 lg:px-8">

    <div class="flex flex-col items-center w-full">
      <div v-for="char in store.characters" :key="char.fullName" class="border p-4 rounded-xl mb-6 w-full max-w-[700px]
         flex flex-col sm:flex-row gap-4
         bg-[rgba(255,247,230,0.9)]">

        <img :src="char.image" alt="Character Image" class="w-32 h-32 object-cover rounded-lg mx-auto sm:mx-0" />

        <div class="flex-1 text-center sm:text-left">
          <h3 class="font-semibold text-lg">{{ char.fullName }}</h3>
          <p><strong>Nickname:</strong> {{ char.nickname }}</p>
          <p><strong>House:</strong> {{ char.hogwartsHouse }}</p>
          <p><strong>Interpreted by:</strong> {{ char.interpretedBy }}</p>
          <p><strong>Birth Date:</strong> {{ char.birthdate }}</p>
          <p>
            <strong>Children:</strong>
            {{ char.children.length ? char.children.join(', ') : 'None' }}
          </p>
        </div>

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
import { ref, computed, onMounted } from 'vue';
import { useDataStore } from '@/stores/useDataStore';

const store = useDataStore();

const currentPage = ref(1);
const itemsPerPage = 3;

const totalPages = computed(() => Math.ceil(store.charTotalCount / itemsPerPage));

onMounted(() => {
  store.loadCharactersPage(currentPage.value);
});

function nextPage(): void {
  if (currentPage.value < totalPages.value) {
    currentPage.value++;
    store.loadCharactersPage(currentPage.value);
  }
}

function prevPage(): void {
  if (currentPage.value > 1) {
    currentPage.value--;
    store.loadCharactersPage(currentPage.value);
  }
}

function goToPage(page: number): void {
  currentPage.value = page;
  store.loadCharactersPage(currentPage.value);
}
</script>
