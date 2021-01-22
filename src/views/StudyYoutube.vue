<template>
  <div class="team">
    <h1 class="subtitle-1 grey--text"></h1>
    <v-container class="my-5">
        {{video.name}}
        <Youtube :lecture="this.video[0].text" />
    </v-container>
  </div>
</template>

<script>
import axios from 'axios';
import Youtube from '../components/Youtube';

export default {
    data(){
        return {
            video: ''
        }
    },
    components: {
        Youtube
    },
    mounted() {
        const headers = { "Content-Type": "application/json" };
        axios.post("https://toeflmadeeasy.pythonanywhere.com/studybylesson",
        { "video_id": this.$route.params.video_id },
        { headers })
        .then(response => {
            if(response.data.length){
                this.video = response.data;
            }else{
                this.$toast.error("The Lesson with ID " + this.$route.params.video_id +" was not found", {
                    timeout: 3000
                });
            }
        })
        .catch(error => {
            console.log(error)
        })
        ;
    }
}
</script>
