<template>
  <div>
   <v-layout row wrap>
          <v-carousel xs12>
            <v-carousel-item src="http://mmi.cdhyt.org/media/pictures/2018/02/25/14448991_591277367725736_6139841395852704607_n.jpg"  ></v-carousel-item>
          </v-carousel>
          <v-card
              class="portrait"
              img="http://mmi.cdhyt.org/media/pictures/2018/02/25/14448991_591277367725736_6139841395852704607_n.jpg"
              height="300px"
            >
          </v-card>
          <v-layout wrap row>
            <v-flex xs12  sm12 md3 lg3 xl4>
              <banner></banner>
            </v-flex>
            <v-flex xs12 sm12 md9 lg9 xl8 >
              <container></container>
              <offert></offert>
            </v-flex>
          </v-layout>
    </v-layout>
  </div>
</template>

<script>
import sharing from './sharing'
import container from '@/components/container'
import banner from '@/components/banner'
import offert from '@/components/offert'

export default {
  name: 'container',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      products: [],
      token: '',
      components: { sharing, container, banner, offert }
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
