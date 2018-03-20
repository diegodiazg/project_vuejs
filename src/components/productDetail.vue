<template>
    <div>
      <v-flex xs12 md12 sm12 lg12 xl12>
       <v-card  class="elevation-0 mb-0">
         <v-container fluid grid-list-lg>
           <v-layout row >
             <v-flex xs7 sm7 md7 lg7 xl7>
              <div>
                <div class="headline">{{product.name}}</div>
                <div>{{product.collection}} {{ $route.params.id }}</div>
              </div>
            </v-flex>
            <v-flex xs5 sm5 md5 lg5 xl5 >
              <v-card-media
                 :src="$store.state.mediaURL+product.picture[0]"
                 height="125px"
                 contain
              ></v-card-media>
            </v-flex>
          </v-layout>
        </v-container>
      </v-card>
    </v-flex>
  </div>
</template>

<script>
import {HTTP} from './../services'

export default {
  name: 'productDetail',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      product: [],
      token: ''
    }
  },
  mounted () {
    console.log('diego')
    // this.auth_api()
    // this.$store.dispatch('auth_api')
    // this.auth_api()
    console.log(this.$route.params.id)
    this.get_products()
  },
  updated () {
    console.log('diego')
    console.log(this.$route.params.id)
  },
  methods: {
    get_products () {
      HTTP.get('products/' + this.$route.params.id)
        .then(function (response) {
          this.product = response.data
          console.log(response)
          // limpoiar el carrito
        })
        .catch(function (error) {
          console.log(error)
          // mostrar errores.
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
