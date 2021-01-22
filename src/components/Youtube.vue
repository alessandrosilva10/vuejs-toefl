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
            <div>
                <br/>
                <iframe width="560" height="315" :src="youtube_link" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                <br/><br/><hr/><br/><br/>
            </div>
                <v-row align="center">
                <v-col cols="6">
                    <v-subheader>
                    <h4>What is your mother tongue?</h4>
                    </v-subheader>
                </v-col>
                <v-col cols="6">
                    <v-select
                    :items="items"
                    filled
                    label="What is your mother tongue?"
                    dense
                    v-model="selected"
                    ></v-select>
                </v-col>
                </v-row>
            </v-container>
            <br/><br/>
            <div v-show="show">
                <hr/>
                <br/>
                Translation({{selected}}): <br/><br/>{{translated}}
            </div>
        </v-card>
      </v-col>
      <v-col>
        <v-card
          class="pa-2"
          outlined
          tile>
        <div class="divchange" @click.prevent="testFunction">
            <span>{{pagination[0]}}</span>
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
                for (var i = 0, charsLength = lecture.length; i < charsLength; i += (lecture.length/3)) {
                    chunks.push(lecture.substring(i, i + (lecture.length/3)));
                }
                return chunks.slice((this.page - 1) * this.perPage, this.page* this.perPage);
            }else if(wordCount > 799 && wordCount < 1800){
                for (var i = 0, charsLength = lecture.length; i < charsLength; i += (lecture.length/4)) {
                    chunks.push(lecture.substring(i, i + (lecture.length/4)));
                }
                this.split = 4;
                return chunks.slice((this.page - 1) * this.perPage, this.page* this.perPage);
            }else if(wordCount > 1799 && wordCount < 3000){
                for (var i = 0, charsLength = lecture.length; i < charsLength; i += (lecture.length/5)) {
                    chunks.push(lecture.substring(i, i + (lecture.length/5)));
                }
                this.split = 5;
                return chunks.slice((this.page - 1) * this.perPage, this.page* this.perPage);
            }else{
                for (var i = 0, charsLength = lecture.length; i < charsLength; i += (lecture.length/6)) {
                    chunks.push(lecture.substring(i, i + (lecture.length/6)));
                }
                this.split = 6;
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
</style>
