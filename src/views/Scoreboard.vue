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
  margin: 0 auto;">Scoreboard - Reading</div>
                    <div>
                        <apexchart width="800" type="line" :options="options_reading" :series="series"></apexchart>
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
import VueApexCharts from 'vue-apexcharts'

export default {
    components: {
        Navbar,
        VueApexCharts
    },
    data: function() {
    return {
      options_reading: {
        chart: {
          id: 'vuechart-example'
        },
        xaxis: {
          categories: ['02-13', '02-15', '02-11', '02-19', '02-22', '02-28', '02-09', '02-28']
        }
      },
      series: [{
        name: 'Reading score',
        data: [15, 18, 20, 16, 25, 22, 29, 17]
      }]
    }
  }
}
</script>
<style scoped>

</style>
