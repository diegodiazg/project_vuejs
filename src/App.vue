<template>
  <div id="App">
    <v-app>
      <div class="row gray">
      <div class="col s6 pull-s12">
        <div class="col s10">(502) 78945612</div>
        <div class="col s2">Español</div>
      </div>
      <div class="col s6 push-s12">
        <div class="col s6">Acceder</div>
        <div class="col s6">Servicio</div>
      </div>
      </div>
      <v-toolbar color='red' class='white--text'>
        <v-toolbar-side-icon class='white--text'></v-toolbar-side-icon>
        <v-toolbar-title>Title</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-toolbar-items class="hidden-sm-and-down white--text">
            <v-btn flat class='white--text'>Link One</v-btn>
            <v-btn flat class='white--text'>Link Two</v-btn>
            <v-btn flat class='white--text'>Link Three</v-btn>
          </v-toolbar-items>
      </v-toolbar>
      <div>
        <img src="http://mmi.cdhyt.org/media/pictures/2018/02/25/logo_jDztL3K.png">
      </div>
      <v-container grid-list-md text-xs-center>
        <v-layout row wrap>
          <v-carousel>
            <v-carousel-item src="http://mmi.cdhyt.org/media/pictures/2018/02/25/14448991_591277367725736_6139841395852704607_n.jpg"  ></v-carousel-item>
          </v-carousel>
          <v-card
              class="portrait"
              img="http://mmi.cdhyt.org/media/pictures/2018/02/25/14448991_591277367725736_6139841395852704607_n.jpg"
              height="300px"
            >
          </v-card>
          <v-layout row>
            <v-flex xs9 order-md2 order-xs1>
              <container></container>
              <offert></offert>
            </v-flex>
            <v-flex xs3 order-md1 order-xs3>
              <banner></banner>
            </v-flex>
          </v-layout>
        </v-layout>
      </v-container>
      <pie></pie>
    </v-app>
  </div>
</template>

<script>
import container from './components/container'
import banner from './components/banner'
import offert from './components/offert'
import pie from './components/pie'

export default {
  name: 'App',
  components: { container, banner, offert, pie }
}
</script>

<style>

</style>
