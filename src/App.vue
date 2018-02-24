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

 nav ul a,
nav .brand-logo {
  color: #444;
}

p {
  line-height: 2rem;
}

.button-collapse {
  color: #26a69a;
}

.parallax-container {
  min-height: 380px;
  line-height: 0;
  height: auto;
  color: rgba(255,255,255,.9);
}
  .parallax-container .section {
    width: 100%;
  }
  .parallax-container .img {
    display: list-item !import;
  }
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

.icon-block {
  padding: 0 15px;
}
.icon-block .material-icons {
  font-size: inherit;
}

footer.page-footer {
  margin: 0;
}

</style>
