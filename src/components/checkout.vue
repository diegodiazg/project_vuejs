<template>
  <v-data-table
    :headers="headers"
    :items="items"
    hide-actions
    class="elevation-1"
  >
    <template slot="items" slot-scope="props">
      <td>{{ props.item.product.name }}</td>
      <td class="text-xs-right">{{ props.item.product.price_sell|format_number }}</td>
      <td class="text-xs-right">{{ props.item.product.brand }}</td>
      <td class="text-xs-right">{{ props.item.product.category }}</td>
      <td class="text-xs-right">
        <v-layout align-center>
          <v-btn flat value="left">
            <i class="material-icons">keyboard_arrow_down</i>
          </v-btn>
          <v-text-field
            name="quantity"
            change="chang_value()"
            id="testing"
            type="number"
            prefix="Q"
            :value="props.item.quantity|format_number"
           ></v-text-field>
           <v-btn flat value="right">
             <i class="material-icons">keyboard_arrow_up</i>
           </v-btn>
        </v-layout>
      </td>
      <td class="justify-center layout px-0">
       <v-btn icon class="mx-0" @click="deleteItem(props.item)">
         <v-icon color="pink">delete</v-icon>
       </v-btn>
      </td>
    </template>
  </v-data-table>
</template>
<script>

// import PayPal from 'vue-paypal-checkout'

export default {
  name: 'checkout',
  data () {
    return {
      credentials: {
        sandbox: 'ARyNDMbKwa-zLx7AtfPa-etrhyTVAFd2UjEivZ6JvlQSsoWoEjaourX2',
        production: 'remedios.paraelalma-facilitator_api1.gmail.com'
      },
      headers: [
        {text: 'Name', value: 'product.name', 'align': 'right'},
        {text: 'Price', value: 'product.price_sell', 'align': 'right'},
        {text: 'Brand', value: 'product.brand', 'align': 'right'},
        {text: 'Category', value: 'product.category', 'align': 'right'},
        {text: 'Quantity', value: 'quantity', 'align': 'right'},
        { text: 'Actions', value: 'name', sortable: false, 'align': 'right' }
      ],
      items: [],
      value: 0
    }
  },
  methods: {
    editItem (item) {
      this.editedIndex = this.items.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialog = true
    },
    deleteItem (item) {
      const index = this.items.indexOf(item)
      confirm('Are you sure you want to delete this item?') && this.items.splice(index, 1)
    },
    change_value () {
      console.log('llegue')
    }
  },
  updated () {
    this.items = this.$store.state.cart
  },
  components: {
    // PayPal
  },
  filters: {
    format_number: function (value) {
      if (!value) return ''
      return isNaN(value) ? 0 : parseFloat(value).toFixed(2)
    }
  }
}
</script>
