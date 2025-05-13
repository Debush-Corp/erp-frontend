import { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import ClickOutside from './clickOutsideDirective'; 
import router from './router'
import store from './store'

const app = createApp(App)
app.use(store)
app.use(router)
app.directive('click-outside', ClickOutside);
app.mount('#app')
