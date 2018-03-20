<template>
  <div>
   <v-layout column>
        <v-container fluid grid-list-md>
          <v-layout row wrap>
            <v-flex xs12 md4
              v-for="(item, key) in products"
              :key="key">
              <v-card>
                <v-card-media
                  :src="$store.state.mediaURL+item.picture"
                  height="400px">
                </v-card-media>
                <v-card-title primary-title>
                  <div>
                    <div class="headline">
                    <router-link :to="'/product/'+item.id"> {{item.name}}</router-link>
                  </div>
                  <span class="grey--text">{{item.brand}} - Q {{item.price_sell|format_number}}</span>
                  </div>
                </v-card-title>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn icon>
                    <v-icon>favorite</v-icon>
                  </v-btn>
                  <v-btn icon @click="add_item_cart(key, item)">
                    <v-icon>shopping_cart</v-icon>
                  </v-btn>
                  <v-btn icon>
                    <v-icon>share</v-icon>
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-flex>
          </v-layout>
        </v-container>
  </v-layout>
  </div>
</template>

<script>
import {HTTP} from './../services'
import toast from './toast'

export default {
  name: 'hats',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      products: [],
      token: '',
      text: 'El producto fue agregado.',
      timeout: 6000,
      front: false,
      x: 'top',
      y: 'right'
    }
  },
  mounted () {
    this.products = this.$store.getters.get_hats
  },
  methods: {
    get_products () {
      HTTP.get('/hats').then(result => {
        this.products = result.data
      }, error => {
        console.error(error)
      })
    },
    add_item_cart (index, model) {
      this.items = this.$store.dispatch('add_item_cart', {
        index,
        model
      })
    }
  },
  components: {
    toast
  },
  filters: {
    format_number: function (value) {
      if (!value) return ''
      return isNaN(value) ? 0 : parseFloat(value).toFixed(2)
    }
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
