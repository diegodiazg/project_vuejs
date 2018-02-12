// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
// import material from 'materialize-css'
// import icon from 'material-icons/css/material-icons.css'
// import jQuery from 'jquery'
import 'jquery/dist/jquery'
import router from './router'
import 'materialize-css/dist/css/materialize.css'
import 'material-design-icons/iconfont/material-icons.css'

// Vue.use(material)
// Vue.use(icon)
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
