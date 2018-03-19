import Vue from 'vue'
import Vuex from 'vuex'
import VueResources from 'vue-resource'
// baseURL: `http://mmi.cdhyt.org/api/`,
// baseURL: `http://mmi.tests/api/`,
import {HTTP} from './../services'

Vue.use(VueResources)
Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    toke: '',
    language_accept: 'es',
    isAuthenticated: false,
    cart: [],
    products: [],
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
    get_products: state => {
      return state.products
    },
    get_bags: state => {
      if (localStorage.getItem('products')) {
        var filtrados = state.products.filter((item) => item.category === 'Bolsos')
        return filtrados
      }
      return []
    },
    get_shoes: state => {
      if (localStorage.getItem('products')) {
        var filtrados = state.products.filter((item) => item.category === 'Zapatos')
        return filtrados
      }
      return []
    },
    get_hats: state => {
      if (localStorage.getItem('products')) {
        var filtrados = state.products.filter((item) => item.category === 'Sombreros')
        return filtrados
      }
      return []
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
        console.log(URL)
        Vue.http.post(this.state.URL + 'api-token-auth/', {'email': 'admin@admin.com', 'password': 'qwerty123'}
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
      if (!localStorage.getItem('products')) {
        let self = this
        Vue.http.get(this.state.baseURL + 'products/', {headers: {'Authorization': 'JWT ' + localStorage.getItem('token')}}).then(result => {
          self.state.products = result.data
          localStorage.setItem('products', JSON.stringify(self.state.products))
          console.log(self.state.products)
        }, error => {
          console.error(error)
        })
      }
      if (localStorage.getItem('products')) {
        this.state.products = JSON.parse(localStorage.getItem('products'))
      }
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
    get_products () {
      if (localStorage.getItem('products')) {
        this.state.products = JSON.parse(localStorage.getItem('products'))
        return this.state.products
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
      const record = state.cart.find(item => item.product.id === payload.model.id)
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
