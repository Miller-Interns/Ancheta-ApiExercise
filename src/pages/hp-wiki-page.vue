<template>

  <div class="flex flex-col items-start w-full">
    <div class="w-full bg-[#f2e3c6] border-l-[15px] border-r-[15px] md:border-l-[25px] md:border-r-[25px] border-[#d1b38a]
         shadow-inner shadow-[rgba(0,0,0,0.3)] drop-shadow-[0_5px_15px_rgba(0,0,0,0.5)]
         overflow-hidden box-border z-10
         min-h-[120px] sm:min-h-[150px] md:h-[18vh] flex items-center justify-center">
      <div class="px-4 sm:px-6 py-4 sm:py-6 text-center bg-[rgba(255,247,230,0.9)] w-full">
        <h1 class="font-[HarryP] text-[1.8rem] sm:text-[2.2rem] md:text-[2.5rem] text-[#3c2a18] m-0 leading-tight">
          {{ title }}
        </h1>
        <h5 class="mt-1 text-[1rem] sm:text-[1.1rem] md:text-[1.2rem] text-[#4d3722] font-serif leading-tight">
          {{ description }}
        </h5>
      </div>
    </div>


    <div class="w-full ">

      <Button @click="goToHome" class="mt-5 mb-5 bg-gradient-to-b from-[#f7d67a] to-[#c68e3e] text-[#3c2a18]
               font-[HarryP] text-[1.3rem] px-8 py-3 rounded-lg cursor-pointer
               shadow-[0_5px_10px_rgba(0,0,0,0.4)]
               transition-all duration-200 hover:-translate-y-1
               hover:from-[#f9e08f] hover:to-[#d1a55c] active:translate-y-[2px]">
        Go To Home
      </Button>

      <div class="w-[90%] max-w-[1000px] mx-auto text-center py-5
                  bg-[#d1a55c] rounded-lg shadow-lg px-6">

        <div class="flex flex-wrap justify-center gap-2 mb-6">
          <div class="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-3 mb-6">
            <Button v-for="cat in categories" :key="cat.id" @click="selected = cat.id" :class="[
              'px-6 py-2 rounded-md transition-all duration-200 font-[HarryP] text-[#3c2a18]',
              selected === cat.id
                ? 'bg-[#f7d67a] shadow-lg'
                : 'bg-[#bfa06b] shadow-inner text-gray-600 hover:bg-[#c7a77a]'
            ]">
              {{ cat.label }}
            </Button>
          </div>

        </div>

        <Character v-if="selected === 'characters'" />
        <Spell v-if="selected === 'spells'" />
        <Book v-if="selected === 'books'" />
        <HouseGrid v-if="selected === 'houses'" />

      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import HouseGrid from '@/base-components/houses.vue'
import Spell from '@/base-components/spells.vue'
import Character from '@/base-components/characters.vue'
import Book from '@/base-components/books.vue'

const router = useRouter()
const selected = ref('characters')

const title = 'Harry Potter Wiki'
const description = 'A Wiki for all things related to Harry Potter.'

const goToHome = () => router.push({ name: 'Home' })

const categories = [
  { id: 'characters', label: 'Characters' },
  { id: 'spells', label: 'Spells' },
  { id: 'books', label: 'Books' },
  { id: 'houses', label: 'Houses' }
]
</script>
