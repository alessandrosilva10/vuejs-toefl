<template>
<v-app style="margin-left: -20px; margin-right: -20px;">
        <div class="hidden-md-and-up">
    <v-card class="mt-5 mb-8">
      <v-card-text>
        <v-container>
                <v-card  color="blue lighten-3" dark>
                  <v-card-title></v-card-title>
                  <v-card-text>
                      <img src="https://freepngimg.com/thumb/blocked/3-2-blocked-png-picture.png" />
                      <h1 class="white--text center">Sorry - we currently do not support mobile access.</h1>
                  </v-card-text>
                </v-card>
        </v-container>
      </v-card-text>
    </v-card>
</div>
<div class="hidden-md-and-down">
 <v-content class="mx-4">
    <router-view></router-view>
     </v-content></div>
</v-app>
</template>

<script>
import Login from '@/views/Login';

export default {
  name: 'App',
  components: {
    Login
  },
 title: 'Homepage Title',
  data: () => ({
    //
  }),
  computed: {
    pageTitle: function() {
        return this.$route.meta.title;
    }
},
    metaInfo: {
      // if no subcomponents specify a metaInfo.title, this title will be used
      title: 'TOEFL MADE EASY',
      // all titles will be injected into this template
      titleTemplate: 'TOEFL MADE EASY - 2021'
    }
};
</script>
