<template>
<v-container class="study-card my-5">
    <Navbar />
    <TOEFL thumbnail="https://d2cyt36b7wnvt9.cloudfront.net/exams/wp-content/uploads/2020/07/09233814/TOEFL-Reading-Practice-600x400.png"/>
</v-container>
</template>

<script>
import TOEFL from '../components/TOEFL.vue';
import Navbar from '../components/Navbar.vue';

export default {
    data(){
        return {

        }
    },
    components: {
        TOEFL,
        Navbar
    }
}
</script>

<style scoped>

</style>

