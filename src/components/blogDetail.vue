<template>
    <div>
      <v-flex xs12 md12 sm12 lg12 xl12>
      <span> {{detail.head}}</span>
      <v-card flat>
        <v-card-text><span v-html="detail.body"></span></v-card-text>
      </v-card>
    </v-flex>
  </div>
</template>

<script>
import {HTTP} from './../services'

export default {
  name: 'blogDetail',
  data () {
    return {
      detail: []
    }
  },
  mounted () {
    this.get_detail()
  },
  methods: {
    get_detail () {
      let self = this
      HTTP.get('posts/' + this.$route.params.id)
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
