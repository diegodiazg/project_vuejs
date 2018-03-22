<template>
  <v-layout>
    <v-flex xs12 sm12 >
      <v-data-table
        :headers="headers"
        :items="items"
        hide-actions
        class="elevation-1"
      >
        <template slot="items" slot-scope="props">
          <td>{{ props.item.address }}</td>
          <td>{{ props.item.phone }}</td>
          <td>{{ props.item.reference_number }}</td>
          <td>{{ props.item.reference }}</td>
          <td class="text-xs-right">{{ props.item.status|status_to_text }}</td>
          <td class="text-xs-right" style="width:20%">
            {{ props.item.invoice_obj.total|format_number}}
          </td>
          <td class="text-xs-right" style="width:20%">
            {{ props.item.invoice_obj.correlative}}
          </td>
          <td class="text-xs-right" style="width:20%">
            {{ props.item.created_at|format_date}}
          </td>
          <td class="justify-center layout px-0">
           <v-btn :to="'shippings/'+props.item.id" icon class="mx-0" @click="deleteItem(props.item)">
             <v-icon color="blue">list</v-icon>
           </v-btn>
          </td>
        </template>
      </v-data-table>
    </v-flex>
  </v-layout>
</template>
<script>

// import PayPal from 'vue-paypal-checkout'
import {HTTP} from './../services'
import moment from 'moment'
export default {
  name: 'invoices',
  data () {
    return {
      headers: [
        {text: 'Addres', value: 'Dirección', 'align': 'right'},
        {text: 'Phone', value: 'Phone', 'align': 'right'},
        {text: 'Reference number', value: 'reference_number', 'align': 'right'},
        {text: 'Reference', value: 'reference', 'align': 'right'},
        {text: 'Status', value: 'status', 'align': 'right'},
        {text: 'total', value: 'invoice_obj.total', 'align': 'right'},
        {text: 'Invoice', value: 'invoice_obj.correlative', 'align': 'right'},
        {text: 'Fecha', value: 'created_at', 'align': 'right'},
        { text: 'Actions', value: 'name', sortable: false, 'align': 'right' }
      ],
      items: [],
      value: 0
    }
  },
  methods: {
    async list () {
      let self = this
      HTTP.get('/shippings/')
        .then(function (response) {
          self.items = response.data
        })
        .catch(function (error) {
          console.log(error)
        })
    }
  },
  created () {
    this.list()
  },
  filters: {
    format_number: function (value) {
      if (!value) return ''
      return isNaN(value) ? 0 : parseFloat(value).toFixed(2)
    },
    format_date: function (value) {
      if (!value) return ''
      if (value) {
        return moment(String(value)).format('MM/DD/YYYY hh:mm')
      }
    },
    status_to_text: function (value) {
      if (!value) return ''
      if (value === 'T') {
        return 'Transito'
      }
      if (value === 'E') {
        return 'Entregado'
      }
    }
  }
}
</script>
