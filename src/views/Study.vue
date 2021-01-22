<template>
  <div class="team">
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
    <h1 class="subheading grey--text title">Videos imported from  YouTube</h1>
    <v-container class="study-card my-5">
        <div class="search-wrapper">
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
        <v-col v-for="y in filteredItems" :key="y.video_id"  cols="4">
            <StudyCard :name="y.name" :route="'/index/study&lesson=' + y.video_id" :thumbnail="y.thumbnail"/>
        </v-col>
        <v-pagination
        v-model="page"
        :length="youtube.length/perPage">
        </v-pagination>
        </v-row>
    </v-container>
  </div></div>
</template>
<script>

import axios from 'axios';
import StudyCard from '../components/StudyCard';

export default {
    components: {
        StudyCard
    },
    data(){
        return {
            youtube: [{}],
            my_string: "https://www.youtube.com/embed/",
            string: '',
            page: 1,
            perPage: 6,
        }
    },mounted() {
        const headers = { "Content-Type": "application/json" };
        axios.get("https://toeflmadeeasy.pythonanywhere.com/imports", { headers })
        .then(response => { this.youtube = response.data});
      },
      methods: {
        filterByValue(array, string) {
    return array.filter(o =>
        Object.keys(o).some(k => o[k].toLowerCase().includes(string.toLowerCase())));
    }
      },
    computed: {
    filteredItems: function() {
        return this.filterByValue(this.youtube, this.string).slice((this.page - 1) * this.perPage, this.page* this.perPage);
    }
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
</style>
