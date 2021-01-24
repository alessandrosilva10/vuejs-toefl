<template>
  <div class="team">
      <Navbar/>
      <div class="hidden-md-and-up">
    <v-card class="mt-5 mb-8">
      <v-card-text>
        <v-container>
                <v-card  color="blue lighten-3" dark>
                  <v-card-title></v-card-title>
                  <v-card-text>
                      <img src="https://freepngimg.com/thumb/blocked/3-2-blocked-png-picture.png" />
                      <h1 class="white--text center">Sorry - we currently do not support mobile access.</h1>
                  </v-card-text>
                </v-card>
        </v-container>
      </v-card-text>
    </v-card>
</div>
<div class="hidden-md-and-down">
    <h1 v-show="!loading" class="subheading grey--text title">Videos imported from  YouTube</h1>
    <v-container class="study-card my-5">
        <div v-show="!loading" class="search-wrapper">
            <input type="text" v-model="string" placeholder="Search entire library..."/>
            <v-icon
            normal
            color="blue darken-2"
            >
            mdi-magnify
            </v-icon>
        </div>
         <br/> <br/> <br/>
        <br/>
        <v-row
            no-gutters
            style="height: 120px;"
        >
            <v-col v-show="!loading" v-for="y in filteredItems" :key="y.video_id"  cols="4">
                <StudyCard  :name="y.name" :route="'/index/study&lesson=' + y.video_id" :likes="y.likes" :video_id="y.video_id" :dislikes="y.dislikes" :thumbnail="y.thumbnail"/>
            </v-col>
            <v-pagination
                v-show="!loading"
                v-model="page"
                :length="Math.ceil(youtube.length/perPage)">
            </v-pagination>
        </v-row>
        <div v-show="loading" class="loading">
            <h1 class="subheading-6 grey--text">Loading the lessons from the server...</h1>
            <br><br><br><br>
            <pulse-loader :loading="loading" :color="color" :size="size"></pulse-loader>
        </div>
    </v-container>
  </div></div>
</template>
<script>

import axios from 'axios';
import StudyCard from '../components/StudyCard';
import PulseLoader from 'vue-spinner/src/PulseLoader.vue'
import Navbar from '@/components/Navbar';

export default {
    components: {
        StudyCard,
        PulseLoader,
        Navbar
    },
    data(){
        return {
            youtube: [{}],
            my_string: "https://www.youtube.com/embed/",
            string: '',
            page: 1,
            perPage: 6,
            loading: true,
            size: '100px',
            color: 'lightblue',
        }
    },mounted() {
        this.interval = setInterval(() => {
            const headers = { "Content-Type": "application/json" };
            axios.get("https://toeflmadeeasy.pythonanywhere.com/imports", { headers })
            .then(response => { this.youtube = response.data;  this.loading = false});
        }, 2000);
      },
      methods: {
        NullSafeToLower(s)
        {
            if (s == null)
            {
                s = string.Empty;
            }
            return s.toLowerCase();
        },
        filterByValue(array, value) {
            return array.filter((data) =>  this.NullSafeToLower(JSON.stringify(data)).indexOf(value.toLowerCase()) !== -1);
        }
      },
    computed: {
        filteredItems: function() {
            return this.filterByValue(this.youtube, this.string).slice((this.page - 1) * this.perPage, this.page* this.perPage);
        },

       /* like: function(){
            alert(this.likes)
            //console.log(this.$refs.video_id)
        const headers = { "Content-Type": "application/json" };


        axios.post("https://toeflmadeeasy.pythonanywhere.com/likes",
        { "video": this.video, "likes": 1},
        { headers })
        .then(response => {

        })
        .catch(error => {
            console.log(error)
        });
    }*/
  },
  created(){
      console.log(this.string)
  }
};

</script>
<style scoped>
.study-card{
    display: inline;
}
.search-wrapper{
    float: right;
    margin-bottom: 80px;
    border: 1px solid;
    border-radius: 3px;
}
.title {
    text-align: center;
    font-size: 56px;
    margin-top: 50px;
}
.loading{
width: 50%;
  margin: 0 auto;
}
</style>
