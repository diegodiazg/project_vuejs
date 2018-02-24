<template>
 <div>
   <div class="container">
      <div class="section">
        <!--   Icon Section   -->
        <div class="row">
          <div class="col s12 m4">
            <div class="icon-block">
              <h2 class="center brown-text"><i class="material-icons">flash_on</i></h2>
              <h5 class="center">Speeds up development</h5>
              <p class="light">We did most of the heavy lifting for you to provide a default stylings that incorporate our custom components. Additionally, we refined animations and transitions to provide a smoother experience for developers.</p>
            </div>
          </div>
          <div class="col s12 m4">
            <div class="icon-block">
              <h2 class="center brown-text"><i class="material-icons">group</i></h2>
              <h5 class="center">User Experience Focused</h5>

              <p class="light">By utilizing elements and principles of Material Design, we were able to create a framework that incorporates components and animations that provide more feedback to users. Additionally, a single underlying responsive system across all platforms allow for a more unified user experience.</p>
            </div>
          </div>
          <div class="col s12 m4">
            <div class="icon-block">
              <h2 class="center brown-text"><i class="material-icons">settings</i></h2>
              <h5 class="center">Easy to work with</h5>
              <p class="light">We have provided detailed documentation as well as specific code examples to help new users get started. We are also always open to feedback and can answer any questions a user may have about Materialize.</p>
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
            <h4>Contact Us</h4>
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
    this.get_products()
  },
  methods: {
    get_products () {
      this.$http.get('http://mmi.tests/api/products/', {
        headers: { 'Authorization': 'JWT eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE1MTk0NjQ1MzgsImVtYWlsIjoiYWRtaW5AYWRtaW4uY29tIiwidXNlcl9pZCI6MSwib3JpZ19pYXQiOjE1MTk0NjA5MzgsInVzZXJuYW1lIjoiYWRtaW5AYWRtaW4uY29tIn0.8T9DGAU8LwoeUrSVHYP4GReKwBxqo08-m0EYpyoofi0' } }
      ).then(result => {
        this.products = result
      }, error => {
        console.error(error)
      })
    },
    auth_api () {
      this.$http.post('http://mmi.cdhyt.org/api-token-auth/', {'username': 'admin@admin.com', 'password': 'qwerty123'}
      ).then(result => {
        this.products = result
      }, error => {
        console.error(error)
      })
    }
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
