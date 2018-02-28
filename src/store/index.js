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
      if (localStorage.getItem('cart')) {
        this.state.cart = JSON.parse(localStorage.getItem('cart'))
        return this.state.cart
      }
    },
    remove_item_cart ({ commit }, key) {
      commit('remove_item_cart', key)
    },
    add_item_cart ({ commit }, payload) {
      commit('add_item_cart', {
        index: payload.index,
        model: payload.model
      })
    }
  },
  mutations: {
    toke: state => {
      return state.toke
    },
    add_item_cart (state, payload) {
      Vue.set(this.state.cart, payload.index, payload.model)
      localStorage.setItem('cart', JSON.stringify(this.state.cart))
    },
    remove_item_cart (state, key) {
      this.state.cart.splice(key, 1)
      localStorage.setItem('cart', JSON.stringify(this.state.cart))
    }
  }
})
export default store
