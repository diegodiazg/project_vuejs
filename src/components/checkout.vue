<template>
  <v-layout>
    <v-flex xs12 sm9 >
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
          <td class="text-xs-right" style="width:20%">
              <v-text-field
                class="text-alight:right;"
                name="quantity"
                change="chang_value()"
                id="testing"
                single-line
                type="number"
                :value="props.item.product.quantity|format_number"
               ></v-text-field>
          </td>
          <td class="justify-center layout px-0">
           <v-btn icon class="mx-0" @click="deleteItem(props.item)">
             <v-icon color="pink">delete</v-icon>
           </v-btn>
          </td>
        </template>
      </v-data-table>
    </v-flex>
    <v-flex xs12 sm3 >
      <v-card>
      <v-container>
      <v-text-field
           label="NIT"
           v-model="name"
           required
         ></v-text-field>
      <v-text-field
          label="Address"
          v-model="name"
          required
      ></v-text-field>
      <v-text-field
             label="Phone"
             v-model="name"
             required
      ></v-text-field>
      <v-text-field
             label="Reference"
             v-model="name"
             required
      ></v-text-field>
      </v-container>
      </v-card>
      <v-btn outline color="indigo" @click="pay">Pay</v-btn>
    </v-flex>
  </v-layout>
</template>
<script>

// import PayPal from 'vue-paypal-checkout'
import {HTTP} from './../services'

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
      value: 0,
      name: '',
      address: '',
      phone: '',
      nit: '',
      reference: '',
      num_reference: '',
      shipping: '',
      discount: '',
      description: ''
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
    },
    pay () {
      HTTP.post('/invoices/', {
        products: this.items,
        addres: this.address,
        phone: this.phone,
        nit: this.nit,
        reference: this.reference,
        num_reference: this.num_reference,
        shipping: this.shipping,
        descripction: this.descripction,
        discount: this.discount
      })
        .then(function (response) {
          console.log(response)
        })
        .catch(function (error) {
          console.log(error)
        })
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
