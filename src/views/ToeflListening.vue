
<template>
<!-- https://codesandbox.io/s/n5y077y0wj?file=/src/components/NestedGrid.vue:1655-1946-->
<div>

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
<v-card class="mt-5 mb-8"><div v-show="!loading">
    <h1 justify="center" align="center" class="subtitle-5 blue--text">TOEFL LISTENING WITH TRANSCRIPT AND DICTIONARY</h1>
      <v-card-text>
        <v-container>
          <v-row>
            <v-col md="3" v-for="tpo in tpos" :key="tpo.id">
                <v-card  color="blue lighten-3" dark>
                  <v-card-title :style="{fontSize: '15px'}" height="50%" class="blue white--text">{{tpo.lecture}}</v-card-title>
                  <v-card-text>
                      <br>
                      <img :src="img" class="img" width="150"/>
                      <br>
                      <Popup :lecture="tpo.text" :mp3="tpo.mp3"/>
                  </v-card-text>
                </v-card>
            </v-col>
          </v-row>
        </v-container>
      </v-card-text></div>
    </v-card>
    <div v-show="loading"><Spinner /></div>
    </div>
  </div>
</template>
<script>
import Popup from '../components/Popup';
import Spinner from '../components/Spinner';
import axios from 'axios';

export default {
    components: {
        Popup,
        Spinner
    },
    data(){
        return{
            tpos: '',
             dialog: true,
             loading: true,
             img: "https://images.pexels.com/photos/1106468/pexels-photo-1106468.jpeg"
        }
    },
  mounted() {
  // GET request using axios with set headers
    this.interval = setInterval(() => {
        const headers = { "Content-Type": "application/json" };
        axios.get("https://toeflmadeeasy.pythonanywhere.com/toefl", { headers })
        .then(response => { this.tpos = response.data; this.loading = false});
        }, 4500);
      }
    ,beforeDestroy () {
      //clearInterval(this.interval)
    },
}
</script>
<style scoped>
    .img {
    display: block;
    margin: 0 auto;

}
</style>
