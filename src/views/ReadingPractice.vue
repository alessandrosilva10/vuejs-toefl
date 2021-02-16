<template>
<v-container class="study-card my-5">
    <Navbar />
    <Loading :title="'Loading TPO' + this.$route.params.tpo_id + ''" />
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
    }, 4200)
    }
}
</script>
<style scoped>

</style>
