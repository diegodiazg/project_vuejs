import Vue from 'vue'
import Vuex from 'vuex'
import VueResources from 'vue-resource'

Vue.use(VueResources)
Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    toke: '',
    language_accept: 'es',
    cart: [],
    wishlists: []
  },
  getters: {},
  actions: {
    auth_api () {
      if (!localStorage.getItem('token')) {
        Vue.http.post('http://mmi.cdhyt.org/api-token-auth/', {'email': 'admin@admin.com', 'password': 'qwerty123'}
        ).then(result => {
          localStorage.setItem('token', result.body.token)
        }, error => {
          console.error(error)
        })
      }
    },
    get_car_item () {
      if (!localStorage.getItem('cart')) {
        return this.state.cart
      }
    }
  },
  mutations: {
    toke: state => {
      return state.toke
    },
    set_cart (state, newItem) {
      state.cart = newItem
    }
  }
})
export default store
