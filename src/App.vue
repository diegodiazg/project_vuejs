<template>
  <div id="app">
    <img src="./assets/logo.png">
    <router-view/>
    <router-view name="helper"/>
    <router-view name="footer"/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>

  @media only screen and (max-width : 992px) {
    .parallax-container .section {
      position: absolute;
      top: 40%;
    }
    #index-banner .section {
      top: 10%;
    }
  }

  @media only screen and (max-width : 600px) {
    #index-banner .section {
      top: 0;
    }
  }

</style>
