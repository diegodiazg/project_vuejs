<template>
  <v-layout>
    <v-flex xs12 sm9 md8>
      <v-data-table
        :headers="headers"
        :items="items"
        hide-actions
        class="elevation-1"
      >
        <template slot="items" slot-scope="props">
          <td>{{ props.item.name }}</td>
          <td class="text-xs-right">{{ props.item.price_sell|format_number }}</td>
          <td class="text-xs-left">{{ props.item.description }}</td>
          <td class="text-xs-right" style="width:20%">
            <v-text-field
              style="text-alight:right;"
              @change="add_item_cart(props.item.index, props.item, value)"
              type="number"
              :value="props.item.quantity|format_number"
             ></v-text-field>
          </td>
          <td class="justify-center layout px-0">
           <v-btn icon class="mx-0" @click="removeItem(props.item.index)">
             <v-icon color="pink">delete</v-icon>
           </v-btn>
          </td>
        </template>
      </v-data-table>
    </v-flex>
    <v-flex xs12 sm3 md4>
      <v-card>
        <v-container>
          <h3 class="display-1"> TOTAL:{{TotalImportCart|format_number}}</h3>
          <v-checkbox
               label="paypal?"
               v-model="paypal"
             ></v-checkbox>
        </v-container>
      </v-card>
      <v-card>
        <v-container v-if="paypal == false" transition="fade-transition">
          <v-card-text>
            <v-text-field label="Credit cart" mask="credit-card" v-model="number_credit_cart"></v-text-field>
          </v-card-text>
          <v-card-text>
            <v-text-field label="CVC" v-model="cvc"></v-text-field>
            <v-text-field label="Expired date" mask="date" v-model="expired_date"></v-text-field>
          </v-card-text>
        </v-container>
         <PayPal
          :amount="this.$store.getters.TotalImportCart"
          :currency="this.$store.getters.getCurrency"
          env="sandbox"
          :client="credentials"
          v-if="paypal"
          :items="items"
          :notify-url="this.$store.state.baseURL+'callback_paypal/'"
           transition="fade-transition">
          >
        </PayPal>
      </v-card>
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
          <v-checkbox
            color="green"
            v-model="term_and_condition"
          >
            <div slot="label">
              Do you accept the
              <a href="#" @click.stop="terms = true">terms</a>
              and
              <a href="#" @click.stop="conditions = true">conditions?</a>
            </div>
          </v-checkbox>
        </v-container>
      </v-card>
      <v-btn outline color="indigo" @click="pay">Pay</v-btn>
    </v-flex>
  </v-layout>
</template>
<script>

import PayPal from 'vue-paypal-checkout'
import {HTTP} from './../services'

export default {
  name: 'checkout',
  data () {
    return {
      credentials: {
        sandbox: 'AZeYwdp3p67IH9NOqKVsKBjJCBOwJ2rgi3p1XjPKsnrGq63QkVzbu4w4S5wQHqRoLYJas5OLnOctAVGJ',
        production: 'remedios.paraelalma-facilitator_api1.gmail.com'
      },
      headers: [
        {text: 'Name', value: 'name', 'align': 'right'},
        {text: 'Price', value: 'price_sell', 'align': 'right'},
        {text: 'Description', value: 'description', 'align': 'left'},
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
      reference_number: 0,
      shipping: 0,
      discount: 0,
      description: '',
      total: '',
      term_and_condition: '',
      number_credit_cart: '4444444444444444',
      expired_date: '121212',
      cvc: '',
      paypal: false
    }
  },
  methods: {

    deleteItem (item) {
      const index = this.items.indexOf(item)
      confirm('Are you sure you want to delete this item?') && this.items.splice(index, 1)
    },
    removeItem: function (key, event) {
      this.$swal({
        title: 'Estas seguro?',
        text: 'El producto se eliminará del carrito!',
        type: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Si, borrarlo!',
        cancelButtonText: 'No'
      }).then((result) => {
        if (result) {
          this.items = this.$store.dispatch('remove_item_cart', {
            key
          })
          this.$swal(
            'Deleted!',
            'Your imaginary file has been deleted.',
            'success'
          )
        // For more information about handling dismissals please visit
        // https://sweetalert2.github.io/#handling-dismissals
        } else if (result.dismiss === this.$swal.DismissReason.cancel) {
          this.$swal(
            'Cancelled',
            'Your imaginary file is safe :)',
            'error'
          )
        }
      })
    },

    change_value () {
      console.log('llegue')
    },
    add_item_cart (index, model, value) {
      console.log(value)
    },
    pay () {
      HTTP.post('/invoices/', {
        products: this.items,
        address: this.address,
        phone: this.phone,
        nit: this.nit,
        reference: this.reference,
        reference_number: this.reference_number,
        shipping: this.shipping,
        description: this.description,
        discount: this.discount
      })
        .then(function (response) {
          console.log(response)
          // limpoiar el carrito
        })
        .catch(function (error) {
          console.log(error)
          // mostrar errores.
        })
    }
  },
  updated () {
    this.items = this.$store.state.cart
  },
  components: {
    PayPal
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
    }
  }
}
</script>
