import Vue from 'vue'
import Router from 'vue-router'
import Nav from '@/components/nav'
import Parallax from '@/components/parallax'
import Footer from '@/components/footer'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'nav',
      component: Nav,
      helper: Parallax,
      footer: Footer
    }
  ]
})
