<template>
    <div oncopy="return false" onpaste="return false" oncut="return false" id="app"> <Navbar/>
        <div style="display: flex;
                    flex-direction: row;
                    flex-wrap: wrap;
                    justify-content: center;
                    padding-left: 200px;
                    align-items: center;" v-show="questionIndex-1 > 0 && questionIndex-1 < quiz.questions.length-1 && questionIndex-1 !== multi_select_index_1">
            <div v-if="(questionIndex-questionIndexDecrementByText) + 1 < multi_select_index_1">
                <h3>
                    Question {{(questionIndex-questionIndexDecrementByText) + 2 }} of {{(quiz.questions.length-questionIndexDecrementByText)-1}}
                </h3>
            </div>
            <div v-else>
                <h3>
                    Question {{(questionIndex-questionIndexDecrementByText)}} of {{(quiz.questions.length-questionIndexDecrementByText) -1}}
                </h3>
            </div>
            <div style="
                float: left;
                font-size: 22px;
                padding-left: 200px;
                ">
                <span class="text-col" col="10"><strong>Answer:</strong> {{selected[questionIndex] ? selected[questionIndex] : 'Not answered'}}</span>
            </div>
            
            <div style="
                float: left;
                font-size: 30px;
                padding-left: 200px;
                ">
                Time: {{secondsToHms(countDown) }}
            </div>
            <br /> <br /> <br />
        </div>
        <v-card min-height="1000px">
            <!--<h1 v-show="showResults && questionIndex > 1"> Resposta certa: {{correctedAnwsers[questionIndex-2]}}</h1>-->
            <div v-for="(question, index) in quiz.questions" :key="index">
                <div v-if="index === questionIndex">
                    <v-row>
                        <br><br><br>
                        <v-col class="answers-col" col="10">
                            <v-col col="2"><span class="justify" v-html="question.question" /></v-col> 
                            <div v-if="questionIndex !=multi_select_index_1 && questionIndex != insert_table_index_1 && questionIndex != insert_table_index_2 && questionIndex != multi_select_index_2 && questionIndex != insert_table_index_3 && questionIndex != multi_select_index_3">
                                <ol style="
                                        font-size: 20px; margin-top:10px;
                                        display: inline-block;
                                        text-align: justify;
                                        text-justify: inter-word;
                                        font-family: 'dosis', sans-serif;
                                        max-width: 800px;
                                        margin: 0 5% 1rem;
                                        font-size: 20px;" type="A">
                                    <li v-for="(response, i) in question.responses" :key="i">
                                        <label>
                                            <input type="radio" @change="consoleFilter(response.correct, response.answered)" v-bind:value="response.correct" v-bind:name="index" v-model="userResponses[index]"> {{response.text}}
                                        </label>
                                    </li>
                                </ol>
                            </div>

                            <!-- Indexes of insert table -->
                            <div v-show="questionIndex === insert_table_index_1 || questionIndex === insert_table_index_2 || questionIndex === insert_table_index_3">
                                <div v-for="(response, i) in question.responses" :key="i">
                                    <br>
                                    <span style="font-size: 125%;">{{response.text}}</span>
                                </div>
                            </div>
                            <!-- -->
                            <!-- Indexes of multi selection -->
                            <div v-show="questionIndex === multi_select_index_1">
                                <ol type="A">
                                    <li v-for="(response, i) in question.responses" :key="i">
                                        <label>
                                            <v-checkbox
                                                v-model="userResponses[i+insert_table_index_1]"
                                                :label="response.text"
                                                v-bind:value="response.correct"
                                                @change="consoleFilter(response.correct, response.answered)">
                                            </v-checkbox>
                                        </label>
                                    </li>
                                </ol>
                            </div>
                            <div v-show="questionIndex === multi_select_index_2">
                                <ol type="A">
                                    <li v-for="(response, i) in question.responses" :key="i">
                                        <label>
                                             <v-checkbox
                                                v-model="userResponses[i+insert_table_index_2]"
                                                :label="response.text"
                                                v-bind:value="response.correct"
                                                @change="consoleFilter(response.correct, response.answered)">
                                            </v-checkbox>
                                        </label>
                                    </li>
                                </ol>
                            </div>
                            <div v-show="questionIndex === multi_select_index_3">
                                <ol type="A">
                                    <li v-for="(response, i) in question.responses" :key="i">
                                        <label>
                                             <v-checkbox
                                                v-model="userResponses[i+insert_table_index_3]"
                                                :label="response.text"
                                                v-bind:value="response.correct"
                                                @change="consoleFilter(response.correct, response.answered)">
                                            </v-checkbox>
                                        </label>
                                    </li>
                                </ol>
                            </div>
                             <!-- -->
                        </v-col> 
                        <v-col class="text-col" col="10">
                            <span class="justify"  @click="insertText()" v-html="question.text"><br></span>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col class="button-position-screen" col="2">
                            <v-btn class="v-btn" v-show="questionIndex > 0" v-on:click="prev">
                                Previous
                            </v-btn>
                            <v-btn class="v-btn" v-on:click="next">
                                Next
                            </v-btn>
                        </v-col>
                    </v-row>
                </div>
            </div>
            <div v-show="questionIndex === quiz.questions.length">
                <v-container class="grey lighten-5">
                    <v-row no-gutters>
                        <v-col cols="6">
                            <h2 style="text-align: center;padding-top: 10px; padding-top: 20px; font-family: Helvetica, Arial, sans-serif;">
                                Final Score: {{ score() }} / {{ (quiz.questions.length - questionIndexDecrementByText) - 1 }}
                            </h2>
                            <img style="
                                display: block;
                                margin-left: auto;
                                margin-right: auto;
                                width: 50%;
                                padding-top: 80px;
                            " src="https://i.ibb.co/R64TvFb/medal-1622523-640.png" width="300" />
                            <h2 style="text-align: center;padding-top: 10px; padding-top: 80px; font-family: Helvetica, Arial, sans-serif;">
                                TOEFL Score: {{ calculateTOEFLscore() }}
                            </h2>
                            <div style="text-align: center;padding-top: 80px; padding-bottom: 10px; font-family: Helvetica, Arial, sans-serif;">
                                <v-btn @click="saveDatabase(score())"> Save your score</v-btn>
                            </div>
                        </v-col>
                        <v-col cols="6">
                            <h2
                            style="
                                text-align: center;
                                padding-top: 10px;
                                padding-bottom: 10px;
                                font-family: Helvetica, Arial, sans-serif;
                            ">Check your answers</h2>
                            <v-simple-table v-if="questionIndex === quiz.questions.length">
                                <template v-slot:default>
                                    <thead>
                                        <tr>
                                            <th class="text-center">
                                                Answer
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-for="(item, i) in selected" :key="i">
                                            <td style="text-align: center">{{ item }}</td>
                                        </tr>
                                    </tbody>
                                </template>
                            </v-simple-table>
                        </v-col>
                    </v-row>
                </v-container>
            </div>
        </v-card>
    </div>
</template>
<script>
import Navbar from '@/components/Navbar';
import Vtabs from '@/components/Vtabs';
import $ from "jquery";
import axios from 'axios';

let response_text_one = ''
let response_text_two = ''
let response_text_three = ''
let old_value_text_one = [];
let old_value_text_two = [];
let old_value_text_three = [];

import VueCookies from 'vue-cookies'

export default {
        components: {
        Navbar, Vtabs
    },
    props: ['insert_table_index_1', 'insert_table_question', 
            'insert_table_index_2', 'insert_table_index_3', 'quiz', 'total_points', 
            'multi_select_index_1', 'multi_select_index_2', 'multi_select_index_3'],
    data() {
     return {
        countDown: 3240,
        response1: '',
        response2: '',
        tpo_id: this.$route.params.tpo_id,
        questionIndexDecrementByText: 3,
        scrolledToBottom: false,
        insert_table_selected: '',
        //quiz: [],
        correctedAnwsers: ['C', 'C', 'B', 'D','D', 'A', 'A', 'A', 'C', 'B', 'D', 'A', 'D', 'A', 'B', 'C', 'D', 'A','D','D','D','D','D','D','D','D','D','D','D','D','D','D','D','D'],
        selected: [''],
        showResults: false,
        questionIndex: 0,
        userResponses: Array(42).fill(false)
     }
    }, methods: {
    consoleFilter(response, answered) {
      if(this.questionIndex === this.multi_select_index_1){
           if(old_value_text_one.includes(answered)){
               old_value_text_one = old_value_text_one.filter(e => e !== answered)
           }else{
               old_value_text_one.push(...answered)
           }

          this.selected[this.questionIndex] = old_value_text_one;
      }else if(this.questionIndex === this.multi_select_index_2){
           if(old_value_text_two.includes(answered)){
               old_value_text_two = old_value_text_two.filter(e => e !== answered)
           }else{
               old_value_text_two.push(...answered)
           }
          this.selected[this.questionIndex] = old_value_text_two;
      }else if(this.questionIndex === this.multi_select_index_3){
           if(old_value_text_three.includes(answered)){
               old_value_text_three = old_value_text_three.filter(e => e !== answered)
           }else{
               old_value_text_three.push(...answered)
           }
          this.selected[this.questionIndex] = old_value_text_three;
      }
     else if(this.questionIndex != 0 && this.questionIndex != 1/*  && this.questionIndex != 16 */){
          this.selected[this.questionIndex] = answered;
      }
      this.$forceUpdate();
    },
    onChange(){
        /*console.log(insert_table_selected)
        if(this.selected[this.insert_table_index_1].length > 3){
            $(this.selected[this.insert_table_index_1]).html(this.insert_table_question);
        }*/
    },
    insertText(){

        let insert_table_question = this.insert_table_question

         $(".A").unbind().click(function() {
            $(".A").html(insert_table_question);
            if($(".B").text().length > 3 || $(".C").text().length > 3 || $(".D").text().length > 3){
                $(".B").html('[▇]');
                $(".C").html('[▇]');
                $(".D").html('[▇]');
            }
            response_text_one = 'A';
        });

         $(".B").unbind().click(function() {
            $(".B").html(insert_table_question);
            if($(".A").text().length > 3 || $(".C").text().length > 3 || $(".D").text().length > 3 ){
                $(".A").html('[▇]');
                $(".C").html('[▇]');
                $(".D").html('[▇]');
            }
            response_text_one = 'B';
        });

        $(".C").unbind().click(function() {
            $(".C").html(insert_table_question);
            if($(".A").text().length > 3 || $(".B").text().length > 3 || $(".D").text().length > 3){
                $(".A").html('[▇]');
                $(".B").html('[▇]');
                $(".D").html('[▇]');
            }
            response_text_one = "C"
        });

        $(".D").unbind().click(function() {
            $(".D").html(insert_table_question);
            if($(".A").text().length > 3 || $(".B").text().length > 3 || $(".C").text().length > 3){
                $(".A").html('[▇]');
                $(".B").html('[▇]');
                $(".C").html('[▇]');
            }
            response_text_one = "D"
        });
        this.selected[this.insert_table_index_1] = response_text_one;

////////////////////////////////////////////////////////////////

        $(".TEXT2A").unbind().click(function() {
            $(".TEXT2A").html('<strong>To enhance their listeners’ enjoyment, storytellers continually make their stories more engaging and memorable.</strong>');
            if($(".TEXT2B").text().length > 3 || $(".TEXT2C").text().length > 3 || $(".TEXT2D").text().length > 3){
                $(".TEXT2B").html('[▇]');
                $(".TEXT2C").html('[▇]');
                $(".TEXT2D").html('[▇]');
            }
            response_text_two = 'A';
        });

         $(".TEXT2B").unbind().click(function() {
            $(".TEXT2B").html('<strong>To enhance their listeners’ enjoyment, storytellers continually make their stories more engaging and memorable.</strong>');
            if($(".TEXT2A").text().length > 3 || $(".TEXT2C").text().length > 3 || $(".TEXT2D").text().length > 3){
                $(".TEXT2A").html('[▇]');
                $(".TEXT2C").html('[▇]');
                $(".TEXT2D").html('[▇]');
            }
            response_text_two = 'B';
        });

        $(".TEXT2C").unbind().click(function() {
            $(".TEXT2C").html('<strong>To enhance their listeners’ enjoyment, storytellers continually make their stories more engaging and memorable.</strong>');
            if($(".TEXT2A").text().length > 3 || $(".TEXT2B").text().length > 3 || $(".TEXT2D").text().length > 3){
                $(".TEXT2A").html('[▇]');
                $(".TEXT2B").html('[▇]');
                $(".TEXT2D").html('[▇]');
            }
            response_text_two = "C"
        });

        $(".TEXT2D").unbind().click(function() {
            $(".TEXT2D").html('<strong>To enhance their listeners’ enjoyment, storytellers continually make their stories more engaging and memorable.</strong>');
            if($(".TEXT2A").text().length > 3 || $(".TEXT2B").text().length > 3 || $(".TEXT2C").text().length > 3){
                $(".TEXT2A").html('[▇]');
                $(".TEXT2B").html('[▇]');
                $(".TEXT2C").html('[▇]');
            }
            response_text_two = "D"
        });
        this.selected[27] = response_text_two;

////////////////////////////////////////////////////////////////

        $(".TEXT3A").unbind().click(function() {
            $(".TEXT3A").html('<strong>To enhance their listeners’ enjoyment, storytellers continually make their stories more engaging and memorable.</strong>');
            if($(".TEXT3B").text().length > 3 || $(".TEXT3C").text().length > 3 || $(".TEXT3D").text().length > 3){
                $(".TEXT3B").html('[▇]');
                $(".TEXT3C").html('[▇]');
                $(".TEXT3D").html('[▇]');
            }
            response_text_three = 'A';
        });

         $(".TEXT3B").unbind().click(function() {
            $(".TEXT3B").html('<strong>To enhance their listeners’ enjoyment, storytellers continually make their stories more engaging and memorable.</strong>');
            if($(".TEXT3A").text().length > 3 || $(".TEXT3C").text().length > 3 || $(".TEXT3D").text().length > 3){
                $(".TEXT3A").html('[▇]');
                $(".TEXT3C").html('[▇]');
                $(".TEXT3D").html('[▇]');
            }
            response_text_three = 'B';
        });

        $(".TEXT3C").unbind().click(function() {
            $(".TEXT3C").html('<strong>To enhance their listeners’ enjoyment, storytellers continually make their stories more engaging and memorable.</strong>');
            if($(".TEXT3A").text().length > 3 || $(".TEXT3B").text().length > 3 || $(".TEXT3D").text().length > 3){
                $(".TEXT3A").html('[▇]');
                $(".TEXT3B").html('[▇]');
                $(".TEXT3D").html('[▇]');
            }
            response_text_three = "C"
        });

        $(".TEXT3D").unbind().click(function() {
            $(".TEXT3D").html('<strong>To enhance their listeners’ enjoyment, storytellers continually make their stories more engaging and memorable.</strong>');
            if($(".TEXT3A").text().length > 3 || $(".TEXT3B").text().length > 3 || $(".TEXT3C").text().length > 3){
                $(".TEXT3A").html('[▇]');
                $(".TEXT3B").html('[▇]');
                $(".TEXT3C").html('[▇]');
            }
            response_text_three = "D"
        });
        this.selected[38] = response_text_three;
    },
        countDownTimer() {
            if(this.countDown > 0) {
                setTimeout(() => {
                    this.countDown -= 1
                    this.countDownTimer()
                }, 1000)
            }
        },
    secondsToHms(d) {
    d = Number(d);
    var m = Math.floor(d % 3600 / 60);
    var s = Math.floor(d % 3600 % 60);

    var mDisplay = m > 0 ? m + (m == 1 ? "" : "") : "00";
    var sDisplay = s > 0 ? s + (s == 1 ? " " : " ") : "00";
    return mDisplay + ':' + sDisplay;
    },
        saveDatabase(score){
        const headers = { "Content-Type": "application/json" };
          axios.post("https://toeflmadeeasy.pythonanywhere.com/insertreadingscore",{
          "public_id": VueCookies.get('TOEFLMADEEASY').public_id,
          "score": score,
          "id_tpo": this.$route.params.tpo_id,
          "data": new Date().toLocaleString()
          }, { headers })
          .then(response =>
              this.$router.push('/scoreboard')
          ).catch(error => console.log(error.response.data));

        },
        scroll () {
    window.onscroll = () => {
    let bottomOfWindow = Math.max(window.pageYOffset, document.documentElement.scrollTop, document.body.scrollTop) + window.innerHeight === document.documentElement.offsetHeight

    if (bottomOfWindow) {
     this.scrolledToBottom = true // replace it with your code
    }
 }
},
    // Go to next question
    next: function() {
          /* if(this.questionIndex === this.quiz.questions.length){
            this.$forceUpdate();
        }

      if(this.questionIndex > 1){
        if(!typeof this.selected22[this.questionIndex-2] !== "undefined"){
            this.selected22[this.questionIndex-2] = "Not Answered"
        }
      }*/

      if(old_value_text_one.length > 3 || old_value_text_two.length > 3 || old_value_text_three.length > 3){
           this.$toast.error("You can not select more than 3 options", {
            timeout: 5000
        })
      }else{
           this.questionIndex++;
      }
      //this.$forceUpdate();
    },
    // Go to previous question
    prev: function() {
      this.questionIndex--;
    },
    // Return "true" count in userResponses
    score: function() {
      return this.userResponses.filter(function(val) { if(val !== true) { return val}}).length;
    },
    calculateTOEFLscore: function() {
       var raw_points = this.userResponses.filter(function(val) { if(val !== true) { return val}}).length
       return ((raw_points/this.total_points) * 30).toFixed();
    }
  },mounted () {

      this.countDownTimer()
  },
    created(){

  },
  computed: {
       timeIsOver: function () {
        if(this.countDown < 1){
          alert("Time is over")
          this.saveDatabase(this.userResponses.filter(function(val) { if(val !== true) { return val}}).length);
          this.$router.push('/scoreboard');
        }
      },
  },
  /*watch : {
    timeIsOver: function () {
        if(this.countDown < 1){
          alert("Time is over")
          this.saveDatabase(score);
          this.$router.push('/scoreboard');
        }
      }
  }*/
}
</script>

<style scoped>
    .justify{
      display: inline-block;
      text-align: justify;
      text-justify: inter-word;
      font-family: "dosis", sans-serif;
      max-width: 800px;
      margin: 0 5% 1rem;
      font-size: 20px;
      coloR: black;
    }

.v-btn{
    margin-left: 50px;
}

#app {
  margin-left: 120px;
  margin-right: 220px;
}

.answers-col{
    padding-top: 80px;
    padding-left: 50px;
}

.text-col{
    padding-top: 80px;
    padding-right: 50px;
}
.button-position-screen {
    position:absolute;
    left: 50%;
}
</style>

