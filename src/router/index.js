/*
**路由表
*/
import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login')
  },
  {
    path: '/',
    name: 'tabbar',
    component: () => import('@/views/tabbar'),
    children: [
      { path: '', name: 'home', component: () => import('@/views/home') }, // 默认子路由
      { path: 'qa', name: 'qa', component: () => import('@/views/qa') },
      { path: 'video', name: 'video', component: () => import('@/views/video') },
      { path: 'my', name: 'my', component: () => import('@/views/my') }
    ]
  },
  {
    path: '/search',
    name: 'search',
    component: () => import('@/views/search')
  }
]

const router = new VueRouter({
  routes
})

export default router
