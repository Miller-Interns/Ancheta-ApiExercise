<template>
  <div id="app" @click="unmuteAudio">
    <!-- Global background music -->
    <audio ref="bgAudio" :src="audioFile" loop autoplay muted></audio>

    <!-- Background layout (slideshow + other content) -->
    <BackgroundLayout />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import BackgroundLayout from './layouts/BackgroundLayout.vue'

const audioFile = '/music/hpmusic.mp3'
const bgAudio = ref<HTMLAudioElement | null>(null)

const unmuteAudio = () => {
  if (bgAudio.value && bgAudio.value.muted) {
    bgAudio.value.muted = false
    bgAudio.value.play().catch(() => {
      console.log('User interaction required to play audio')
    })
  }
}

onMounted(() => {
  // Try to autoplay (muted)
  bgAudio.value?.play().catch(() => {
    console.log('Autoplay blocked')
  })
})
</script>
