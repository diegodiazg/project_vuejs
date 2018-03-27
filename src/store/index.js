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
    user: [],
    products: [],
    URL: 'http://mmi.cdhyt.org/',
    baseURL: '',
    mediaURL: '',
    currency: 'USD',
    wishlists: []
  },
  getters: {
    TotalImportCart: state => {
      var total = 0
      state.cart.forEach(function (item) {
        total += item.price_sell * item.quantity
      })
      return total
    },
    totalItemCart: state => {
      return state.cart.length
    },
    get_products: state => {
      return state.products
    },
    get_user: state => {
      return state.user
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
    get_producto_detail: (state) => (id) => {
      if (localStorage.getItem('products')) {
        var filtrados = state.products.find((item) => item.id === id)
        return filtrados
      }
      return []
    },
    get_quantity_producto_in_cart: (state) => (id) => {
      if (localStorage.getItem('cart')) {
        state.cart = JSON.parse(localStorage.getItem('cart'))
        if (state.cart.length > 0) {
          const record = state.cart.find(item => item.id === id)
          if (record) {
            return record.quantity
          }
          return 0
        }
        return 0
      }
      return 0
    },
    get_color_producto_in_cart: (state) => (id) => {
      if (localStorage.getItem('cart')) {
        state.cart = JSON.parse(localStorage.getItem('cart'))
        if (state.cart.length > 0) {
          const record = state.cart.find(item => item.id === id)
          if (record) {
            return record.color
          }
          return ''
        }
        return ''
      }
      return ''
    },
    get_size_producto_in_cart: (state) => (id) => {
      if (localStorage.getItem('cart')) {
        state.cart = JSON.parse(localStorage.getItem('cart'))
        if (state.cart.length > 0) {
          const record = state.cart.find(item => item.id === id)
          if (record) {
            return record.size
          }
          return ''
        }
        return ''
      }
      return ''
    },
    isAuthenticated: state => {
      return state.isAuthenticated
    },
    is_in_cart: (state) => (id) => {
      if (state.cart.length > 0) {
        if (state.cart.find(item => item.id === id)) {
          return true
        }
        return false
      }
      return false
    },
    getCurrency: state => {
      return state.currency
    }
  },
  actions: {
    auth_api () {
      if (!localStorage.getItem('token')) {
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
      let self = this
      self.state.products = JSON.parse(localStorage.getItem('products'))
      Vue.http.get(this.state.baseURL + 'products/', {headers: {'Authorization': 'JWT ' + localStorage.getItem('token')}}).then(result => {
        self.state.products = result.data
        localStorage.setItem('products', JSON.stringify(self.state.products))
        Vue.set(self.state.products, JSON.parse(localStorage.getItem('products')))
      }, error => {
        console.error(error)
      })
    },
    auth_user ({commit}, payload) {
      let self = this
      HTTP.post(this.state.URL + 'api-token-auth/', {
        email: payload.email,
        password: payload.password
      })
        .then(function (response) {
          self.state.isAuthenticated = true
          store.dispatch('login', {isAuthenticated: true})
        })
        .catch(function (error) {
          console.log(error)
        })
    },
    login ({commit}, payload) {
      commit('login', payload)
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
    set_user ({ commit }, key) {
      commit('set_user', key)
    },
    set_currency ({ commit }, key) {
      commit('set_currency', key)
    },
    add_item_cart ({ commit }, payload) {
      commit('add_item_cart', payload)
    },
    set_color_item_cart ({ commit }, payload) {
      commit('set_color_item_cart', payload)
    },
    set_size_item_cart ({ commit }, payload) {
      commit('set_size_item_cart', payload)
    },
    set_quantity_item_cart ({ commit }, payload) {
      commit('set_quantity_item_cart', payload)
    }
  },
  mutations: {
    toke: state => {
      return state.toke
    },
    login (state, payload) {
      state.isAuthenticated = payload.isAuthenticated
    },
    add_item_cart (state, payload) {
      const record = state.cart.find(item => item.id === payload.id)
      if (!record) {
        payload.quantity = 1
        state.cart.push(payload)
      } else {
        record.quantity++
      }
      localStorage.setItem('cart', JSON.stringify(this.state.cart))
    },
    set_quantity_item_cart (state, payload) {
      const record = state.cart.find(item => item.id === payload.id)
      if (!record) {
        store.dispatch('add_item_cart', payload)
      }
      record.quantity = payload.quantity
      localStorage.setItem('cart', JSON.stringify(this.state.cart))
    },
    set_color_item_cart (state, payload) {
      console.log(payload.color)
      const record = state.cart.find(item => item.id === payload.id)
      record.color = payload.color
      localStorage.setItem('cart', JSON.stringify(this.state.cart))
    },
    set_size_item_cart (state, payload) {
      const record = state.cart.find(item => item.id === payload.id)
      record.size = payload.size
      localStorage.setItem('cart', JSON.stringify(this.state.cart))
    },
    remove_item_cart (state, key) {
      this.state.cart.splice(key, 1)
      localStorage.setItem('cart', JSON.stringify(this.state.cart))
    },
    set_currency (state, key) {
      this.state.currency = key
      localStorage.setItem('currency', this.state.currency)
    },
    set_user (state, key) {
      this.state.user = key
      localStorage.setItem('user', this.state.user)
    }
  }
})
export default store
