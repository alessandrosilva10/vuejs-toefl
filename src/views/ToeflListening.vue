
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
<div class="hidden-md-and-down"><div v-if="loading"><Spinner /></div>
<v-card class="mt-5 mb-8">
  <Navbar/>
  <div v-if="!loading">
    <h1 justify="center" align="center" class="subtitle-5 blue--text">TOEFL LISTENING WITH TRANSCRIPT AND DICTIONARY</h1>
      <v-card-text>
        <v-container>
          <v-row>
            <v-col>
                <v-pagination
                    class="pagination"
                    v-model="page"
                    :length="Math.ceil(tpos.length/perPage)">
                </v-pagination>
            </v-col>
            <v-col
                class="d-flex"
                cols="3"
                sm="3"
            >
                <v-select
                v-model="selected_tpo"
            :items="items"
            label="SELECT TPO"
            outlined
            ></v-select>
            </v-col>

            <!--<input class="search1" type="text" v-model="string" placeholder="Search entire library..."/>
                <v-icon
                class="search"
                normal
                color="blue darken-2"
                >
                mdi-magnify
                </v-icon>-->
            </v-row>
            <v-row>
            <v-col md="3" v-for="tpo in filteredItems" :key="tpo.id"><div class="main">
                 <v-card flat class="text-center">
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
              <div style="color: rgba(34, 167, 240, 1)" class="subheading"><strong>{{ tpo.lecture }}</strong></div>
              <br/>
              <!--<div class="grey--text">{{ tpo.lecture}}</div>-->
            </v-card-text>
                <img :src="img" class="img" width="150"/>
                      <!--<div class="subheading">TPO {{tpo.tpo_id}}</div>-->
                      <div class="css">
                      <Popup :lecture="tpo.text" :mp3="tpo.mp3"/></div>
      </v-list-item-content>
    </v-list-item>
    <v-card-actions>
    <v-tooltip top>
        <span>Open the lesson? Let's study now?</span>
    </v-tooltip>
        <!--<v-tooltip top>
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
    {{dislikes}}-->
    </v-card-actions>
  </v-card></div>
                <!--
                <v-card  flat class="text-center">
                  <v-card-title :style="{fontSize: '15px'}" height="50%" class="blue white--text">{{tpo.lecture}}</v-card-title>
                  <v-card-text>
                      <br>
                      <img :src="img" class="img" width="150"/>
                      <br>
                      <Popup :lecture="tpo.text" :mp3="tpo.mp3"/>
                  </v-card-text>
                </v-card>-->
            </v-col>
          </v-row>
        </v-container>
      </v-card-text></div>
    </v-card>

    </div>
  </div>
</template>
<script>
import Popup from '../components/Popup';
import Spinner from '../components/Spinner';
import Navbar from '../components/Navbar';
import axios from 'axios';

export default {
    components: {
        Popup,
        Spinner,
        Navbar
    },
    data(){
        return{
            tpos: '',
            dialog: true,
            loading: true,
            img: "https://i.ibb.co/rmS202b/TPO1.png",
            page: 1,
            perPage: 12,
            string: '',
            items: ['ALL', 'TPO1', 'TPO2', 'TPO3', 'TPO4', 'TPO5'],
            selected_tpo: ''
        }
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
    }
    ,computed: {
        filteredItems: function() {
            if(this.selected_tpo === 'ALL' || this.selected_tpo === '') {
                return this.filterByValue(this.tpos, '').slice((this.page - 1) * this.perPage, this.page* this.perPage);
            }else{
                return this.filterByValue(this.tpos, this.selected_tpo);
            }
        },
  },
  created(){

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
.pagination {
    padding-bottom:25px;
    padding-left:30px;
    float: left;
}
.main{
    float: left;
    margin-left: 40px;
    margin-bottom: 50px;
    border: 0.5px solid;
    border-color:rgba(34, 167, 240, 1)
}

.main:hover {
  transform: scale(1.02); /* (150% zoom - Note: if the zoom is too large, it will go outside of the viewport) */
}

.css {
  margin: 0 auto;
  display: block;
  margin-top: 10px;
}

.helpful{
    display: none;
}

.like-button-up:hover .helpful{
    display: block;
}

.like-button-up {
    margin-left: 10px;
}
.like-button-down {
    margin-left: 10px;
}
</style>
