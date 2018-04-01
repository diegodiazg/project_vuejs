// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueResources from 'vue-resource'
import App from './App'
import store from './store'
import Vuetify from 'vuetify'
import socialSharing from 'vue-social-sharing'
import router from './router'
import 'vuetify/dist/vuetify.min.css'
import VueAxios from 'vue-axios'
import VueAuthenticate from 'vue-authenticate'
import axios from 'axios'
import VueSweetAlert from 'vue-sweetalert'

Vue.use(VueSweetAlert)
Vue.use(axios, VueAxios)
Vue.use(VueResources)
Vue.use(VueAuthenticate, {
  baseUrl: 'http://localhost:8080', // Your API domain
  providers: {
    github: {
      clientId: '5a707560ae7360d77587',
      redirectUri: 'hhttp://mmi.cdhyt.org/app/accounts/github/login/callback/' // Your client app URL
    },
    facebook: {
      clientId: '1311542472191561'
      // redirectUri: 'http://localhost:8080' // Your client app URL
    },
    google: {
      clientId: '112541925459-qd51m00s2ss5m6pekjkefj01eujetpgq.apps.googleusercontent.com',
      // clientId: '112541925459-u8730o5l0n5nst1gf28a4tfo8g2damoi.apps.googleusercontent.com',
      redirectUri: 'https://www.diegodiazgt.com' // Your client app URL
      // redirectUri: 'http://mmi.cdhyt.org/api/callback_paypal/'
    }
  },
  bindRequestInterceptor: function () {
    axios.interceptors.request.use((config) => {
      if (Vue.isAuthenticated()) {
        config.headers['Authorization'] = [
          Vue.options.tokenType, this.getToken()
        ].join(' ')
      } else {
        delete config.headers['Authorization']
      }
      return config
    })
  },
  bindResponseInterceptor: function () {
    axios.interceptors.response.use((response) => {
      Vue.setToken(response)
      return response
    })
  }
})

store.dispatch('auth_api')
Vue.config.productionTip = false
Vue.use(Vuetify)
Vue.use(socialSharing)

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
