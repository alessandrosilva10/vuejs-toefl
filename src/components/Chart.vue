
<script>

import { Line } from 'vue-chartjs'

export default {
  extends: Line,
  props: {
    chartdata: {
      type: Object,
      default: null
    },
    options: {
      type: Object,
      default: null
    }
  },
  mounted () {
    this.renderChart(this.chartdata, this.options)
  }
}
/*
import { Doughnut, Line, Bar } from 'vue-chartjs'
import axios from 'axios';
import VueCookies from 'vue-cookies'
//https://medium.com/risan/vue-chart-component-with-chart-js-db85a2d21288
export default {
  extends: Bar,
  data(){
    return {
    score: [25, 20, 12],
    date:['Jan', 'For', 'A'],
    chartdata: {
      labels: this.date,
      datasets: [
        {
          label: 'Data One',
          backgroundColor: '#f87979',
          data: [25, 20, 12],
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false
    }}
  },

  mounted () {
    setTimeout(() => {
    this.renderChart(this.chartdata, this.options)
        axios.post("http://toeflmadeeasy.pythonanywhere.com/getreadingscore",{
        "public_id": VueCookies.get('TOEFLMADEEASY').public_id,
    })
    .then(response => {
        this.date = response.data.map(a => a.data);
        this.score = response.data.map(a => a.score);
        //console.log(this.date, this.score)
    })}, 2200)
  },
}*/

</script>
