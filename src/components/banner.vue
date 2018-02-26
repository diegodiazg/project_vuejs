<template>
    <div>
      <v-flex xs12>
       <v-card  class="elevation-0 mb-0" v-for="(item, key) in products"
              :key="key">
         <v-container fluid grid-list-lg>
           <v-layout row >
             <v-flex xs7>
              <div>
                <div class="headline">{{item.name}}</div>
                <div>{{item.collection}}</div>
              </div>
            </v-flex>
            <v-flex xs5>
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
