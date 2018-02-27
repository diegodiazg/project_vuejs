<template>
  <div class="text-xs-center">
    <v-menu
      :close-on-content-click="false"
      :nudge-width="200"
      v-model="menu"
    >
      <v-btn color="indigo" dark slot="activator">Cart shopping</v-btn>
      <v-card>
        <v-list>
          <v-list-tile avatar>
            <v-list-tile-avatar>
              <img src="/static/doc-images/john.jpg" alt="John">
            </v-list-tile-avatar>
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
              <img src="/static/doc-images/john.jpg" alt="John">
            </v-list-tile-avatar>
            <v-list-tile-title>{{it.name}} </v-list-tile-title>
          </v-list-tile>
        </v-list>
        <v-card-actions>
          <v-spacer></v-spacer>
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
    // this.list()
  },
  methods: {
    list () {
      // this.items = this.$store.dispatch('get_car_item')
      // this.items = this.item
    },
    delete () {
    },
    add (index, model) {
      this.set(this.items, index, model)
    },
    removeItem: function (key, model, event) {
      this.items.splice(key, 1)
    },
    filters: {
      format_number: function (value) {
        if (!value) return ''
        return isNaN(value) ? 0 : parseFloat(value).toFixed(2)
      }
    }
  }
}
</script>
