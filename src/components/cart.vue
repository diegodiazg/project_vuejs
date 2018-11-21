<template>
  <div class="text-xs-center">
    <v-menu
      :close-on-content-click="false"
      :nudge-width="200"
      v-model="menu"
    >
      <v-btn flat  slot="activator">Cart shopping</v-btn>
      <v-card>
        <v-list>
          <v-list-tile avatar>
            <v-list-tile-content>
              <v-list-tile-title>Products</v-list-tile-title>
              <v-list-tile-sub-title>Cart shopping</v-list-tile-sub-title>
            </v-list-tile-content>
            <v-list-tile-action>
              <v-btn
                icon
                :class="fav ? 'red--text' : ''"
                @click="fav = !fav"
              >
                <v-icon>favorite</v-icon>
              </v-btn>
            </v-list-tile-action>
          </v-list-tile>
        </v-list>
        <v-divider></v-divider>
        <v-list v-for="(it, key) in items" :key="key">
          <v-list-tile>
            <v-list-tile-avatar>
              <img :src="$store.state.mediaURL+it.picture[0]" :alt="it.name">
            </v-list-tile-avatar>
            <v-list-tile-content>
              <v-list-tile-title v-html="it.name"> </v-list-tile-title>
              <v-list-tile-sub-title v-html="it.brand_obj.name"></v-list-tile-sub-title>
            </v-list-tile-content>
            <v-list-tile-action>
            </v-list-tile-action>
              <v-btn flat > qty  {{it.quantity|format_number}}</v-btn>
              <v-btn flat > Q {{ it.price_sell|format_number}}</v-btn>
            <v-list-tile-action>
              <v-btn
                icon
                @click="removeItem(key)"
              >
                <v-icon>delete</v-icon>
              </v-btn>
            </v-list-tile-action>
          </v-list-tile>
        </v-list>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn flat > {{ totalItemCart}}</v-btn>
          <v-btn flat > {{ TotalImportCart|format_number}}</v-btn>
          <v-btn flat @click="menu = false">Cancel</v-btn>
          <v-btn color="primary" flat @click="menu = false">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-menu>
  </div>
</template>
<script>
export default {
  name: 'cart',
  props: {
    item: Object
  },
  data () {
    return {
      items: [],
      total: 0,
      total_item: 0,
      fav: true,
      menu: false,
      message: false,
      hints: true
    }
  },
  mounted () {
    this.items = []
    this.items = this.$store.dispatch('get_car_item')
  },
  updated () {
    this.items = this.$store.state.cart
  },
  methods: {
    list () {
      // this.items = this.$store.dispatch('get_car_item')
      this.items = this.$store.state.cart
    },
    delete () {
    },
    add (index, model) {
      this.set(this.items, index, model)
    },
    removeItem: function (key, event) {
      this.$swal({
        title: 'Estas seguro?',
        text: 'Deseeas eliminar del carrito el producto!',
        type: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Si, borrar!',
        cancelButtonText: 'No'
      }).then((result) => {
        if (result) {
          this.items = this.$store.dispatch('remove_item_cart', {
            key
          })
          this.$swal(
            'Borrado!',
            'El producto ha sido eliminado del carrito.',
            'success'
          )
        // For more information about handling dismissals please visit
        // https://sweetalert2.github.io/#handling-dismissals
        } else if (result.dismiss === this.$swal.DismissReason.cancel) {
          this.$swal(
            'Cancelado',
            'No se ha hecho ningun cambio',
            'error'
          )
        }
      })
    }
  },
  filters: {
    format_number: function (value) {
      if (!value) return ''
      return isNaN(value) ? 0 : parseFloat(value).toFixed(2)
    }
  },
  computed: {
    TotalImportCart () {
      return this.$store.getters.TotalImportCart
    },
    totalItemCart () {
      return this.$store.getters.totalItemCart
    }
  }
}
</script>
