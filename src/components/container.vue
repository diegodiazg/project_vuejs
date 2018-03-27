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
                    <v-menu bottom left>
                      <v-btn icon slot="activator">
                        <v-icon>share</v-icon>
                      </v-btn>
                      <v-list>
                         <social-sharing :url="$store.state.URL+'/product/'+item.id"
                            :title="item.name+' - '+item.description"
                            :description="item.name+' - '+item.description"
                            :quote="item.name+' - '+item.description"
                            hashtags="mmi,moda,chiqumula"
                            twitter-user="mmi"
                            inline-template>
                            <v-list-tile >
                              <v-list-tile-title> <network network="facebook">
                                <i class="fa fa-facebook"></i> Facebook
                              </network></v-list-tile-title>
                              <v-list-tile-title> <network network="googleplus">
                                <i class="fa fa-google-plus"></i> Google +
                              </network> </v-list-tile-title>
                              <v-list-tile-title> <network network="twitter">
                                <i class="fa fa-twitter"></i> Twitter
                              </network></v-list-tile-title>
                            </v-list-tile>
                          </social-sharing>
                      </v-list>
                    </v-menu>
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
// import {HTTP} from './../services'
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
    this.products = this.$store.state.products
    if (this.products.length === 0) {
      if (localStorage.getItem('products')) {
        this.products = JSON.parse(localStorage.getItem('products'))
      }
    }
  },
  components: {
    toast
  },
  methods: {
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
