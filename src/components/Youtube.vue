<template>
  <div class="text-center">
      <v-card>
        <v-container class="grey lighten-5">
    <v-row
      class="mb-6"
      no-gutters
    >
          <v-col>
        <v-card
          class="pa-2"
          outlined
          tile>
            <v-container fluid>
                <v-row  align="center">
                    <v-col class="mother_tongue" cols="12">
                        <v-subheader>
                        <p>What is your mother tongue?</p>
                        </v-subheader>
                        <v-select
                        :items="items"
                        filled
                        label="Select"
                        dense
                        v-model="selected"
                        ></v-select>
                    </v-col>
                </v-row>
            <div v-show="show">
                <strong>Translation to: </strong>{{selected}}<p>{{translated}}</p>

            </div>
            <div>
                <iframe width="800" height="615" :src="youtube_link" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                <br/><br/><br/><br/>
            </div>
            </v-container>

        </v-card>
      </v-col>
      <v-col>
        <v-card
          class="pa-2"
          outlined
          tile>
        <div class="divchange" @click.prevent="testFunction">
            <p>{{pagination[0]}}</p>
        </div>
         <v-pagination
        v-model="page"
        :length="split/perPage">
        </v-pagination>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
      </v-card>
  </div>

</template>

<script>
import axios from 'axios';

export default {
    name: 'Dashboard',
    props: ['lecture', 'mp3'],
    components: {

    },
    data: () => ({
        items: ['Portuguese', 'English', 'Chinese', 'Cantonese', 'Spanish', 'German', 'Spanish'],
        selected: '',
        translated: '',
        show: false,
        youtube_link: '',
        page: 1,
        perPage: 1,
        split: 3
    }),
    created(){

    },
    mounted() {
        this.youtube_link = "https://www.youtube.com/embed/" + this.$route.params.video_id
    },
    computed: {
        pagination: function() {
            var chunks = []
            var lecture = this.lecture.replace(/(\r\n|\n|\r)/gm, " ").replace(",", ", ").replace("?", "? ").replace(".", ".  ").replace("]", "] ");
            var wordCount = lecture.split(' ').length;
            if(wordCount < 800){
                for (var i = 0, charsLength = lecture.length; i < charsLength; i += (lecture.length/5)) {
                    chunks.push(lecture.substring(i, i + (lecture.length/5)));
                }
                return chunks.slice((this.page - 1) * this.perPage, this.page* this.perPage);
            }else if(wordCount > 799 && wordCount < 1800){
                for (var i = 0, charsLength = lecture.length; i < charsLength; i += (lecture.length/6)) {
                    chunks.push(lecture.substring(i, i + (lecture.length/6)));
                }
                this.split = 6;
                return chunks.slice((this.page - 1) * this.perPage, this.page* this.perPage);
            }else if(wordCount > 1799 && wordCount < 3000){
                for (var i = 0, charsLength = lecture.length; i < charsLength; i += (lecture.length/7)) {
                    chunks.push(lecture.substring(i, i + (lecture.length/7)));
                }
                this.split = 7;
                return chunks.slice((this.page - 1) * this.perPage, this.page* this.perPage);
            }else{
                for (var i = 0, charsLength = lecture.length; i < charsLength; i += (lecture.length/9)) {
                    chunks.push(lecture.substring(i, i + (lecture.length/9)));
                }
                this.split = 9;
                return chunks.slice((this.page - 1) * this.perPage, this.page* this.perPage);
            }
        }
    },
    methods:{
        testFunction(e){
        e.preventDefault();
        var s = window.getSelection();
        var range = s.getRangeAt(0);
        var node = s.anchorNode;
        while(range.toString().indexOf(' ') != 0) {
            range.setStart(node,(range.startOffset -1));
        }
        range.setStart(node, range.startOffset +1);
        do{
            range.setEnd(node,range.endOffset + 1);
        }while(range.toString().indexOf(' ') == -1 && range.toString().trim() != '');
        var str = range.toString().trim();

        const headers = { "Content-Type": "application/json" };
        axios.post("https://toeflmadeeasy.pythonanywhere.com/translation",{
    "word": str,
    "target": this.selected.toLowerCase()
    }, { headers })
        .then(response => { this.translated = response.data; this.show=true});
       }
   }
}
</script>

<style scoped>
  .divchange {
      display: inline-block;
      cursor: pointer;
      text-align: justify;
      text-justify: inter-word;
      font-family: "dosis", sans-serif;
      max-width: 800px;
      margin: 0 5% 1rem;
}

.mother_tongue{

}

p{
  font-family: Oswald;
  font-size: 20px;
  -webkit-animation: Color 4s ease-in-out infinite;
}
</style>
