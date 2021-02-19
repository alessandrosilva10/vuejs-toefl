<template>
<v-container class="study-card my-5">
    <Navbar />
    <Loading :title="'Loading TPO' + this.$route.params.tpo_id + ''" />
    <div v-if="!isLoadingRendered">
        <ReadingQuestions 
            :insert_table_index_1="insert_table_index_1" 
            :insert_table_index_2="insert_table_index_2" 
            :insert_table_index_3="insert_table_index_3"
            :multi_select_index_1="multi_select_index_1"
            :multi_select_index_2="multi_select_index_2"
            :multi_select_index_3="multi_select_index_3"
            :quiz="quiz"
            :total_points="total_points"
            :insert_table_question="insert_table_question"
        />
    </div>
</v-container>
</template>

<script>
import Loading from '../components/Loading'
import ReadingQuestions from '../components/ReadingQuestions'
import Navbar from '../components/Navbar'
import axios from 'axios';
import VueCookies from 'vue-cookies'

export default {
    data(){
        return {
            isLoadingRendered: true,
            tpo_id: this.$route.params.tpo_id,
            insert_table_index_1: '',
            insert_table_index_2: '',
            insert_table_index_3: '',
            multi_select_index_1: '',
            multi_select_index_2: '',
            multi_select_index_3: '',
            total_points: '',
            insert_table_question: '',
            quiz: []
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
    }, 4200)}
    ,
    async created(){
       const headers = { "Content-Type": "application/json" };
       await axios.post("https://toeflmadeeasy.pythonanywhere.com/gettporeading",{
        "public_id": VueCookies.get('TOEFLMADEEASY').public_id,
        "tpo_id": this.tpo_id,
        }, { headers })
        .then((response) =>{
            console.log(response.data)
            this.total_points = response.data.total_points
            this.insert_table_index_1 = response.data.insert_table_index_1
            this.insert_table_index_2 = response.data.insert_table_index_2
            this.insert_table_index_3 = response.data.insert_table_index_3
            this.multi_select_index_1 = response.data.multi_select_index_1
            this.multi_select_index_2 = response.data.multi_select_index_2
            this.multi_select_index_3 = response.data.multi_select_index_3
            this.insert_table_question = response.data.insert_table_question
            this.quiz = response.data.tpo
        })
    }
}
</script>
<style scoped>

</style>
