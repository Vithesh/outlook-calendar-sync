import Vue from 'vue'
import Router from 'vue-router'
import store from '../store'
import { CHECK_AUTH } from '../store/actions.type'

// beforeEnterGuard
const beforeEnterGuard = (to, from, next) => {
  return Promise.all([store.dispatch(CHECK_AUTH)]).then(next)
}

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      name: 'login',
      path: '/',
      component: () => import('@/views/Login')
    },
    {
      name: 'authorize',
      path: '/authorize',
      component: () => import('@/views/Authorize')
    },
    {
      name: 'events',
      path: '/events',
      component: () => import('@/views/EventsList'),
      beforeEnter: beforeEnterGuard
    },
    {
      name: 'editEvent',
      path: '/events/:id',
      component: () => import('@/views/EditEvent'),
      beforeEnter: beforeEnterGuard
    }
  ]
})
