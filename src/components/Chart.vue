<script>
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
    axios.post(`https://toeflmadeeasy.pythonanywhere.com/getreadingscore`,{
        "public_id": VueCookies.get('TOEFLMADEEASY').public_id,
    })
      .then(response => {
        const responseData = response.data
        this.chartData = {
          labels: responseData.map(item => 'Date: ' + item.data),
          datasets: [{
            label: 'Score',
             backgroundColor: 'rgba(34, 167, 240, 1)',
             data: responseData.map(item => item.score)
          }]
        }
      })
      .catch(e => {
        this.errors.push(e)
      })
  }
}
</script>
