<template>
<v-container grid-list-md text-xs-center>
    <v-layout row wrap>
      <v-flex xs4 md3>
        <ProductZoomer :baseImages.sync="images" :baseComponentClass="ComponentClass" :baseZoomerOptions="zoomerOptions"></ProductZoomer>
      </v-flex>
      <v-flex xs4 md4 >
        <span id="zoomer"> </span>
        <h3 class="display-3" color="primary">{{product.name}}</h3>
        <span class="title"> Precio: {{product.price_sell|format_number}}</span>
        <v-btn block color="primary" v-if="!is_in_cart" @click="add_item_cart(product)">Agregar al carrito</v-btn>
        <v-spacer></v-spacer>
          <v-flex xs12, md12 v-if="is_in_cart">
            <v-select @change="set_size_item_cart()"
             :items="product.size"
             v-model="set_size"
             label="Size"
             class="input-group--focused"
             item-value="text"
            ></v-select>
          </v-flex>
          <v-flex xs12 md12 v-if="is_in_cart">
            <v-select
            @change="set_color_item_cart()"
            :items="product.color"
            v-model="set_color"
            label="Color"
            class="input-group--focused"
            item-value="text"
            ></v-select>
          </v-flex>
          <v-flex xs12 md12 v-if="is_in_cart">
            <v-text-field
            @blur="set_quantity_item_cart()"
            @change="set_quantity_item_cart()"
            type="number"
            label="Quantity"
            v-model="set_quantity"
            ></v-text-field>
          </v-flex>
        <span class="subheading"> {{product.description}}</span>
      </v-flex>
    </v-layout>
    <v-snackbar
      :timeout="timeout"
      :top="y === 'top'"
      :bottom="y === 'bottom'"
      :right="x === 'right'"
      :left="x === 'left'"
      :multi-line="mode === 'multi-line'"
      :vertical="mode === 'vertical'"
      v-model="snackbar"
    >
    {{ text }}
      <v-btn flat color="pink" @click.native="snackbar = false">Cerrar</v-btn>
    </v-snackbar>
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
      snackbar: false,
      y: 'top',
      x: 'right',
      mode: '',
      set_size: '',
      set_color: '',
      set_quantity: 0,
      timeout: 6000,
      text: 'Hello, I\'m a snackbar',
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
    this.set_array_image()
    this.set_var()
  },
  components: {
    ProductZoomer
  },
  methods: {
    set_var () {
      this.set_color = this.$store.getters.get_color_producto_in_cart(this.$route.params.id)
      this.set_quantity = this.$store.getters.get_quantity_producto_in_cart(this.$route.params.id)
      this.set_size = this.$store.getters.get_size_producto_in_cart(this.$route.params.id)
    },
    get_max_id_image () {
      let self = this
      return self.images.normal_size.length + 1
    },
    add_item_cart (model) {
      console.log(model)
      console.log('dIEGO')
      this.items = this.$store.dispatch('add_item_cart', model)
      this.snackbar = true
      this.text = 'El producto fue agregado.'
      this.set_var()
    },
    set_array_image () {
      let self = this
      self.product.picture.forEach(function (elemento) {
        self.images.normal_size.push({id: self.get_max_id_image(), url: self.$store.state.mediaURL + elemento})
      })
    },
    set_color_item_cart () {
      let id = this.product.id
      let color = this.set_color
      this.$store.dispatch('set_color_item_cart', {
        id,
        color
      })
      this.snackbar = true
      this.text = 'Se elegio el color.'
    },
    set_size_item_cart () {
      let id = this.product.id
      let size = this.set_size
      this.$store.dispatch('set_size_item_cart', {
        id,
        size
      })
      this.snackbar = true
      this.text = 'Se eligio la talla.'
    },
    set_quantity_item_cart () {
      let id = this.product.id
      let quantity = this.set_quantity
      this.$store.dispatch('set_quantity_item_cart', {
        id,
        quantity
      })
      this.snackbar = true
      this.text = 'Se añadio la cantidad al carrito.'
    }
  },
  computed: {
    is_in_cart () {
      return this.$store.getters.is_in_cart(this.$route.params.id)
    },
    product () {
      return this.$store.getters.get_producto_detail(this.$route.params.id)
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
