import { createApp } from 'vue'
import App from './App.vue'
import { createPinia } from 'pinia'
import router from './router/index'
import './assets/fonts.css'
import BackgroundLayout from './layouts/BackgroundLayout.vue';
import './assets/main.css'
import PrimeVue from 'primevue/config';
import Aura from '@primeuix/themes/aura';

const app = createApp(App)
app.use(createPinia())
app.use(router)
app.use(PrimeVue, {
    theme: {
        preset: Aura
    }
});
app.component('BackgroundLayout', BackgroundLayout)

app.mount('#app')
