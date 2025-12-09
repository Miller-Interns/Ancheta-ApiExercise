<template>
  <div class="w-full mt-6 px-4 sm:px-6 lg:px-8 overflow-x-hidden">

    <!-- Search + Sort Controls -->
    <div class="flex flex-wrap justify-center gap-4 mb-6">
      <input v-model="searchQuery" placeholder="Search characters..."
        class="px-4 py-2 border rounded-lg shadow-sm w-full sm:w-60 focus:outline-none focus:ring-2 focus:ring-blue-400" />

      <select v-model="sortOption"
        class="px-4 py-2 border rounded-lg shadow-sm w-full sm:w-52 focus:outline-none focus:ring-2 focus:ring-blue-400">
        <option value="nameAsc">Name (A–Z)</option>
        <option value="nameDesc">Name (Z–A)</option>
        <option value="house">House</option>
        <option value="birthAsc">Birthdate (Old → New)</option>
        <option value="birthDesc">Birthdate (New → Old)</option>
      </select>
    </div>

    <!-- Carousel -->
    <Carousel :value="characterGroups" :numVisible="1" :numScroll="1" :circular="characterGroups.length > 1"
      :autoplayInterval="0" class="w-full overflow-hidden">

      <!-- Custom Prev Button -->
      <template #previcon>
        <button
          class="font-[HarryP] px-4 py-2 bg-[#f2e3c6] text-black font-semibold rounded-lg shadow hover:bg-[#e7d4b2] transition">
          Prev
        </button>
      </template>

      <!-- Custom Next Button -->
      <template #nexticon>
        <button
          class="font-[HarryP] px-4 py-2 bg-[#f2e3c6] text-black font-semibold rounded-lg shadow hover:bg-[#e7d4b2] transition">
          Next
        </button>
      </template>

      <!-- Character Card Group -->
      <template #item="{ data: group }">
        <div class="flex flex-col gap-4 items-center w-full">

          <div v-for="char in group" :key="char.fullName" class="flex flex-wrap sm:flex-nowrap gap-4 border p-4 rounded-xl shadow-sm
         w-full max-w-full md:max-w-[700px] overflow-hidden bg-[rgba(255,247,230,0.9)]">


            <!-- Character Image -->
            <img :src="char.image" alt="Character Image"
              class="w-20 h-20 sm:w-28 sm:h-28 md:w-32 md:h-32 object-cover rounded-lg flex-shrink-0" />

            <!-- Info Section -->
            <div class="flex flex-col sm:flex-row gap-4 flex-1 min-w-0 overflow-hidden">

              <!-- Left -->
              <div class="flex flex-col gap-1 flex-1 min-w-0">
                <h3 class="font-semibold text-lg truncate">{{ char.fullName }}</h3>
                <p class="truncate"><strong>Nickname:</strong> {{ char.nickname }}</p>
                <p class="truncate"><strong>House:</strong> {{ char.hogwartsHouse }}</p>
                <p class="truncate"><strong>Interpreted by:</strong> {{ char.interpretedBy }}</p>
                <p class="truncate"><strong>Birth Date:</strong> {{ char.birthdate }}</p>
              </div>

              <!-- Right -->
              <div class="flex flex-col gap-1 flex-1 min-w-0 overflow-y-auto pr-2">
                <p class="font-semibold">Children:</p>
                <ul v-if="char.children.length" class="list-disc ml-5 text-sm">
                  <li v-for="(child, i) in char.children" :key="i" class="leading-tight">
                    {{ child }}
                  </li>
                </ul>
                <p v-else class="italic text-gray-500 text-sm">None</p>
              </div>

            </div>
          </div>

        </div>
      </template>
    </Carousel>

  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import Carousel from 'primevue/carousel'
import { useDataStore } from '@/stores/useDataStore'
import type { Character } from '@/types'


const store = useDataStore()

const searchQuery = ref<string>('')
const sortOption = ref<'nameAsc' | 'nameDesc' | 'house' | 'birthAsc' | 'birthDesc'>('nameAsc')

onMounted(() => {
  store.loadCharacters()
})

const filteredCharacters = computed(() => {
  const q = searchQuery.value.toLowerCase();
  return (store.characters as Character[]).filter((c: Character) =>
    c.fullName.toLowerCase().includes(q) ||
    c.nickname.toLowerCase().includes(q) ||
    c.hogwartsHouse.toLowerCase().includes(q) ||
    c.interpretedBy.toLowerCase().includes(q) ||
    c.children.some((child: string) => child.toLowerCase().includes(q))
  );
});



const sortedCharacters = computed(() => {
  const chars = [...filteredCharacters.value]
  switch (sortOption.value) {
    case 'nameAsc': return chars.sort((a, b) => a.fullName.localeCompare(b.fullName))
    case 'nameDesc': return chars.sort((a, b) => b.fullName.localeCompare(a.fullName))
    case 'house': return chars.sort((a, b) => a.hogwartsHouse.localeCompare(b.hogwartsHouse))
    case 'birthAsc': return chars.sort((a, b) => new Date(a.birthdate).getTime() - new Date(b.birthdate).getTime())
    case 'birthDesc': return chars.sort((a, b) => new Date(b.birthdate).getTime() - new Date(a.birthdate).getTime())
    default: return chars
  }
})

const characterGroups = computed((): any[][] => {
  const groups: any[][] = []
  const chars = sortedCharacters.value
  for (let i = 0; i < chars.length; i += 3) {
    groups.push(chars.slice(i, i + 3))
  }
  return groups
})
</script>
