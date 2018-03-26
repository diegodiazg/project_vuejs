<template>
  <div id="App">
    <v-app class="white">
      <v-layout row wrap>
        <v-spacer></v-spacer>
        <v-btn flat to="/checkout">Checkout</v-btn>
        <v-btn flat to="/">Home</v-btn>
        <v-btn flat to="/login">Login</v-btn>
      </v-layout>
      <v-layout>
        <v-flex xs12 sm12 md4>
          <router-link to="/"><img src="./assets/logo_new.png" width="121" height="48"></router-link>
        </v-flex>
        <v-flex xs12 sm12 md4>
          <v-text-field
            flat
            prepend-icon="search"
            label="Search"
            class="hidden-sm-and-down"
          ></v-text-field>
        </v-flex>
        <v-flex>
          <cart></cart>
        </v-flex>
      </v-layout>
      <v-layout red >
        <v-toolbar
           dark color="primary"
        >
        <v-flex xs12 sm12 md1 >
          <v-btn flat to="/collections">Collection</v-btn>
        </v-flex>
        <v-flex xs12 sm12 md1>
          <v-btn flat to="/bags" >Bags</v-btn>
        </v-flex>
        <v-flex xs12 sm12 md1>
          <v-btn flat  to="/shoes" >Shoes</v-btn>
        </v-flex>
        <v-flex xs12 sm12 md1>
          <v-btn flat to="/hats">Hats</v-btn>
        </v-flex>
        <v-flex xs12 sm12 md1 v-if="login">
          <v-btn flat to="/invoices" >Facturas</v-btn>
        </v-flex>
        <v-flex xs12 sm12 md1>
          <v-btn flat to="/blog">Blog</v-btn>
        </v-flex>
        <v-flex xs12 sm12 md1>
          <v-btn flat to="/contact">Contact</v-btn>
        </v-flex>
        <v-flex xs12 sm12 md1 v-if="login">
          <v-btn flat to="/shippings" >Shppings</v-btn>
        </v-flex>
        </v-toolbar>
      </v-layout>
      <br/>
      <v-container grid-list-md text-xs-center>
        <router-view></router-view>
        <v-layout row wrap>
          <v-layout wrap row>
            <v-flex xs12  sm12 md3 lg3 xl4>
              <router-view name="banner"></router-view>
            </v-flex>
            <v-flex xs12 sm12 md9 lg9 xl8 >
              <router-view name="container"></router-view>
              <router-view name="offert"></router-view>
            </v-flex>
          </v-layout>
        </v-layout>
      </v-container>
      <pie></pie>
    </v-app>
  </div>
</template>

<script>
import pie from './components/pie'
import cart from './components/cart'

export default {
  name: 'App',
  components: { pie, cart },
  computed: {
    login () {
      return this.$store.getters.isAuthenticated
    }
  }
}
</script>

<style>

</style>
