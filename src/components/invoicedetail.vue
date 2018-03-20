<template>
    <div>
      <v-flex xs12 md12 sm12 lg12 xl12>
      sdfas
    </v-flex>
  </div>
</template>

<script>
export default {
  name: 'detailproduct',
  props: {
    item: Object
  },
  data () {
    return {
      items: []
    }
  },
  mounted () {
    console.log('djsdlkjfalksjdñl deiog  dpero no lseuqp ')
    console.log(this.$route.params.id)
  },
  updated () {
    console.log('amfañlsm')
  },
  methods: {
  },
  filters: {
    format_number: function (value) {
      if (!value) return ''
      return isNaN(value) ? 0 : parseFloat(value).toFixed(2)
    }
  }
}
</script>
