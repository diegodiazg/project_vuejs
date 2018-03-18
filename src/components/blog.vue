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
              <v-card flat tile>
                <v-card-media v-if="n.picture_obj[0]"
                  :src="$store.state.mediaURL+n.picture_obj[0].url"
                  height="150px"
                >
                </v-card-media>
              </v-card>
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
      size: 'sm',
      items: []
    }
  },
  methods: {
    async list () {
      let self = this
      HTTP.get('/posts/')
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
