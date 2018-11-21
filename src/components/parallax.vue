<template>
  <div class="parallax-container valign-wrapper">
    <div class="section no-pad-bot">
      <div class="container">
        <div class="row center">
          <h5 class="header col s12 light">A modern responsive front-end framework based on Material Design</h5>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'parallax',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  }
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .parallax-container {
      min-height: 380px;
      line-height: 0;
      height: auto;
      color: rgba(255,255,255,.9);
    }
    .parallax-container .section {
        width: 100%;
    }
</style>
