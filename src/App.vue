<template>
  <div id="App">
    <v-app>
      <v-toolbar color='red' class='white--text'>
        <v-toolbar-side-icon class='white--text'></v-toolbar-side-icon>
        <v-toolbar-title>Title</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-text-field class='white--text' prepend-icon="search" hide-details single-line></v-text-field>
          <v-toolbar-items class="hidden-sm-and-down white--text">
            <cart></cart>
            <router-link to="/checkout" append>Checkout</router-link>
            <v-btn flat class='white--text'><router-link to="/" append>Home</router-link></v-btn>
            <v-btn flat class='white--text'>Link Three</v-btn>
          </v-toolbar-items>
      </v-toolbar>
      <div>
        <img src="http://mmi.cdhyt.org/media/pictures/2018/02/25/logo_jDztL3K.png">
      </div>
      <v-container grid-list-md text-xs-center>
          <router-view></router-view>
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
  components: { pie, cart }
}
</script>

<style>

</style>
