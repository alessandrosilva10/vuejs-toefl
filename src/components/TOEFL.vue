<template>
    <v-row>
<v-col v-for="(tpo, i) in tpos" :key="i" cols="4">
  <v-card flat class="text-center main" >
  <v-responsive class="pt-4">
    <img
        :src="thumbnail"
        width=70%
        height= auto
        display=block
        margin= 0 auto
      >
    </v-responsive>
    <v-list-item three-line>
      <v-list-item-content>
            <v-card-text>
               <h1 class="grey--text">TPO{{++i}}</h1>
            </v-card-text>
      </v-list-item-content>
    </v-list-item>
    <v-card-actions>
    <v-tooltip top>
        <template v-slot:activator="{ on, attrs }">
        <v-btn
        text
        :to="route"
        class="css"
        v-bind="attrs"
        v-on="on"
        @click="openTPO(i)"
      >
      <v-icon small left>mdi-text</v-icon>
        LET'S GET STARTED
      </v-btn>
        </template>
        <span>Are you ready?</span>
    </v-tooltip>
        <v-tooltip top>
        <template v-slot:activator="{ on, attrs }">
            <v-icon class="like-button-up" v-bind="attrs"
            v-on="on" @click="like()" normal left>mdi-thumb-up
            </v-icon>
        </template>
        <span>Helpful</span>
        </v-tooltip>
        {{likes}}
        <v-tooltip top>
      <template v-slot:activator="{ on, attrs }">
        <v-icon class="like-button-down" v-bind="attrs"
          v-on="on" @click="dislike()" normal left>mdi-thumb-down-outline
        </v-icon>
      </template>
      <span>Not helpful</span>
    </v-tooltip>
    {{dislikes}}
    </v-card-actions>
  </v-card>
</v-col>
</v-row>
</template>
<script>
import axios from 'axios';
//import Vue from 'vue';
//import VueRouter from 'vue-router';

//Vue.use(VueRouter)

  export default {
      props: ['thumbnail'],
      tpos: 63,
      data: () => ({
          active_helpful: false,
          active_not_helpful: false,
          tpos: 63,
      }),
      methods: {
        openTPO(i){
            window.open('/toefl/reading&tpo=' + i,'_self')
           //Router.push();
         //this.$router.push('/toefl/reading&tpo=' + i);
        },
        mouseOverHelpful: function(){
            this.active_helpful = !this.active_helpful;
        },
        mouseOverNotHelpful: function(){
            this.active_not_helpful = !this.active_not_helpful;
        },
        dislike(){
            const headers = { "Content-Type": "application/json" };
            axios.post("https://toeflmadeeasy.pythonanywhere.com/dislikes1111",
            { "video_id": this.video_id, "dislikes": 1},
            { headers })
            .then(response => {
                if(response.data.length){

                }else{
                    this.$toast.error("The Lesson with ID " + this.$route.params.video_id +" was not found", {
                        timeout: 3000
                    });
                }
            })
            .catch(error => {
                console.log(error)
            });
        },
        like: function(){
        const headers = { "Content-Type": "application/json" };
        axios.post("https://toeflmadeeasy.pythonanywhere.com/likes1111",
        { "video_id": this.video_id, "likes": 1},
        { headers })
        .then(response => {

        })
        .catch(error => {
            console.log(error)
        });
        }
    }
  }
</script>

<style scoped>
.main1{
    float: left;
    margin-left: 40px;
    margin-bottom: 50px;
    border: 0.1px solid;
}

.main{
    border: 0.1px solid;
}

.main:hover {
  transform: scale(1.02); /* (150% zoom - Note: if the zoom is too large, it will go outside of the viewport) */
}

.helpful{
    display: none;
}

.like-button-up:hover .helpful{
    display: block;
}

.css {
  margin: 0 auto;
  display: block;
}

.like-button-up {
    margin-left: 10px;
}
.like-button-down {
    margin-left: 10px;
}
</style>
