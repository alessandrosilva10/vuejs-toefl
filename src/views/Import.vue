<template>
  <div class="team">
      <Navbar />
      <br/>
    <h1 class="subtitle-1 grey--text">Import videos from YouTube to the server</h1>
    <v-container class="my-5">
        <Form />
    </v-container>
  </div>
</template>

<script>

import Form from '../components/Form';
import Navbar from '@/components/Navbar';
//import axios from 'axios';

export default {
    components: {
        Form,
        Navbar
    },
    data(){
        return {

        }
    }
}
</script>
