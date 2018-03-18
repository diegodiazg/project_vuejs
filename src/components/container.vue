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
                  :src="$store.state.mediaURL+item.picture[0]"
                  height="400px">
                </v-card-media>
                <v-card-title primary-title>
                  <div>
                    <div class="headline">{{item.name}}</div>
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
  <toast :show="front"
         :text="text"
         :x="x"
         :y="y"
         :time="6000"></toast>
  </div>
</template>

<script>
import {HTTP} from './../services'
import toast from './toast'

export default {
  name: 'container',
  data () {
    return {
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
    this.get_products()
  },
  components: {
    toast
  },
  methods: {
    get_products () {
      HTTP.get('/products').then(result => {
        this.products = result.data
      }, error => {
        console.error(error)
      })
    },
    hidden_toast () {
      if (this.front) this.front = false
    },
    add_item_cart (index, model) {
      this.front = false
      this.items = this.$store.dispatch('add_item_cart', {
        index,
        model
      })
      this.front = true
    }
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
