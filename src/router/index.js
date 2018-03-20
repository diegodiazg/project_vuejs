import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'
import checkout from '@/components/checkout'
import principal from '@/components/principal'
import blog from '@/components/blog'
import bags from '@/components/bags'
import shoes from '@/components/shoes'
import login from '@/components/login'
import contact from '@/components/contact'
// import productDetail from '@/components/productDetail'
import detailproduct from '@/components/detailproduct'
import blogDetail from '@/components/blogDetail'
import offert from '@/components/offert'
import container from '@/components/container'
import banner from '@/components/banner'
import authCallback from '@/components/authCallback'
import invoices from '@/components/invoices'
import hats from '@/components/hats'
import invoicedetail from '@/components/invoicedetail'
// import app from '@/App'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'root',
      components: {
        principal: principal,
        offert: offert,
        container: container,
        banner: banner
      }
    },
    {
      path: '/checkout',
      name: 'checkout',
      component: checkout
    },
    {
      path: '/invoices',
      name: 'invoices',
      component: invoices
    },
    {
      path: '/login',
      name: 'login',
      component: login
    },
    {
      path: '/auth/callback ',
      name: 'auth_callback',
      component: authCallback
    },
    {
      path: '/contact',
      name: 'contact',
      component: contact
    },
    {
      path: '/wishlists',
      name: 'wishlists',
      component: checkout
    },
    {
      path: '/product/:id',
      name: 'detailproduct',
      component: detailproduct
    },
    {
      path: '/invoice/:id',
      name: 'invoicedetail',
      component: invoicedetail
    },
    {
      path: '/shoes',
      name: 'shoes',
      component: shoes
    },
    {
      path: '/bags',
      name: 'bags',
      component: bags
    },
    {
      path: '/blog',
      name: 'blog',
      component: blog
    },
    {
      path: '/blog/:id',
      name: 'detailblog',
      component: blogDetail
    },
    {
      path: '/hats',
      name: 'hats',
      component: hats
    }
  ]
})
