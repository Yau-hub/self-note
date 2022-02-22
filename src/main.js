import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import '@/styles/common.scss' // global css

import 'lib-flexible'

// import Vant from 'vant';
// import 'vant/lib/index.css';
import { Button } from 'vant';

createApp(App).use(store).use(router)
.use(Button)
.mount('#app')
