<template>
    <v-content>
      <v-container fluid >
        <v-layout align-center justify-center>
          <v-flex xs12 sm12 md8>
            <v-card class="elevation-6">
              <v-toolbar dark color="primary">
                <v-toolbar-title>Autenticación</v-toolbar-title>
                <v-spacer></v-spacer>
              </v-toolbar>
              <v-card-text>
                <v-form>
                  <v-text-field prepend-icon="person" name="login" label="Usuario" type="text"></v-text-field>
                  <v-text-field prepend-icon="lock" name="password" label="Clave" id="password" type="password"></v-text-field>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="primary">Ingresar</v-btn>
                <button @click="authenticate('github')">auth Github</button>
                <button @click="authenticate('facebook')">facebook</button>
                <button @click="authenticate('google')">google</button>
              </v-card-actions>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
</template>

<script>
export default {
  data: () => ({
    drawer: null
  }),
  props: {
    source: String
  },
  methods: {
    authenticate: function (provider) {
      this.$auth.authenticate(provider).then(function () {
        // Execute application logic after successful social authentication
      })
    }
  }
}
</script>
