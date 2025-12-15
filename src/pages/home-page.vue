<template>
  <div class="min-h-screen flex flex-col justify-center items-center">

    <div class="bg-[rgba(255,247,230,0.7)] px-[60px] py-[40px]
             border-l-[20px] border-r-[20px] border-[#d1b38a]
             rounded-lg text-center mb-5
             shadow-inner shadow-[rgba(0,0,0,0.3)]
             drop-shadow-[0_5px_15px_rgba(0,0,0,0.5)]">
      <h1 class="font-[HarryP] text-[2.5rem] text-[#3c2a18] m-0">
        {{ title }}
      </h1>
      <h5 class="text-[1.2rem] text-[#4d3722] font-serif mt-1">
        {{ description }}
      </h5>
    </div>

    <button class="bg-gradient-to-b from-[#f7d67a] to-[#c68e3e] text-[#3c2a18]
             px-8 py-3 rounded-xl cursor-pointer font-[HarryP] text-[1.3rem]
             shadow-[0_5px_10px_rgba(0,0,0,0.4)]
             transition-all duration-200 relative z-10
             hover:-translate-y-1 hover:from-[#f9e08f] hover:to-[#d1a55c]
             active:translate-y-[2px]" @click="goToHome()">
      Enter the Wiki
    </button>

  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()
const title = 'Harry Potter Wiki'
const description = 'This is a wiki for all things related to Harry Potter.'

const goToHome = () => router.push({ name: 'Wiki' })
</script>
