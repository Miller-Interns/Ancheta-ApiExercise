<template>
  <div class="flex justify-end mt-6 mr-8 ">
    <div class="book-container">
      <div v-for="(page, i) in pages" :key="i" class="page ml-auto " :class="{ flipped: i < pageIndex }">
        <!-- Front Side (Left Page) -->
        <div class="page-front p-4 bg-[rgba(255,247,230,0.9)] border rounded shadow flex flex-col justify-between">
          <transition name="fade">
            <div v-if="!isFlipping && leftPage.length" key="left" class="flex flex-col h-full">
              <div v-for="spell in leftPage" :key="spell.spell"
                class="flex-1 flex flex-col justify-center mb-2 last:mb-0">
                <h3 class="font-semibold font-[HarryP] text-xl">{{ spell.spell }}</h3>
                <p class="text-sm">{{ spell.use }}</p>
              </div>
            </div>
          </transition>
        </div>

        <!-- Back Side (Right Page) -->
        <div class="page-back p-4 bg-[rgba(255,247,230,0.9)] border rounded shadow flex flex-col justify-between">
          <transition name="fade">
            <div v-if="!isFlipping && rightPage.length" key="right" class="flex flex-col h-full">
              <div v-for="spell in rightPage" :key="spell.spell"
                class="flex-1 flex flex-col justify-center mb-2 last:mb-0">
                <h3 class="font-semibold font-[HarryP] text-xl">{{ spell.spell }}</h3>
                <p class="text-sm">{{ spell.use }}</p>
              </div>
            </div>
          </transition>
        </div>
      </div>
    </div>

    <!-- Controls -->
  </div>

  <div class="flex flex-col justify-center ml-6 gap-4">
    <button @click="prevPage" class="mt-5 mb-5 bg-gradient-to-b from-[#f7d67a] to-[#c68e3e] text-[#3c2a18]
             font-[HarryP] text-[1.3rem] px-8 py-3 rounded-lg cursor-pointer
             shadow-[0_5px_10px_rgba(0,0,0,0.4)]
             transition-all duration-200 hover:-translate-y-1
             hover:from-[#f9e08f] hover:to-[#d1a55c] active:translate-y-[2px]">
      Prev
    </button>

    <button @click="nextPage" class="mt-5 mb-5 bg-gradient-to-b from-[#f7d67a] to-[#c68e3e] text-[#3c2a18]
             font-[HarryP] text-[1.3rem] px-8 py-3 rounded-lg cursor-pointer
             shadow-[0_5px_10px_rgba(0,0,0,0.4)]
             transition-all duration-200 hover:-translate-y-1
             hover:from-[#f9e08f] hover:to-[#d1a55c] active:translate-y-[2px]">
      Next
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import { useDataStore } from "@/stores/useDataStore";
import type { Spell } from '@/types'  // <-- import the type

const store = useDataStore();
const pageIndex = ref(0);
const isFlipping = ref(false);

onMounted(() => store.loadSpells());

// Split spells into pages of 3
const pages = computed(() => {
  const result: any[][] = [];
  const spells = store.spells;
  for (let i = 0; i < spells.length; i += 3) {
    result.push(spells.slice(i, i + 3));
  }
  return result;
});

// Left page content
const leftPage = computed(() => pages.value[pageIndex.value * 2] || []);
// Right page content
const rightPage = computed(() => pages.value[pageIndex.value * 2 + 1] || []);

function nextPage() {
  if ((pageIndex.value + 1) * 2 >= pages.value.length) return;

  isFlipping.value = true;

  setTimeout(() => {
    pageIndex.value++;
    isFlipping.value = false;
  }, 200);
}

function prevPage() {
  if (pageIndex.value === 0) return;

  isFlipping.value = true;

  setTimeout(() => {
    pageIndex.value--;
    isFlipping.value = false;
  }, 400);
}
</script>

<style scoped>
.book-container {
  perspective: 1500px;
  width: 400px;
  height: 300px;
  position: relative;
}

.page {
  width: 100%;
  height: 100%;
  position: absolute;
  transform-style: preserve-3d;
  transition: transform 0.8s cubic-bezier(0.2, 0.8, 0.2, 1);
  transform-origin: left center;
}

.page-front,
.page-back {
  width: 100%;
  height: 100%;
  position: absolute;
  backface-visibility: hidden;
}

/* Removed background-color because Tailwind now controls it */

.page-back {
  transform: rotateY(180deg);
}

.page.flipped {
  transform: rotateY(-180deg);
}

/* Fade effect */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
