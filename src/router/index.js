import Vue from 'vue'
import VueRouter from 'vue-router'
import Tasks from '../components/Tasks.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: Tasks
  },
  {
    path: '/',
    component: Tasks
  },
  {
    path: '/',
    component: Tasks
  },
  {
    path: '/a',
    component: Tasks
  },
  {
    path: '/b',
    component: Tasks
  },
  {
    path: '/c',
    component: Tasks
  },
  {
    path: '/d',
    component: Tasks
  },
  {
    path: '/e',
    component: Tasks
  },
  {
    path: '/f',
    component: Tasks
  },
  {
    path: '/g',
    component: Tasks
  },
  {
    path: '/h',
    component: Tasks
  },
  {
    path: '/j',
    component: Tasks
  },
  {
    path: '/k',
    component: Tasks
  },
  {
    path: '/l',
    component: Tasks
  },
  {
    path: '/m',
    component: Tasks
  },
  {
    path: '/p',
    component: Tasks
  },
  {
    path: '/q',
    component: Tasks
  }
]

const router = new VueRouter({
  routes
})

export default router
