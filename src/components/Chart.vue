<script>
import VueCharts from 'vue-chartjs'
import { Pie, Bar, mixins, LineChart } from 'vue-chartjs'
import axios from 'axios'
import VueCookies from 'vue-cookies'

export default {
  mixins: [mixins.reactiveData],
  data() {
    return {
      chartData: ''
    }
  },
  extends: Bar,
  mounted() {
    this.renderChart(this.chartData)
  },
  created() {
    axios.post(`http://toeflmadeeasy.pythonanywhere.com/getreadingscore`,{
        "public_id": VueCookies.get('TOEFLMADEEASY').public_id,
    })
      .then(response => {
        // JSON responses are automatically parsed.
        const responseData = response.data
        console.log(responseData)
        this.chartData = {
          labels: responseData.map(item => 'Date: ' + item.data),
          datasets: [{
            label: 'Score',
             backgroundColor: 'rgba(34, 167, 240, 1)',
             data: responseData.map(item => item.score)
          }]
        }

        /*this.chartData = {
          labels: responseData.map(item => item.day),
          datasets: [
            label: 'Daily Students',
             backgroundColor: '#f87979',
             data: responseData.map(item => item.totalStudents)
          ]
        }*/
      })
      .catch(e => {
        this.errors.push(e)
      })
  }
}
</script>
