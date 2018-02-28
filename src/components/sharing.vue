<template>
  <div class="text-xs-center">
    <social-sharing url="https://vuejs.org/"
      title="The Progressive JavaScript Framework"
      description="Intuitive, Fast and Composable MVVM for building interactive interfaces."
      quote="Vue is a progressive framework for building user interfaces."
      inline-template>
      <div>
          <network network="facebook">
            <i class="fa fa-facebook"></i> Facebook
          </network>
      </div>
    </social-sharing>
  </div>
</template>

<script>
export default {
  name: 'sharing',
  data () {
    return {
      msg: 'datat'
    }
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
