import Vue from 'vue'
import Vuex from 'vuex'
import VueResources from 'vue-resource'
// baseURL: `http://mmi.cdhyt.org/api/`,
// baseURL: `http://mmi.tests/api/`,
Vue.use(VueResources)
Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    toke: '',
    language_accept: 'es',
    isAuthenticated: false,
    cart: [],
    URL: 'http://mmi.tests/',
    baseURL: '',
    mediaURL: '',
    currency: 'USD',
    wishlists: []
  },
  getters: {
    TotalImportCart: state => {
      var total = 0
      state.cart.forEach(function (item) {
        total += item.product.price_sell * item.product.quantity
      })
      return total
    },
    totalItemCart: state => {
      return state.cart.length
    },
    isAuthenticated: state => {
      return state.isAuthenticated
    },
    getCurrency: state => {
      return state.currency
    }
  },
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
      if (!localStorage.getItem('URL')) {
        localStorage.setItem('URL', this.state.URL)
      }
      if (!localStorage.getItem('baseURL')) {
        localStorage.setItem('baseURL', this.state.URL + 'api/')
      }
      this.state.baseURL = localStorage.getItem('baseURL')
      if (!localStorage.getItem('mediaURL')) {
        localStorage.setItem('mediaURL', this.state.URL + 'media/')
      }
      this.state.mediaURL = localStorage.getItem('mediaURL')
    },
    login ({commit}, payload) {
      commit('isAuthenticated', payload)
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
    set_currency ({ commit }, key) {
      commit('set_currency', key)
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
    isAuthenticated (state, payload) {
      state.isAuthenticated = payload.isAuthenticated
    },
    add_item_cart (state, payload) {
      const record = state.cart.find(item => item.index === payload.index)
      payload.model.quantity = 1
      if (!record) {
        state.cart.push({
          index: payload.index,
          product: payload.model
        })
      } else {
        record.product.quantity++
      }
      localStorage.setItem('cart', JSON.stringify(this.state.cart))
    },
    remove_item_cart (state, key) {
      this.state.cart.splice(key, 1)
      localStorage.setItem('cart', JSON.stringify(this.state.cart))
    },
    set_currency (state, key) {
      this.state.currency = key
      localStorage.setItem('currency', this.state.currency)
    }
  }
})
export default store
