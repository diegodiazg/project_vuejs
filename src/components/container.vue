<template>
 <div>
   <div class="container">
      <div class="section">
        <!--   Icon Section   -->
        <div class="row">
          <div class="col s12 m4" v-for="(item, key) in products" :key="key">
            <div class="icon-block">
              <h2 class="center brown-text"><img width="200"  height="200" :src="'http://mmi.cdhyt.org/media/'+item.picture"></h2>
              <h5 class="center">{{item.name}}</h5>
              <p class="light">{{item.description}}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="parallax-container valign-wrapper">
      <div class="section no-pad-bot">
        <div class="container">
          <div class="row center">
            <h5 class="header col s12 light">A modern responsive front-end framework based on Material Design</h5>
          </div>
        </div>
      </div>
      <div class="parallax"><img src="../assets/background2.jpg" alt="Unsplashed background img 2"></div>
    </div>
    <div class="container">
      <div class="section">
        <div class="row">
          <div class="col s12 center">
            <h3><i class="mdi-content-send brown-text"></i></h3>
            <h4>Contact Us </h4>
            <p class="left-align light">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam scelerisque id nunc nec volutpat. Etiam pellentesque tristique arcu, non consequat magna fermentum ac. Cras ut ultricies eros. Maecenas eros justo, ullamcorper a sapien id, viverra ultrices eros. Morbi sem neque, posuere et pretium eget, bibendum sollicitudin lacus. Aliquam eleifend sollicitudin diam, eu mattis nisl maximus sed. Nulla imperdiet semper molestie. Morbi massa odio, condimentum sed ipsum ac, gravida ultrices erat. Nullam eget dignissim mauris, non tristique erat. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae;</p>
          </div>
        </div>
      </div>
    </div>
    <div class="parallax-container valign-wrapper">
      <div class="section no-pad-bot">
        <div class="container">
          <div class="row center">
            <h5 class="header col s12 light">A modern responsive front-end framework based on Material Design</h5>
          </div>
        </div>
      </div>
      <div class="parallax"><img src="../assets/background3.jpg" alt="Unsplashed background img 3"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'container',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      products: [],
      token: ''
    }
  },
  mounted () {
    // this.auth_api()
    this.$store.dispatch('auth_api')
    this.auth_api()
  },
  methods: {
    get_products () {
      console.log(this.token)
      this.$http.get('http://mmi.cdhyt.org/api/products/', {
        headers: { 'Authorization': 'JWT ' + this.token } }
      ).then(result => {
        this.products = result.body
        console.log(this.products)
      }, error => {
        console.error(error)
      })
    },
    auth_api () {
      this.$http.post('http://mmi.cdhyt.org/api-token-auth/', {'email': 'admin@admin.com', 'password': 'qwerty123'}
      ).then(result => {
        this.token = result.body.token
        console.log(this.token)
        this.get_products()
      }, error => {
        console.error(error)
      })
    }
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
