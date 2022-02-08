import { createRouter, createWebHistory } from 'vue-router'
import About from '@/views/About.vue'
import Documents from '@/views/Documents.vue'
import Files from '@/components/assets/Files.vue'
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
  },{
    path: '/data/:id/:type',
    name: 'Files',
    component: Files,
    props: true
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
