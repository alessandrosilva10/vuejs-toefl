<template>
    <div class="">
        <Navbar/>
        <v-container class="grey lighten-5">
            <v-row no-gutters>
                <v-col>
                    <v-card
                        class="pa-2"
                        outlined
                        tile
                    >
                    <div class="black--text" style="padding-top: 25px; padding-bottom: 25px; width: 50%;
  margin: 0 auto;">Scoreboard - Reading
  </div>

                        <div style=" width: 50%;">
                            <Chart/>
                </div>

                </v-card>
                </v-col>
                <v-col>
                <v-card
                    class="pa-2"
                    outlined
                    tile
                >
                    Scoreboard - Listening
                </v-card>
                </v-col>
            </v-row>
            <v-row no-gutters>
                <v-col>
                    <v-card
                        class="pa-2"
                        outlined
                        tile
                    >
                        Scoreboard - Writing
                </v-card>
                </v-col>
                <v-col>
                <v-card
                    class="pa-2"
                    outlined
                    tile
                >
                   Scoreboard - Speaking
                </v-card>
                </v-col>
            </v-row>
        </v-container>
    </div>
</template>
<script>
import Navbar from '@/components/Navbar';
import axios from 'axios';
import VueCookies from 'vue-cookies'
import Chart from '../components/Chart';

export default {
    components: {
        Navbar, Chart
    },
  data: () => ({

  }),
  /*mounted() {/*
       this.interval = setInterval(() => {

            axios.post("http://toeflmadeeasy.pythonanywhere.com/getreadingscore",{
        "public_id": VueCookies.get('TOEFLMADEEASY').public_id,
    })
    .then(response => {
            this.date = response.data.map(a => a.data);
            this.score1 = response.data.map(a => a.score);
            this.loading = false;
    })

       }, 4000);
      this.renderChart(this.chartdata, this.options)
    }*/
}
</script>
<style scoped>

</style>
