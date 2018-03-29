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
          <td class="text-xs-right">{{ props.item.quantity|format_number }}</td>
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
          :amount="this.TotalImportCart"
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
               v-model="nit"
               required
             ></v-text-field>
          <v-text-field
              label="Address"
              v-model="address"
              required
          ></v-text-field>
          <v-text-field
                 label="Phone"
                 v-model="phone"
                 required
          ></v-text-field>
          <v-text-field
                 label="Reference"
                 v-model="reference"
                 required
          ></v-text-field>
          <v-checkbox
            color="pink"
            v-model="term_and_condition"
          >
            <div slot="label">
              Do you accept the
              <a href="#" @click.prevent='click' @click.stop="terms = true">terms</a>
              and
              <a href="#" @click.prevent='click'  @click.stop="conditions = true">conditions?</a>
            </div>
          </v-checkbox>
        </v-container>
      </v-card>
      <v-btn outline color="indigo" @click="pay">Pay</v-btn>
    </v-flex>
    <v-layout row justify-center>
        <v-dialog v-model="terms" persistent max-width="290">
          <v-card>
            <v-card-title class="headline">Terms</v-card-title>
            <v-card-text>Let Google help apps determine location. This means sending anonymous location data to Google, even when no apps are running.</v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="green darken-1" flat @click.native="terms = false">Disagree</v-btn>
              <v-btn color="green darken-1" flat @click.native="terms = false">Agree</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
    </v-layout>
    <v-layout row justify-center>
        <v-dialog v-model="conditions" persistent max-width="290">
          <v-card>
            <v-card-title class="headline">Conditions</v-card-title>
            <v-card-text>Let Google help apps determine location. This means sending anonymous location data to Google, even when no apps are running.</v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="green darken-1" flat @click.native="conditions = false">Disagree</v-btn>
              <v-btn color="green darken-1" flat @click.native="conditions = false">Agree</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
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
      terms: false,
      conditions: false,
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
      term_and_condition: false,
      number_credit_cart: '4444444444444444',
      expired_date: '121212',
      cvc: '',
      snackbar: false,
      y: 'top',
      x: 'right',
      mode: '',
      timeout: 6000,
      text: 'Hello, I\'m a snackbar',
      paypal: false
    }
  },
  methods: {
    deleteItem (item) {
      const index = this.items.indexOf(item)
      confirm('Are you sure you want to delete this item?') && this.items.splice(index, 1)
    },
    click (e) {
      e.preventDefault()
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
          this.$store.dispatch('remove_item_cart', {
            key
          })
          this.message('success', 'Deleted!', 'El producto se ha movido del carrito.')
        } else if (result.dismiss === this.$swal.DismissReason.cancel) {
          this.message('error', 'Canceled!', 'El producto se mantiene en el carrito.')
        }
      })
    },
    pay () {
      if (!this.term_and_condition) {
        this.snackbar = true
        this.text = 'Debes aceptar los terminos y condiciones.'
      }
      let self = this
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
          console.log(response.data)
          self.clear()
        })
        .catch(function (error) {
          console.log(error)
          this.message('error')
          // mostrar errores.
        })
    },
    clear () {
      this.address = ''
      this.phone = ''
      this.nit = ''
      this.reference = ''
      this.reference_number = ''
      this.shipping = ''
      this.description = ''
      this.discoun = ''
      this.term_and_condition = false
      this.$store.dispatch('reset_cart')
      this.message('success')
    },
    message (type, message, title) {
      if (type === 'success') {
        this.$swal({
          type: type,
          title: title,
          text: message
        })
      }
      if (type === 'error') {
        this.$swal({
          type: type,
          title: title,
          text: message
        })
      }
      if (type === 'confirm') {
        console.log('llegue al confir')
        this.$swal({
          title: 'Estas seguro?',
          text: 'El producto se eliminará del carrito!',
          type: 'warning',
          showCancelButton: true,
          confirmButtonText: 'Si, borrarlo!',
          cancelButtonText: 'No'
        }).then((result) => {
          if (result) {
            console.log('diego')
            return true
          } else if (result.dismiss === this.$swal.DismissReason.cancel) {
            console.log('restod de un ')
            return false
          }
        })
      }
    }
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
    },
    items () {
      return this.$store.state.cart
    }
  }
}
</script>
