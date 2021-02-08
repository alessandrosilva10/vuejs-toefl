<template>
  <div class="text-center">
    <v-dialog v-model="dialog" width="1550px">
      <template v-slot:activator="{ on }">
    <v-btn
        text
        :to="route"
        class="css"
        v-bind="attrs"
        v-on="on"
      >
      <v-icon small left>mdi-text</v-icon>
        open the lesson
      </v-btn>
      </template>
      <v-card>
        <v-card-title class="blue--text" primary-title>Listen to a conversation</v-card-title>
        <vuetify-audio :file="mp3" color="success"></vuetify-audio>
       <!-- <vuetify-audio file="http://docs.google.com/uc?export=open&id=1luYjxXpuIjhQjG1ti3dXBAYgItLvB9nX" color="success"></vuetify-audio>
        <vuetify-audio :file="mp3" color="success"></vuetify-audio>
         <vuetify-audio file="http://docs.google.com/uc?export=open&id=  1luYjxXpuIjhQjG1ti3dXBAYgItLvB9nX  " color="success"></vuetify-audio>-->
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
            <span> {{lecture}}</span>
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
//https://stackoverflow.com/questions/2920150/insert-text-at-cursor-in-a-content-editable-div
//https://pypi.org/project/py-translate/
export default {
    name: 'Dashboard',
    props: ['lecture', 'mp3'],
    components: {
        VuetifyAudio: () => import('vuetify-audio'),
    },
    data: () => ({
        items: ['Portuguese', 'English', 'Chinese', 'Cantonese', 'Spanish', 'German', 'Spanish'],
        selected: '',
        translated: '',
        show: false

    }),methods:{
        testFunction(e){

        var s = window.getSelection();
        //console.log(s)
        var s = window.getSelection();
       var range = s.getRangeAt(0);
        var node = s.anchorNode;
        while(range.toString().indexOf('') != 0) {
            range.setStart(node,(range.startOffset -1));
        }
        range.setStart(node, range.startOffset);
        do{
            range.setEnd(node,range.endOffset);
        }while(range.toString().indexOf('') == -1 && range.toString().trim() != '');
        console.log(range.toString())
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
      text-align: justify;
      text-justify: inter-word;
      font-family: "dosis", sans-serif;
      max-width: 800px;
      margin: 0 5% 1rem;
}
</style>
