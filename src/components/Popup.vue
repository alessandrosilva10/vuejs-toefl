<template>
  <div class="text-center">
    <v-dialog v-model="dialog" width="1550px">
      <template v-slot:activator="{ on }">
        <v-btn v-on="on" class="blue white--text ">Open Lesson</v-btn>
      </template>
      <v-card>
        <v-card-title class="blue--text" primary-title>Listen to a conversation</v-card-title>
        <vuetify-audio :file="mp3" color="success"></vuetify-audio>
        <br/>
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
        <div class="divchange" @click.prevent="testFunction">
            <span>{{lecture}}</span>
        </div>
        </v-card>
      </v-col>
      <v-col>
        <v-card
          class="pa-2"
          outlined
          tile>
            <v-container fluid>
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
            <div v-show="show">
                <hr/>
                <br/>
                Translation({{selected}}): <br/><br/>{{translated}}
            </div>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import axios from 'axios';

export default {
    name: 'Dashboard',
    props: ['lecture', 'mp3'],
    components: {
        VuetifyAudio: () => import('vuetify-audio')
    },
    data: () => ({
        items: ['Portuguese', 'English', 'Chinese', 'Cantonese', 'Spanish', 'German', 'Spanish'],
        selected: '',
        translated: '',
        show: false

    }),methods:{
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
