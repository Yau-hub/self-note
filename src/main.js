import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import '@/styles/common.scss' // global css

import 'lib-flexible'
import Bmob from "hydrogen-js-sdk";
Bmob.initialize("2521465b8d97eaf0", "178178");

import { 
 Button,
 Cell,
 NavBar,
 Divider,
 CellGroup,
 Dialog,
 Form,
 Field,
 RadioGroup, 
 Radio,
 Notify,
 Tag,
 Icon
 
 } from 'vant';
const app = createApp(App);

app.config.globalProperties.Bmob = Bmob;



app.use(store).use(router)
.use(Button)
.use(Cell)
.use(NavBar)
.use(Divider)
.use(CellGroup)
.use(Dialog)
.use(Form)
.use(Field)
.use(RadioGroup)
.use(Radio)
.use(Notify)
.use(Tag)
.use(Icon)

.mount('#app')
