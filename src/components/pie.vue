<template>
  <v-footer height="auto">
    <v-flex xs12 sm12>
      <v-card >
        <v-card-title class="yellow ">
          <strong class="subheading">Get connected with us on social networks!</strong>
          <v-btn
            v-for="icon in icons"
            :key="icon"
            icon
            dark
            class="mx-3"
          >
            <v-icon size="24px">{{ icon }}</v-icon>
          </v-btn>
        </v-card-title>
        <v-card-text class="blue white--text" >
          <v-layout>
            <v-flex
              v-for="(col, i) in rows"
              :key="i"
              xs3
            >
              <span class="body-2" v-text="col.title.toUpperCase()"/>
              <div
                v-for="(child, i) in col.children"
                :key="i"
                v-text="child"
              />
            </v-flex>
            <v-flex xs3 layout column>
              <span class="body-2">CONTACT</span>
              <div>
                <v-icon size="18px" class="mr-3">watch-later</v-icon>
                New York, NY 10012, US
              </div>
              <div>
                <v-icon size="18px" class="mr-3">settings_phone</v-icon>
                info@info.com
              </div>
              <div>
                <v-icon size="18px" class="mr-3">settings_phone</v-icon>
                + 01 234 567 88
              </div>
              <div>
                <v-icon size="18px" class="mr-3">settings_phone</v-icon>
                + 01 234 567 89
              </div>
            </v-flex>
          </v-layout>
        </v-card-text>
        <v-card-actions class="red justify-center white--text">
          &copy;2018 — <strong>Mi Moda Internacional</strong>
        </v-card-actions>
      </v-card>
    </v-flex>
  </v-footer>
</template>

<script>
export default {
  name: 'pie',
  data: () => ({
    icons: ['phone', 'message', 'create', 'drafts', 'flag'],
    rows: [
      {
        title: 'Company Name',
        children: ['Here you can use rows and columns here to organize your footer content. Lorem ipsum dolor sit amet, consectetur adipisicing elit']
      },
      {
        title: 'Products',
        children: ['MDBootstrap', 'MDWordPress', 'BrandFlow', 'Bootstrap Angular']
      },
      {
        title: 'Useful Links',
        children: ['Your account', 'Become an Affiliate', 'Shipping Rates', 'Helper']
      }
    ]
  })
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
