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
          <td>{{ props.item.correlative }}</td>
          <td class="text-xs-right">{{ props.item.customer_obj.full_name }}</td>
          <td class="text-xs-right" style="width:20%">
            {{ props.item.total|format_number}}
          </td>
          <td class="text-xs-right" style="width:20%">
            {{ props.item.created_at|format_date}}
          </td>
          <td class="justify-center layout px-0">
           <v-btn :to="'invoice/'+props.item.id" icon class="mx-0" @click="deleteItem(props.item)">
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
        {text: 'Correlativo', value: 'correlative', 'align': 'right'},
        {text: 'Cliente', value: 'customer_obj.full_name', 'align': 'right'},
        {text: 'total', value: 'total', 'align': 'right'},
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
      HTTP.get('/invoices/')
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
    }
  }
}
</script>
