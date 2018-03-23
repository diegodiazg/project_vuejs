<template>
  <v-layout>
    <v-flex xs12 sm8 offset-sm2>
      <v-card>
        <v-card-actions>
          <v-spacer></v-spacer>
        </v-card-actions>
        <v-container fluid v-bind="{ [`grid-list-${size}`]: true }">
          <v-layout row wrap>
            <v-flex
              xs4
              v-for="(n, key) in items"
              :key="key"
            >
            <router-link :to="'/collections/'+n.id">
              <v-card flat tile v-for="(item, k) in n.products_obj" :key="k">
                <v-card-media
                  :src="$store.state.mediaURL+item.picture[0]"
                  height="150px"
                >
                </v-card-media>
              </v-card>
            </router-link>
            </v-flex>
          </v-layout>
        </v-container>
      </v-card>
    </v-flex>
  </v-layout>
</template>
<script>
import {HTTP} from './../services'

export default {
  name: 'blog',
  data () {
    return {
      size: 'md',
      items: []
    }
  },
  methods: {
    async list () {
      let self = this
      HTTP.get('/collections/')
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
  }
}
</script>
