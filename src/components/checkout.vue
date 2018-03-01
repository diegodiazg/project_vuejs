<template>
  <v-data-table
    :headers="headers"
    :items="items"
    hide-actions
    class="elevation-1"
  >
    <template slot="items" slot-scope="props">
      <td>{{ props.item.product.name }}</td>
      <td class="text-xs-right">{{ props.item.product.price_sell }}</td>
      <td class="text-xs-right">{{ props.item.product.brand }}</td>
      <td class="text-xs-right">{{ props.item.product.category }}</td>
      <td class="text-xs-right">{{ props.item.quantity }}</td>
      <td class="justify-center layout px-0">
       <v-btn icon class="mx-0" @click="editItem(props.item)">
         <v-icon color="teal">edit</v-icon>
       </v-btn>
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
        { text: 'Name', value: 'product.name' },
        { text: 'Price', value: 'product.price_sell' },
        { text: 'Brand', value: 'product.brand' },
        { text: 'Category', value: 'product.category' },
        { text: 'Quantity', value: 'quantity' },
        { text: 'Actions', value: 'name', sortable: false }
      ],
      items: []
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
    }
  },
  updated () {
    this.items = this.$store.state.cart
  },
  components: {
    // PayPal
  }
}
</script>
