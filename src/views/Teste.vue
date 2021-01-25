<template>
  <div class="team">
      <Navbar />
      <br/>
    <v-container class="my-5">
            <div v-show="text && this.tpos_index.includes(this.text_selected)">
                {{tpos[contador]}}
            </div>

<br> <br> <br>
{{"text selected: " + contador}} <br> <br> <br>
{{"question selected: " + questions_selected}}
 <br> <br> <br>
{{"text : " + text}}


        <div v-show="!text">
            <p>{{ selected }}</p>
            {{questions[questions_selected].question}}

         <div class="box" v-for="(question,index) in questions.slice(a,b)" :key="index">
            <div class="box-propositions">
                <ul>
                  <li v-for="(proposition,index) in question.propositions" :key="index" class="li" @click="selectResponse(proposition,index)" :class=" correct ? check(proposition) : ''">{{proposition.props}} <div class="fas fa-check" v-if="correct ?  proposition.correct: ''"></div><div class="fas fa-times" v-if="correct ?  !proposition.correct: ''"></div></li>
                </ul>
            </div>
        </div>
</div>


        <br><br>
        <v-btn
            class="mr-4"
            @click="back"
            >
            Back
        </v-btn>
                <v-btn
            class="mr-4"
            @click="next"
            >
            Next
        </v-btn>
        <br>
        <!--{{questions_selected}}-->
    </v-container>
  </div>
</template>

<script>

import Form from '../components/Form';
import Navbar from '@/components/Navbar';
//import axios from 'axios';

export default {
    components: {
        Form,
        Navbar
    },
    data(){
        return {
            selected: '',
            text: true,
            text_selected: 0,
            questions_selected: 0,
            contador: 0,
            tpos: [
                `
        American Railroads
        In the United States, railroads spearheaded the second phase of the transportation revolution by overtaking the previous importance of canals. The mid-1800s saw a great expansion of American railroads. The major cities east of the Mississippi River were linked by a spiderweb of railroad tracks. Chicago's growth illustrates the impact of these rail links. In 1849 Chicago was a village of a few hundred people with virtually no rail service. By 1860 it had become a city of 100,000, served by eleven railroads. Farmers to the north and west of Chicago no longer had to ship their grain, livestock, and dairy products down the Mississippi River to New Orleans; they could now ship their products directly east. Chicago supplanted New Orleans as the interior of America's main commercial hub.
        The east-west rail lines stimulated the settlement and agricultural development of the Midwest. By 1860, Illinois, Indiana, and Wisconsin had replaced Ohio, Pennsylvania, and New York as the leading wheat-growing states. Enabling farmers to speed their products to the East, railroads increased the value of farmland and promoted additional settlement. In turn, population growth in agricultural areas triggered industrial development in cities such as Chicago, Davenport (Iowa), and Minneapolis, for the new settlers needed lumber for fences and houses and mills to grind wheat into flour.
        Railroads also propelled the growth of small towns along their routes. The Illinois Central Railroad, which had more track than any other railroad in 1855, made money not only from its traffic but also from real estate speculation. Purchasing land for stations along its path, the Illinois Central then laid out towns around the stations. The selection of Manteno, Illinois, as a stop of the Illinois Central, for example, transformed the site from a crossroads without a single house in 1854 into a bustling town of nearly a thousand in 1860, replete with hotels, lumberyards, grain elevators, and gristmills. By the Civil War (1861-1865), few thought of the railroad-linked Midwest as a frontier region or viewed its inhabitants as pioneers.
        As the nation's first big business, the railroads transformed the conduct of business. During the early 1830s, railroads, like canals, depended on financial aid from state governments. With the onset of economic depression in the late 1830s, however, state governments scrapped overly ambitious railroad projects. Convinced that railroads burdened them with high taxes and blasted hopes, voters turned against state aid, and in the early 1840s, several states amended their constitutions to bar state funding for railroads and canals. The federal government took up some of the slack, but federal aid did not provide a major stimulus to railroads before 1860. Rather, part of the burden of finance passed to city and county governments in agricultural areas that wanted to attract railroads. Such municipal governments, for example, often gave railroads rights-of-way, grants of land for stations, and public funds.
        The dramatic expansion of the railroad network in the 1850s, however, strained the financing capacity of local governments and required a turn toward private investment, which had never been absent from the picture. Well aware of the economic benefits of railroads, individuals living near them had long purchased railroad stock issued by governments and had directly bought stock in railroads, often paying by contributing their labor to building the railroads. But the large railroads of the 1850s needed more capital than such small investors could generate. Gradually, the center of railroad financing shifted to New York City, and in fact, it was the railroad boom of the 1850s that helped make Wall Street in New York City the nation's greatest capital market. The stocks of all the leading railroads were traded on the floor of the New York Stock Exchange during the 1850s. In addition, the growth of railroads turned New York City into the center of modern investment firms. The investment firms evaluated the stock of railroads in the smaller American cities and then found purchasers for these stocks in New York City, Philadelphia, Paris, London, Amsterdam, and Hamburg. Controlling the flow of funds to railroads, the investment bankers began to exert influence over the railroads' internal affairs by supervising administrative reorganizations in times of trouble.
                `,
            "ASDHASUDHASUDSHDUDHUAHSDUDAHDUASHDS"
            ],
            quiz:true,
            a:0,
            b:1,
            tpos_index: [0, 5],
            //questions_selected: 0,
            questions:[
                    {
                    question:"According to paragraph 1, what effect did the expansion of rail links have on Chicago?",
                    propositions:[
                        {props:'A) Chicago became the headquarters for eleven new railroads.',correct:true},
                        {props:'B) Chicago became the most important city east of the Mississippi River.'},
                        {props:'C) Chicago was transformed from a village into a large city.',},
                        {props:'D) Chicago replaced eastern cities as the main buyer of farm products from the region. The paragraph 1 is marked with',}
                    ]
                },
                {
                    question:"Paragraph 2 supports the idea that Illinois, Indiana, and Wisconsin were able to become the leading wheat-growing states by 1860 in large part because",
                    propositions:[
                        {props:'A) By 1860 there were more railroads in Illinois, Indiana, and Wisconsin than in Ohio, Pennsylvania, and New York',correct:true},
                        {props:'B) The expansion of east-west rail lines made transporting Midwestern products to East Coast markets relatively fast and easy'},
                        {props:'C) By 1860 states such as Ohio, Pennsylvania, and New York had become more interested in industrial development than in agriculture',},
                        {props:'D) Most of the farmers who had grown wheat in Ohio, Pennsylvania, or New York resettled in the Midwest after the expansion of east-west rail lineThe paragraph 2 is marked with',}
                    ]
                },
                {
                    question:"Paragraph 3",
                    propositions:[
                        {props:'<s3333333333cript>',correct:true},
                        {props:'<js>'},
                        {props:'<scripting>',},
                        {props:'<javascript>',}
                    ]
                },
                {
                    question:"Paragraph 4",
                    propositions:[
                        {props:'<scri4444444444pt>',correct:true},
                        {props:'<js>'},
                        {props:'<scripting>',},
                        {props:'<javascript>',}
                    ]
                },
                                {
                    question:"Paragraph 1",
                    propositions:[
                        {props:'<scri4444444444pt>',correct:true},
                        {props:'<js>'},
                        {props:'<scripting>',},
                        {props:'<javascript>',}
                    ]
                },
                                {
                    question:"Paragraph 2",
                    propositions:[
                        {props:'<scri4444444444pt>',correct:true},
                        {props:'<js>'},
                        {props:'<scripting>',},
                        {props:'<javascript>',}
                    ]
                },
                                {
                    question:"Paragraph 3",
                    propositions:[
                        {props:'<scri4444444444pt>',correct:true},
                        {props:'<js>'},
                        {props:'<scripting>',},
                        {props:'<javascript>',}
                    ]
                },
                                {
                    question:"Paragraph 4",
                    propositions:[
                        {props:'<scri4444444444pt>',correct:true},
                        {props:'<js>'},
                        {props:'<scripting>',},
                        {props:'<javascript>',}
                    ]
                },
                                {
                    question:"TESTESTESTESTESTES 111114 ?",
                    propositions:[
                        {props:'<scri4444444444pt>',correct:true},
                        {props:'<js>'},
                        {props:'<scripting>',},
                        {props:'<javascript>',}
                    ]
                },
            ]

          /*  questions: ["o quê é TOEFL? ", "Quantos pontos é necessário ?", "Vamos brincar?"],
            answers: ["question_oneOi?", "TUDO BEM?", "asdasdasd", "asdasdasd"]
*/

            /*

                {
                question:"How can you add a comment in a JavaScript ?",
                propositions:[
                    {props:"'This is a comment"},
                    {props:'//This is a comment',correct:true},
                    {props:'<!--This is a comment-->'},
                    {props:'*This is a comment'},

                ]

                }

            */
        }
    },
    methods: {
        next: function() {

                if(this.questions_selected < this.questions.length - 1){
                this.a++;
                this.b++;
                this.text = false;
                if(this.contador == 0 || this.contador == 4){
                    this.text = true;
                    this.questions_selected += 1;
                    this.contador++;
                }else if(this.questions_selected != 0 || this.questions_selected != 4){
                    this.text = true;
                    this.questions_selected++;
                }

            }

            /*if(this.questions_selected < this.questions.length - 1){
                this.a++;
                this.b++;
                this.text = false;
                if(this.tpos_index.includes(this.text_selected) && this.text_selected > 0){
                    this.text = true;
                    this.text_selected += 1;
                }else if(this.tpos_index.includes(this.text_selected)){
                    this.questions_selected += 1;
                    this.text = false;
                }else if(this.tpos_index.includes(this.questions_selected)){
                    this.text_selected += 1;
                    this.text = true;
                    alert("oi")
                }else{
                    this.questions_selected += 1;
                    this.text = false;
                }
            }*/
        },
        back: function() {

            if(this.questions_selected < this.questions.length - 1){
                this.a--;
                this.b--;
                this.text = false;
                if(this.tpos_index.includes(this.text_selected) && this.text_selected > 0){
                    this.text = true;
                }else if(this.tpos_index.includes(this.text_selected)){
                    this.text_selected += 1;
                }else{
                    this.questions_selected += 1;
                    this.text = false;
                }
            }

           /* this.a--;
            this.b--;
            if(this.questions_selected > 0){
                this.questions_selected -= 1;
                this.text_selected -= 1;
                if(this.tpos_index.includes(this.text_selected)){
                    this.text = true;
                }else{
                    this.text = false;
                }
            }*/
        }
    }
}

</script>
