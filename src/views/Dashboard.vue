<template>
  <div class="dashboard">
      <Navbar/>
      <h1 class="subtitle-1 grey--text">Dashboard</h1>
        <v-container class="my-5">
            <v-layout row>
                <v-flex xs12 md6>
                    Dashboard
                </v-flex>
            </v-layout>
        </v-container>
         <div id="page-container">
   <div id="content-wrap">
     <!-- all other page content -->
   </div>
   <footer id="footer"></footer>
 </div>
  </div>
</template>

<script>
import Navbar from '@/components/Navbar';
// @ is an alias to /src
export default {
    name: 'Dashboard',
    components: {
        Navbar
       // VuetifyAudio: () => import('vuetify-audio'),
    },
    data: () => ({
       // file: 'https://public.by.files.1drv.com/y4mxdNONXPxnpk49I1Ll7oBi4XhVGoO0o3e9q5KnKRHXgo90iKtyR01hBDsrLyNNo4ntCb0awGEAdgNVoeyuwD2BczRP8LP4Yzfjwj-SR_FHtXf4sABjSAimxqB3DdnBZtxdp8vm8wh2kVfFHor6oA2xCA3i3dPCbVd8EP45SK5rxtVjSl06kMGg8EbYuKdZwc3PgeGuQAi7A1N9hgaOo9Tv5Ize6j3fPXecaIOShRgRrw?',

    }),
}
//https://sndup.net/6qqh
</script>

<style scoped>
  p {
  text-align: justify;
  text-justify: inter-word;
}

#footer {
  position: absolute;
  bottom: 0;
  height: 2.5rem;
  padding-bottom: 230px;           /* Footer height */
}
</style>
