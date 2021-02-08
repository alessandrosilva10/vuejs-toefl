<template>
  <div class="">
    <Navbar/>
      <v-card
        class="mx-auto card"
        max-width="1000"
        outlined
    >
    <Forms />
    </v-card>
  </div>
</template>

<script>
import Forms from '@/components/Forms';
import Navbar from '../components/Navbar.vue';

export default {
    name: 'AddSpeaking',
    components: {
        Forms,
        Navbar
    },
    data: () => ({

    }),
}

</script>

<style scoped>
.card {
    padding-top: 20px;
    margin-top: 50px;
    border: 1px solid;
}
</style>
