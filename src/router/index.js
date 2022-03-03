import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Layout from '@/layout/index.vue'

const routes = [
  {
    path: '/',
	name:'Layout',
    component: Layout,
	redirect: 'Home',
	children: [
	  {
	    path: 'home',
	    name: 'Home',
	    component: () => import('@/views/Home'),
	    meta: { title:'首页',icon:'home-o'}
	  },
	  {
	    path: 'my',
	    name: 'My',
	    component: () => import('@/views/My'),
	    meta: { title:'我的',icon:'manager-o'}
	  },
	]
  },
  {
    path: '/noteCategoryEdit',
  	name:'NoteCategoryEdit',
    component: () => import('@/views/noteCategory/NoteCategoryEdit'),
	meta: { title:'编辑分类'}
  }

]



const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router