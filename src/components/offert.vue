<template>
  <div>
   <v-layout column>
        <v-container fluid grid-list-md>
          <v-layout row wrap>
            <v-flex xs12 md6>
              <v-card>
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
