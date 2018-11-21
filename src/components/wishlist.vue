<template>
  <div>
   <v-layout column>
        <v-container fluid grid-list-md>
          <v-layout row wrap>
            <v-flex xs12 md6>
              <v-card>
                <v-card-media
                  src="https://puntoventa.diegodiazgt.com/media/pictures/2018/02/26/15966251_648255662027906_1137641542797380884_n.jpg"
                  height="300px">
                  <v-container fill-height fluid>
                   <v-layout fill-height>
                     <v-flex xs12 align-end flexbox>
                       <span class="headline white--text"> Titulo</span>
                     </v-flex>
                   </v-layout>
                 </v-container>
                </v-card-media>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn icon>
                    <v-icon>favorite</v-icon>
                  </v-btn>
                  <v-btn icon>
                    <v-icon>bookmark</v-icon>
                  </v-btn>
                  <v-btn icon>
                    <v-icon>share</v-icon>
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-flex>
            <v-flex xs12 md6>
              <v-card>
                <v-card-media
                  src="https://puntoventa.diegodiazgt.com/media/pictures/2018/02/26/13710465_564647417055398_6443911425055744152_o.jpg"
                  height="300px">
                   <v-container fill-height fluid>
                    <v-layout fill-height>
                      <v-flex xs12 align-end flexbox>
                        <span class="headline white--text"> Titulo</span>
                      </v-flex>
                    </v-layout>
                  </v-container>
                </v-card-media>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn icon>
                    <v-icon>favorite</v-icon>
                  </v-btn>
                  <v-btn icon>
                    <v-icon>bookmark</v-icon>
                  </v-btn>
                  <v-btn icon>
                    <v-icon>share</v-icon>
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-flex>
          </v-layout>
        </v-container>
  </v-layout>
  </div>
</template>

<script>

export default {
  name: 'offer',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      products: [],
      token: ''
    }
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
