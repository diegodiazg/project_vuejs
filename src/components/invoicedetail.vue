<template>
    <div>
      <v-flex xs12 md12 sm12 lg12 xl12>
      sdfas
    </v-flex>
  </div>
</template>

<script>
import {HTTP} from './../services'

export default {
  name: 'detailinvoice',
  data () {
    return {
      item: [],
      detail: []
    }
  },
  mounted () {
    this.get_detail()
  },
  methods: {
    get_detail () {
      let self = this
      HTTP.get('invoices/' + this.$route.params.id)
        .then(function (response) {
          self.item = response.data
          self.get_invoice_detail()
        })
        .catch(function (error) {
          console.log(error)
        })
    },
    get_invoice_detail () {
      let self = this
      HTTP.get('invoice_detail/' + this.$route.params.id)
        .then(function (response) {
          self.detail = response.data
        })
        .catch(function (error) {
          console.log(error)
        })
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
