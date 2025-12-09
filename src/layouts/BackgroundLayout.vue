<template>
  <div class="background-layout">
    <!-- Slideshow layers -->
    <div v-for="(image, index) in images" :key="index" class="slideshow-layer"
      :style="{ backgroundImage: 'url(' + image + ')', opacity: currentIndex === index ? 1 : 0 }"></div>

    <!-- Page content -->
    <router-view />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';

const images = [
  '/image/HarryPotter.jpg',
  '/image/Hogwarts.jpg',
  '/image/harryAndHagrid.jpg',
  '/image/hp2.jpg',
];
const currentIndex = ref(0);
let intervalId: number;

onMounted(() => {
  intervalId = window.setInterval(() => {
    currentIndex.value = (currentIndex.value + 1) % images.length;
  }, 5000);
});

onUnmounted(() => {
  clearInterval(intervalId);
});
</script>

<style scoped>
.background-layout {
  position: relative;
  min-height: 100vh;
  width: 100vw;
  overflow: hidden;
}

.slideshow-layer {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-size: cover;
  background-position: center;
  transition: opacity 2s ease-in-out;
  z-index: -1;
}
</style>
