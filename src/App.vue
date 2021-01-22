<template>
  <v-app class="grey lighten-4">
      <Navbar />
      <v-content class="mx-4">
          <router-view></router-view>
      </v-content>
  </v-app>
</template>

<script>
import Navbar from '@/components/Navbar';

export default {
  name: 'App',
  components: {
    Navbar
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
