<template>
<v-container grid-list-md text-xs-center>
    <v-layout row wrap>
      <v-flex xs6>
        <div class="container container-box">
          <div class="row outline-example">
            <ProductZoomer :baseImages.sync="images" :baseComponentClass="ComponentClass" :baseZoomerOptions="zoomerOptions"></ProductZoomer>
          </div>
        </div>
      </v-flex>
      <div xs6 id="zoomer">
      </div>
      <v-flex xs6 >
        <h3 class="display-3" color="primary">{{product.name}}</h3>
        <span class="title"> {{product.price_sell|format_number}}</span>
        <span class="subheading"> {{product.description}}</span>
      </v-flex>
  </v-layout>
  </v-container>
</template>

<script>
import {HTTP} from './../services'
import ProductZoomer from 'vue-product-zoomer'

export default {
  name: 'detailproduct',
  props: {
    item: Object
  },
  data () {
    return {
      images: {
        'normal_size': []
      },
      product: [],
      ComponentClass: 'xs6',
      zoomerOptions: {
        'zoomFactor': 3,
        'inlinePane': false,
        'hoverDelay': 300,
        'namespace': 'zoomer',
        'zoomer_container_id': 'zoomer',
        'move_by_click': true
      }
    }
  },
  mounted () {
    this.get_products()
  },
  components: {
    ProductZoomer
  },
  methods: {
    get_products () {
      let self = this
      HTTP.get('products/' + this.$route.params.id)
        .then(function (response) {
          self.product = response.data
          self.set_array_image()
        })
        .catch(function (error) {
          console.log(error)
        })
    },
    get_max_id_image () {
      let self = this
      return self.images.normal_size.length + 1
    },
    set_array_image () {
      let self = this
      self.product.picture.forEach(function (elemento) {
        self.images.normal_size.push({id: self.get_max_id_image(), url: self.$store.state.mediaURL + elemento})
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
<style>
.container-box {
  padding: 40px;
}
.outline-example {
  display: flex;
}
</style>
