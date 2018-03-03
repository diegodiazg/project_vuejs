import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'
import checkout from '@/components/checkout'
import main from '@/components/main'
import app from '@/App'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/app',
      name: 'main',
      component: app
    },
    {
      path: '/checkout',
      name: 'checkout',
      component: checkout
    },
    {
      path: '/contact',
      name: 'contact',
      component: checkout
    },
    {
      path: '/wishlists',
      name: 'wishlists',
      component: checkout
    },
    {
      path: '/detailproduct',
      name: 'detailproduct',
      component: checkout
    },
    {
      path: '/shoes',
      name: 'shoes',
      component: checkout
    },
    {
      path: '/bags',
      name: 'bags',
      component: checkout
    },
    {
      path: '/hats',
      name: 'hats',
      component: checkout
    }
  ]
})
