<template>
<v-container grid-list-md text-xs-center>
    <v-layout row wrap>
      <v-flex xs4 md3>
        <ProductZoomer :baseImages.sync="images" :baseComponentClass="ComponentClass" :baseZoomerOptions="zoomerOptions"></ProductZoomer>
      </v-flex>
      <v-flex xs4 md4 >
        <span id="zoomer"> </span>
        <h3 class="display-3" color="primary">{{product.name}}</h3>
        <span class="title"> {{product.price_sell|format_number}}</span>
        <v-spacer></v-spacer>
          <v-flex xs12, md12>
            <v-select @change="set_size_item_cart(size)"
             :items="product.size"
             v-model="size"
             label="Size"
             class="input-group--focused"
             item-value="text"
            ></v-select>
          </v-flex>
          <v-flex xs12 md12>
            <v-select
            @change="set_color_item_cart(color)"
            :items="product.color"
            v-model="color"
            label="Color"
            class="input-group--focused"
            item-value="text"
            ></v-select>
          </v-flex>
          <v-flex xs12 md12>
            <v-text-field
            @change="set_quantity_item_cart()"
            type="number"
            label="Quantity"
            v-model="quantity"
            ></v-text-field>
          </v-flex>
        <span class="subheading"> {{product.description}}</span>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
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
      color: '',
      size: '',
      quantity: 0,
      ComponentClass: 'xs2 md2',
      zoomerOptions: {
        'zoomFactor': 3,
        'inlinePane': false,
        'hoverDelay': 300,
        'namespace': 'zoomer',
        'zoomer_container_id': 'zoomer',
        'move_by_click': false
      }
    }
  },
  created () {
    this.get_products()
  },
  components: {
    ProductZoomer
  },
  methods: {
    get_products () {
      this.product = this.$store.getters.get_producto_detail(this.$route.params.id)
      this.quantity = this.$store.getters.get_quantity_producto_in_cart(this.$route.params.id)
      this.color = this.$store.getters.get_color_producto_in_cart(this.$route.params.id)
      this.size = this.$store.getters.get_size_producto_in_cart(this.$route.params.id)
      this.set_array_image()
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
    },
    set_color_item_cart () {
      let id = this.product.id
      let color = this.color
      console.log(this.color)
      this.$store.dispatch('set_color_item_cart', {
        id,
        color
      })
    },
    set_size_item_cart () {
      let id = this.product.id
      let size = this.size
      console.log(this.size)
      this.$store.dispatch('set_size_item_cart', {
        id,
        size
      })
    },
    set_quantity_item_cart () {
      let id = this.product.id
      let quantity = this.quantity
      console.log(this.quantity)
      this.$store.dispatch('set_quantity_item_cart', {
        id,
        quantity
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
@import "font-awesome/css/font-awesome.min.css";
</style>
