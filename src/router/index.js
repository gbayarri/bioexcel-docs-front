import { createRouter, createWebHistory } from 'vue-router'
import About from '@/views/About.vue'
import Documents from '@/views/Documents.vue'
import NotFound from '@/views/NotFound.vue'

const routes = [
  {
    path: '/',
    name: 'About',
    component: About
  },
  {
    path: '/docs/:id',
    name: 'Documents',
    component: Documents,
    props: true
    /*props(route) { 
      return {
        id: route.params.id
      }
    }*/
  },
  {
    path: '/:catchAll(.*)',
    name: 'NotFound',
    component: NotFound
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
