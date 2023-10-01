import { createApp } from 'vue'
import App from './App.vue'
import router from './router' // Изменено здесь

createApp(App)
    .use(router)
    .mount('#app')

