<template>
    <router-view></router-view>
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
