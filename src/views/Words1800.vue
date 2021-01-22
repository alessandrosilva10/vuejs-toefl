<template>
  <div class="">
       <pdf style="display: inline-block; width: 45%" src="./ess_vocab.pdf"></pdf>
       <v-btn class="blue white--text" @click="openPdf">Open PDF</v-btn>
  </div>
</template>
<script>
import pdf from 'vue-pdf'

export default {
  components: {
    pdf
  },
    data() {
        return {

        }
    },
    methods: {
        openPdf(){
            window.open('http://www.e4thai.com/e4e/images/pdf2/ess_vocab.pdf');
        }
    }
}
</script>
<style scoped>

</style>
