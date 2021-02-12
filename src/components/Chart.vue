
<script>
import { Doughnut, Line } from 'vue-chartjs'
//https://medium.com/risan/vue-chart-component-with-chart-js-db85a2d21288
export default {
  extends: Doughnut,
  data: () => ({
    chartdata: {
      labels: ['January', 'February'],
      datasets: [
        {
          label: 'Data One',
          backgroundColor: '#f87979',
          data: [30, 27]
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false
    }
  }),

  mounted () {
    this.renderChart(this.chartdata, this.options)
  }
}

</script>
