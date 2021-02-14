<template>
<v-container class="study-card my-5">
    <Navbar />
    <Loading :title="'Loading the TOEFL READING PRACTICE - TPO' + this.$route.params.tpo_id + ''" thumbnail="https://d2cyt36b7wnvt9.cloudfront.net/exams/wp-content/uploads/2020/07/09233814/TOEFL-Reading-Practice-600x400.png"/>
    <div v-if="!isLoadingRendered">
        <ReadingQuestions />
    </div>
</v-container>
</template>

<script>
import Loading from '../components/Loading'
import ReadingQuestions from '../components/ReadingQuestions'
import Navbar from '../components/Navbar'

export default {
    data(){
        return {
            isLoadingRendered: true
        }
    },
    components: {
        Loading,
        ReadingQuestions,
        Navbar
    },
    mounted() {
      setTimeout(() => {
        this.isLoadingRendered = false;
    }, 2200)
    }
}
</script>
<style scoped>

</style>
