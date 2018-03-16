<template>
  <v-snackbar
    :timeout="timeout"
    :top="y === 'top'"
    :bottom="y === 'bottom'"
    :right="x === 'right'"
    :left="x === 'left'"
    :multi-line="mode === 'multi-line'"
    :vertical="mode === 'vertical'"
    v-model="set_show_local"
  >
  {{ text }}
  <v-btn flat color="pink" @click.native="show = false">Cerrar</v-btn>
</v-snackbar>
</template>

<script>
export default {
  name: 'toast',
  data () {
    return {
      show_local: false
    }
  },
  props: {
    text: String,
    mode: String,
    timeout: Number,
    show: false,
    y: String,
    x: String

  },
  computed: {
    set_show_local () {
      return this.show
    }
  }
}
</script>
