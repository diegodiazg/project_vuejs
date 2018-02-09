<template>
  <div id="App">
    <top></top>
    <banner></banner>
    <container></container>
    <pie></pie>
  </div>
</template>

<script>
import top from './components/top'
import banner from './components/banner'
import container from './components/container'
import pie from './components/pie'

export default {
  name: 'App',
  components: { banner, container, pie, top }
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
