<template>
    <v-content>
      <v-container fluid >
        <v-layout align-center justify-center>
          <v-flex xs12 sm12 md8>
            <v-card class="elevation-6">
              <v-toolbar dark color="primary">
                <v-toolbar-title>Register</v-toolbar-title>
                <v-spacer></v-spacer>
              </v-toolbar>
              <v-card-text>
                <v-form>
                  <v-text-field prepend-icon="person" v-model="first_name" name="first_name" label="First name" type="text"></v-text-field>
                  <v-text-field prepend-icon="person" v-model="last_name" name="last_name" label="Last name" type="text"></v-text-field>
                  <v-text-field prepend-icon="email" v-model="email" name="email" label="Email" type="text"></v-text-field>
                  <v-text-field prepend-icon="lock" v-model="password" name="password" label="Clave" id="password" type="password"></v-text-field>
                  <v-text-field prepend-icon="lock" v-model="password2" name="password2" label="Repite la clave" id="password2" type="password"></v-text-field>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn @click="register" color="primary">Register</v-btn>
                <v-btn to="/login" color="default">Sing</v-btn>
              </v-card-actions>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
      <v-snackbar
        :timeout="timeout"
        :top="y === 'top'"
        :bottom="y === 'bottom'"
        :right="x === 'right'"
        :left="x === 'left'"
        :multi-line="mode === 'multi-line'"
        :vertical="mode === 'vertical'"
        v-model="snackbar"
      >
      {{ text }}
        <v-btn flat color="pink" @click.native="snackbar = false">Cerrar</v-btn>
      </v-snackbar>
    </v-content>
</template>

<script>
import {HTTP} from './../services'

export default {
  data () {
    return {
      drawer: null,
      first_name: '',
      last_name: '',
      email: '',
      password: '',
      password2: '',
      snackbar: false,
      y: 'top',
      x: 'right',
      mode: '',
      timeout: 6000,
      text: 'Hello, I\'m a snackbar'
    }
  },
  props: {
    source: String
  },
  methods: {
    register () {
      if (this.password2 !== this.password) {
        this.text = 'La constraseña no coincide'
        this.snackbar = true
        return false
      }
      let self = this
      HTTP.post('/users/',
        {
          first_name: this.first_name,
          last_name: this.last_name,
          email: this.email,
          password: this.password,
          password2: this.password2
        })
        .then(function (response) {
          console.log(response)
          self.text = 'Se ha registrado correctamente.'
          self.snackbar = true
          self.clear()
        })
        .catch(function (error) {
          if (error.response.data) {
            var obj = error.response.data
            Object.keys(obj).forEach(key => {
              if (typeof obj[key] === 'object') {
                console.log(obj[key])
                console.log(' es un obj')
              }
              self.text = key + ' ' + obj[key]
              self.snackbar = true
            })
          }
        })
    },
    clear () {
      this.last_name = ''
      this.email = ''
      this.password = ''
      this.password2 = ''
      this.auth()
    },
    auth () {
      let email = this.email
      let password = this.password
      this.$store.dispatch('auth_user', {
        email,
        password
      })
    }
  }
}
</script>
