import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router'

const app = createApp(App)

router.afterEach((to) => {
    if (window.gtag) {
      window.gtag('config', 'G-EFQ0GRL5GB', { 
        page_path: to.fullPath, 
        debug_mode: true  // Active le mode debug
      });
    }
  });

app.use(router)
app.mount('#app')