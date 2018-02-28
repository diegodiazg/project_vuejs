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
                  :src="'http://mmi.cdhyt.org/media/'+item.picture"
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
  </div>
</template>

<script>
import sharing from './sharing'

export default {
  name: 'container',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      products: [],
      token: '',
      components: { 'sharing': sharing }
    }
  },
  mounted () {
    // this.auth_api()
    this.$store.dispatch('auth_api')
    this.auth_api()
  },
  methods: {
    get_products () {
      this.$http.get('http://mmi.cdhyt.org/api/products/', {
        headers: { 'Authorization': 'JWT ' + this.token } }
      ).then(result => {
        this.products = result.body
      }, error => {
        console.error(error)
      })
    },
    auth_api () {
      this.$http.post('http://mmi.cdhyt.org/api-token-auth/', {'email': 'admin@admin.com', 'password': 'qwerty123'}
      ).then(result => {
        this.token = result.body.token
        this.get_products()
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
  filters: {
    format_number: function (value) {
      if (!value) return ''
      return isNaN(value) ? 0 : parseFloat(value).toFixed(2)
    }
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
