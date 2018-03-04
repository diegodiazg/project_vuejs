<template>
  <div>
      <v-carousel xs12>
        <v-carousel-item src="http://mmi.cdhyt.org/media/pictures/2018/02/25/14448991_591277367725736_6139841395852704607_n.jpg"  ></v-carousel-item>
      </v-carousel>
      <v-card
          class="portrait"
          img="http://mmi.cdhyt.org/media/pictures/2018/02/25/14448991_591277367725736_6139841395852704607_n.jpg"
          height="300px"
        >
      </v-card>
  </div>
</template>

<script>

export default {
  name: 'principal',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
