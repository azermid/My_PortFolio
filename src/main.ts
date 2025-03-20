import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router'

const app = createApp(App)

router.afterEach((to) => {
    const GA_ID = import.meta.env.VITE_GA_ID;
    if (window.gtag && GA_ID) {
      window.gtag('config', GA_ID, { 
        page_path: to.fullPath, 
      });
    }
  });
app.use(router)
app.mount('#app')