<template>
    <div>
      <v-flex xs12 md12 sm12 lg12 xl12>
       <v-card  class="elevation-0 mb-0" v-for="(item, key) in products"
              :key="key">
         <v-container fluid grid-list-lg>
           <v-layout row >
             <v-flex xs7 sm7 md7 lg7 xl7>
              <div>
                <div class="headline">{{item.name}}</div>
                <div>{{item.collection}}</div>
              </div>
            </v-flex>
            <v-flex xs5 sm5 md5 lg5 xl5 >
              <v-card-media
                 :src="'http://mmi.cdhyt.org/media/'+item.picture"
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
  name: 'container',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      products: [],
      token: ''
    }
  },
  mounted () {
    this.get_products()
  },
  methods: {
    get_products () {
      HTTP.get('/products').then(result => {
        this.products = result.data
      }, error => {
        console.error(error)
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
