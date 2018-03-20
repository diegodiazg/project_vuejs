<template>
  <div>
  <v-carousel hide-controls>
    <v-carousel-item v-for="(item,i) in product.picture" :src="$store.state.mediaURL+item" :key="i"></v-carousel-item>
  </v-carousel>
  <a :href="$store.state.mediaURL+product.picture[0]"></a>
  </div>
</template>

<script>
import {HTTP} from './../services'

export default {
  name: 'detailproduct',
  props: {
    item: Object
  },
  data () {
    return {
      product: []
    }
  },
  mounted () {
    this.get_products()
  },
  methods: {
    get_products () {
      let self = this
      HTTP.get('products/' + this.$route.params.id)
        .then(function (response) {
          self.product = response.data
        })
        .catch(function (error) {
          console.log(error)
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
