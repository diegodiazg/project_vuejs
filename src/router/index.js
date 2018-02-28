import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'
import checkout from '@/components/checkout'
import app from '@/App'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/app',
      name: 'index',
      component: app
    },
    {
      path: '/checkout',
      name: 'checkout',
      component: checkout
    }
  ]
})
