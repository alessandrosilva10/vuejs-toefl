<template>
<div class="main">
  <v-card flat class="text-center"
  >
  <v-responsive class="pt-4">
    <img
        :src="thumbnail"
        width=80%
        height= auto
        display=block
        margin= 0 auto
      >
    </v-responsive>
    <v-list-item three-line>
      <v-list-item-content>
            <v-card-text>
              <div class="subheading">{{ name }}</div>
              <div class="grey--text">{{ lecture}}</div>
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
      >
      <v-icon small left>mdi-text</v-icon>
        open the lesson
      </v-btn>
        </template>
        <span>Open the lesson? Let's study now?</span>
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
</div>
</template>

<script>
import axios from 'axios';
  export default {
      props: ['lecture', 'video', 'thumbnail', 'name', 'route', 'video_id', 'likes', 'dislikes'],  /*like: { type: Function },*/
      data: () => ({
          active_helpful: false,
          active_not_helpful: false,
      }),
      methods: {
        mouseOverHelpful: function(){
            this.active_helpful = !this.active_helpful;
        },
        mouseOverNotHelpful: function(){
            this.active_not_helpful = !this.active_not_helpful;
        },
        dislike(){
            const headers = { "Content-Type": "application/json" };
            axios.post("https://toeflmadeeasy.pythonanywhere.com/dislikes",
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
        axios.post("https://toeflmadeeasy.pythonanywhere.com/likes",
        { "video_id": this.video_id, "likes": 1},
        { headers })
        .then(response => {

        })
        .catch(error => {
            console.log(error)
        });
    }
       /* like(){
            const headers = { "Content-Type": "application/json" };
            alert(this.video)
            axios.post("https://toeflmadeeasy.pythonanywhere.com/likes",
            { "video": this.video, "likes": 1},
            { headers })
            .then(response => {

            })
            .catch(error => {
                console.log(error)
            });
        }*/
    }
  }
</script>

<style scoped>
.main{
    float: left;
    margin-left: 40px;
    margin-bottom: 50px;
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
