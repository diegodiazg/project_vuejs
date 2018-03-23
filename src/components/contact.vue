<template>
    <v-content>
      <v-container fluid>
        <v-layout align-center justify-center>
          <v-flex xs12 sm8 md8>
            <v-card class="elevation-6">
              <v-toolbar dark color="primary" >
                <v-toolbar-title>Contactanos</v-toolbar-title>
                <v-spacer></v-spacer>
              </v-toolbar>
              <v-card-text>
                <v-form>
                  <v-text-field prepend-icon="person" name="nombre" v-model="name" label="Nombre" type="text"></v-text-field>
                  <v-text-field prepend-icon="email" label="E-mail" v-model="email"
                    required
                    ></v-text-field>
                  <v-text-field  multi-line name="mensaje" v-model="message" label="Mensaje" type="text"></v-text-field>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn @click="submit" color="primary">Enviar</v-btn>
              </v-card-actions>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
</template>
<script>

import { validationMixin } from 'vuelidate'
import { required, maxLength, email } from 'vuelidate/lib/validators'
import {HTTP} from './../services'

export default {
  mixins: [validationMixin],
  validations: {
    name: { required, maxLength: maxLength(10) },
    email: { required, email },
    select: { required },
    checkbox: { required }
  },
  name: 'offer',
  data () {
    return {
      name: '',
      email: '',
      message: ''
    }
  },
  methods: {
    submit () {
      let self = this
      HTTP.post('/contact/', {
        name: this.name,
        email: this.email,
        comment: this.message
      })
        .then(function (response) {
          console.log(response)
          self.clear()
        })
        .catch(function (error) {
          console.log(error)
        })
    },
    clear () {
      this.name = ''
      this.email = ''
      this.message = ''
    }
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
