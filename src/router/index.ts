import { createRouter, createWebHistory } from 'vue-router'
import homePage from '@/pages/home-page.vue'
import Wiki from '@/pages/hp-wiki-page.vue'

// Enum for route names
export enum RouteName {
  HOME = 'Home',
  WIKI = 'Wiki'
}

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', name: RouteName.HOME, component: homePage },
    { path: '/wiki', name: RouteName.WIKI, component: Wiki },
  ],
})

export default router
