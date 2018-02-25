// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueResources from 'vue-resource'
import App from './App'
import store from './store'
// import material from 'materialize-css'
// import icon from 'material-icons/css/material-icons.css'
// import jQuery from 'jquery'
import 'jquery/dist/jquery'
import router from './router'
import 'materialize-css/dist/css/materialize.css'
import 'material-design-icons/iconfont/material-icons.css'

// Vue.use(material)
Vue.use(VueResources)
Vue.config.productionTip = false

Vue.http.interceptors.push(
  function (request) {
    request.headers.set('Authorization', 'JWT ' + localStorage.getItem('token'))
  }
)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>',
  store: store

})
