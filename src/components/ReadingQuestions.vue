<template>
    <div oncopy="return false" onpaste="return false" oncut="return false" id="app">
        <Navbar v-show="questionIndex === quiz.questions.length" />
        <div style="display: flex;
                    flex-direction: row;
                    flex-wrap: wrap;
                    justify-content: center;
                    padding-left: 200px;
                    align-items: center;" v-show="questionIndex-1 > 0 && questionIndex-1 < quiz.questions.length-1 && questionIndex-1 !== 15">
            <div v-if="(questionIndex-questionIndexDecrementByText) + 1 < 15">
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
                font-size: 30px;
                padding-left: 200px;
                ">
                {{secondsToHms(countDown) }}
            </div>
            <br /> <br /> <br />
        </div>
        <v-card min-height="1000px">
            <!--<h1 v-show="showResults && questionIndex > 1"> Resposta certa: {{correctedAnwsers[questionIndex-2]}}</h1>-->
            <div v-for="(question, index) in quiz.questions" :key="index">
                <div v-show="index === questionIndex">
                    <v-row>
                        <br><br><br>
                        <v-col class="answers-col" col="10">
                            <v-col col="2"><span class="justify" v-html="question.question" /></v-col>
                            <div v-show="questionIndex !=15 && questionIndex != 14 && questionIndex != 29 && questionIndex != 30 && questionIndex != 40 && questionIndex != 41">
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
                            <div v-show="questionIndex === 14 || questionIndex === 29 || questionIndex === 40">
                                <div v-for="(response, i) in question.responses" :key="i">
                                    <br>
                                    <span style="font-size: 125%;">{{response.text}}</span>
                                </div>
                            </div>
                            <!-- -->

                            <!-- Indexes of multi selection -->
                            <div v-show="questionIndex === 15">
                                <ol type="A">
                                    <li v-for="(response, i) in question.responses" :key="i">
                                        <label>
                                            <v-checkbox v-if="questionIndex === 15"
                                                v-model="userResponses[i+14]"
                                                :label="response.text"
                                                v-bind:value="response.correct"
                                                @change="consoleFilter(response.correct, response.answered)">
                                            </v-checkbox>
                                        </label>
                                    </li>
                                </ol>
                            </div>
                            <div v-show="questionIndex === 30">
                                <ol type="A">
                                    <li v-for="(response, i) in question.responses" :key="i">
                                        <label>
                                             <v-checkbox
                                                v-model="userResponses[i+29]"
                                                :label="response.text"
                                                v-bind:value="response.correct"
                                                @change="consoleFilter(response.correct, response.answered)">
                                            </v-checkbox>
                                        </label>
                                    </li>
                                </ol>
                            </div>
                            <div v-show="questionIndex === 41">
                                <ol type="A">
                                    <li v-for="(response, i) in question.responses" :key="i">
                                        <label>
                                             <v-checkbox
                                                v-model="userResponses[i+40]"
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
                            <span class="justify" @onchange="onChange()" @click="insertText()" v-html="question.text">
                            </span>
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

//http://t.weixue100.com/toefl/read/result?aeid=396807
var quiz_tpo_01 = {
  title: 'My quiz',
  questions: [
      {
      text: `
        Section Directions
        <br/><br/>
        This section measures your ability to understand academic passages in English. You will read 3 passages. In an actual test you will have 54 minutes to read the passages and answer the questions.
        Most questions are worth 1 point but the last question in each passage is worth more than 1 point. The directions indicate how many points you may receive.
        Some passages include a word or phrase that is underlined in blue. Click on the word of phrase to see a definition or an explanation.
        Within this section, you can go to the next question by click Next. You may skip questions and go back later. If you want to return to previous questions, click on Back. You can click on Review at any time and the review screen will show you which questions you have answered and which you have not answered. From this review screen, you may go directly to any question you have already seen in the Reading section.
        You may now begin the Reading section. In an actual test 54 minutes to read the 3 passages and answer the questions. NOTE: Also, in an actual test some test takers may receive 4 passages; those test taker will have 72 minutes (1 hour and 12 minutes) to answer the questions.
        <br/><br/>
        Click on Continue to go on.
        <br/>
      `,
    },
    {
      text: `
        Groundwater <br/> <br/>
        Groundwater is the word used to describe water that saturates the ground, filling all
        the available spaces. By far the most abundant type of groundwater is meteoric
        water; this is the groundwater that circulates as part of the water cycle. Ordinary
        meteoric water is water that has soaked into the ground from the surface, from
        precipitation (rain and snow) and from lakes and streams. There it remains,
        sometimes for long periods, before emerging at the surface again. At first thought
        it seems incrediblethat there can be enough space in the “solid” ground underfoot
        to hold all this water. <br/> <br/>
        The necessary space is there, however, in many forms. The commonest spaces are
        those among the particles—sand grains and tiny pebbles—of loose, unconsolidated
        sand and gravel. Beds of this material, out of sightbeneath the soil, are common.
        They are found wherever fast rivers carrying loads of coarse sediment once flowed.
        For example, as the great ice sheets that covered North America during the last ice
        age steadily melted away, huge volumes of water flowed from them. The water
        was always laden with pebbles, gravel, and sand, known as glacial outwash, that
        was deposited as the flow slowed down. <br/> <br/>
        The same thing happens to this day, though on a smaller scale, wherever a
        sediment-laden river or stream emerges from a mountain valley onto relatively flat
        land, dropping its load as the current slows: the water usually spreads out fanwise,
        depositing the sediment in the form of a smooth, fan-shaped slope. Sediments are
        also dropped where a river slows on entering a lake or the sea, the deposited
        sediments are on a lake floor or the seafloor at first, but will be located inland at
        some future date, when the sea level falls or the land rises; such beds are
        sometimes thousands of meters thick. <br/> <br/>
        In lowland country almost any spot on the ground may overlie what was once the
        bed of a river that has since become buried by soil; if they are now below the
        water’s upper surface (the water table), the gravels and sands of the former
        riverbed, and its sandbars, will be saturated with groundwater. <br/> <br/>
        So much for unconsolidated sediments. Consolidated (or cemented) sediments, too,
        contain millions of minute water-holding pores. This is because the gaps among
        the original grains are often not totally pluggedwith cementing chemicals; also,
        parts of the original grains may become dissolved by percolating groundwater,
        either while consolidation is taking place or at any time afterwards. The result is
        that sandstone, for example, can be as porous as the loose sand from which it was
        formed. <br/> <br/>
        Thus a proportion of the total volume of any sediment, loose or cemented, consists
        of empty space. Most crystalline rocks are much more solid; a common exception
        is basalt, a form of solidified volcanic lava, which is sometimes full of tiny bubbles
        that make it very porous. <br/> <br/>
        The proportion of empty space in a rock is known as its porosity. But note that
        porosity is not the same as permeability, which measures the ease with which
        water can flow through a material; this depends on the sizes of the individual
        cavities and the crevices linking them. <br/> <br/>
        Much of the water in a sample of water-saturated sediment or rock will drain from
        it if the sample is put in a suitable dry place. But some will remain, clinging to all
        solid surfaces. It is held there by the force of surface tension without which water
        would drain instantly from any wet surface, leaving it totally dry. The total volume
        of water in the saturated sample must therefore be thought of as consisting of water
        that can, and water that cannot, drain away. <br/> <br/>
        The relative amount of these two kinds of water varies greatly from one kind of
        rock or sediment to another, even though their porosities may be the same. What
        happens depends on pore size. If the pores are large, the water in them will exist as
        drops too heavy for surface tension to hold, and it will drain away; but if the pores
        are small enough, the water in them will exist as thin films, too light to overcome
        the force of surface tension holding them in place; then the water will be firmly
        held.
        <br/> <br/>
        <br/>
      `,
    },
     {
      text: `Paragraph 1: ✦ Groundwater is the word used to describe water that saturates the ground,filling all the available spaces. By far the most abundant type of groundwater is meteoric water; this is the groundwater that circulates as part of the water cycle. Ordinary meteoric water is water that has soaked into the ground from the surface, from precipitation (rain and snow) and from lakes and streams. There it remains, sometimes for long periods, before emerging at the surface again. At first thought it seems incredible that there can be enough space in the “solid” ground underfoot to hold all this water.
        <br><br>
        `,
      question: '1. Which of the following can be inferred from paragraph 1 about the ground that we walk on?',
      responses: [
        {text: 'It cannot hold rainwater for long periods of time', answered: 'A'},
        {text: 'It prevents most groundwater from circulating', answered: 'B', },
        {text: 'It has the capacity to store large amounts of water', answered: 'C',  correct: 'C'},
        {text: 'It absorbs most of the water it contains from rivers', answered: 'D', },
      ]
    },
    {
      text: `Paragraph 1: ✦ Groundwater is the word used to describe water that saturates the ground,filling all the available spaces. By far the most abundant type of groundwater is meteoric water; this is the groundwater that circulates as part of the water cycle. Ordinary meteoric water is water that has soaked into the ground from the surface, from precipitation (rain and snow) and from lakes and streams. There it remains, sometimes for long periods, before emerging at the surface again. At first thought it seems <strong>incredible</strong> that there can be enough space in the “solid” ground underfoot to hold all this water.
        <br><br>
        `,
      question: `2. The word <strong>"incredible"</strong> in the passage is closest in meaning to`,
      responses: [
        {text: 'Confusing', answered: 'A'},
        {text: 'Comforting', answered: 'B', },
        {text: 'Unbelievable', answered: 'C',  correct: 'C'},
        {text: 'Interesting', answered: 'D', },
      ]
    },
    {
      text: `Paragraph 2: ✦ The necessary space is there, however, in many forms. The commonest spaces are those among the particles—sand grains and tiny pebbles—of loose, unconsolidated sand and gravel. Beds of this material, <strong>out of sight</strong> beneath the soil, are common. They are found wherever fast rivers carrying loads of coarse sediment once flowed. For example, as the great ice sheets that covered North America during the last ice age steadily melted away, huge volumes of water flowed from them. The water was always laden with pebbles, gravel, and sand, known as glacial outwash, that was deposited as the flow slowed down.
        <br><br>
        `,
      question: '3. The word <strong>"out of sight"</strong> in the passage is closest in meaning to',
      responses: [
        {text: 'Far away', answered: 'A'},
        {text: 'Hidden', answered: 'B', correct: 'B'},
        {text: 'Partly visible', answered: 'C'},
        {text: 'Discovered', answered: 'D', },
      ]
    },
    {
      text: `Paragraph 2: ✦ The necessary space is there, however, in many forms. The commonest spaces are those among the particles—sand grains and tiny pebbles—of loose, unconsolidated sand and gravel. Beds of this material, out of sight beneath the soil, are common. They are found wherever fast rivers carrying loads of coarse sediment once flowed. For example, as the great ice sheets that covered North America during the last ice age steadily melted away, huge volumes of water flowed from them. The water was always laden with pebbles, gravel, and sand, known as glacial outwash, that was deposited as the flow slowed down.
        <br><br>
        `,
      question: '4. According to paragraph 2, where is groundwater usually found?',
      responses: [
        {text: 'Inside pieces of sand and gravel', answered: 'A'},
        {text: 'On top of beds of rock', answered: 'B'},
        {text: 'In fast rivers that are flowing beneath the soil', answered: 'C'},
        {text: 'In spaces between pieces of sediment', answered: 'D', correct: 'D' },
      ]
    },
    {
      text: `Paragraph 2: ✦ The necessary space is there, however, in many forms. The commonest spaces are those among the particles—sand grains and tiny pebbles—of loose, unconsolidated sand and gravel. Beds of this material, out of sight beneath the soil, are common. They are found wherever fast rivers carrying loads of coarse sediment once flowed. For example, as the great ice sheets that covered North America during the last ice age steadily melted away, huge volumes of water flowed from them. The water was always laden with pebbles, gravel, and sand, known as <strong>glacial outwash</strong>, that was deposited as the flow slowed down.
        <br><br>
        `,
      question: '5.The phrase <strong>"glacial outwash"</strong> in the passage refers to',
      responses: [
        {text: 'Fast rivers', answered: 'A'},
        {text: 'Glaciers', answered: 'B'},
        {text: 'The huge volumes of water created by glacial melting', answered: 'C'},
        {text: 'The particles carried in water from melting glaciers', answered: 'D', correct: 'D' },
      ]
    },
    {
      text: `Paragraph 3: ✦ The same thing happens to this day, though on a smaller scale, wherever a sediment-laden river or stream emerges from a mountain valley onto relatively flat land, dropping its load as the current slows: the water usually spreads out fanwise, depositing the sediment in the form of a smooth, fan-shaped slope. Sediments are also dropped where a river slows on entering a lake or the sea, the deposited sediments are on a lake floor or the seafloor at first, but will be located inland at some future date, when the sea level falls or the land rises; such beds are sometimes thousands of meters thick.
        <br><br>
        `,
      question: '6. All of the following are mentioned in paragraph 3 as places that sediment-laden rivers can deposit their sediments EXCEPT',
      responses: [
        {text: 'A mountain valley', answered: 'A', correct: 'A' },
        {text: 'Flat land', answered: 'B'},
        {text: 'A lake floor', answered: 'C'},
        {text: 'The seafloor', answered: 'D'},
      ]
    },
    {
      text: `Paragraph 4: ✦ In lowland country almost any spot on the ground may <strong>overlie</strong> what was once the bed of a river that has since become buried by soil; if they are now below the water’s upper surface (the water table), the gravels and sands of the former riverbed, and its sandbars, will be saturated with groundwater.
        <br><br>
        `,
      question: '7. The word "overlie" in the passage is closest in meaning to',
      responses: [
        {text: 'Cover', answered: 'A', correct: 'A' },
        {text: 'Change', answered: 'B'},
        {text: 'Separate', answered: 'C'},
        {text: 'Surround', answered: 'D'},
      ]
    },
    {
      text: `Paragraph 5: ✦ <strong>So much for</strong> unconsolidated sediments. Consolidated (or cemented) sediments, too, contain millions of minute water-holding pores. This is because the gaps among the original grains are often not totally plugged with cementing chemicals; also, parts of the original grains may become dissolved by percolating groundwater, either while consolidation is taking place or at any time afterwards. The result is that sandstone, for example, can be as porous as the loose sand from which it was formed.
        <br><br>
        `,
      question: '8. The phrase "So much for" in the passage is closest in meaning to',
      responses: [
        {text: 'That is enough about', answered: 'A', correct: 'A' },
        {text: 'Now let us turn to', answered: 'B'},
        {text: 'Of greater concern are', answered: 'C'},
        {text: 'This is related to', answered: 'D'},
      ]
    },
    {
      text: `Paragraph 5: ✦ So much for unconsolidated sediments. Consolidated (or cemented) sediments, too, contain millions of minute water-holding pores. This is because the gaps among the original grains are often not totally <strong>plugged</strong> with cementing chemicals; also, parts of the original grains may become dissolved by percolating groundwater, either while consolidation is taking place or at any time afterwards. The result is that sandstone, for example, can be as porous as the loose sand from which it was formed.
        <br><br>
        `,
      question: '9. The word "plugged" in the passage is closet in meaning to',
      responses: [
        {text: 'Washed', answered: 'A'},
        {text: 'Dragged', answered: 'B'},
        {text: 'Filled up', answered: 'C', correct: 'C' },
        {text: 'Soaked through', answered: 'D'},
      ]
    },
    {
      text: `Paragraph 6: ✦ Thus a proportion of the total volume of any sediment, loose or cemented, consists of empty space. Most crystalline rocks are much more solid; a common exception is basalt, a form of solidified volcanic lava, which is sometimes full of tiny bubbles that make it very porous.
        <br> <br>
        Paragraph 7: ✦ The proportion of empty space in a rock is known as its porosity. But note that porosity is not the same as permeability, which measures the ease with which water can flow through a material; this depends on the sizes of the individual cavities and the crevices linking them.
        <br><br>
        `,
      question: '10. According to paragraphs 6 and 7, why is basalt unlike most crystalline forms of rock?',
      responses: [
        {text: 'It is unusually solid.', answered: 'A'},
        {text: 'It often has high porosity.', answered: 'B', correct: 'B'},
        {text: 'It has a low proportion of empty space.', answered: 'C'},
        {text: 'It is highly permeable', answered: 'D'},
      ]
    },
    {
      text: `Paragraph 7: ✦ The proportion of empty space in a rock is known as its porosity. But note that porosity is not the same as permeability, which measures the ease with which water can flow through a material; this depends on the sizes of the individual cavities and the crevices linking them.
        <br><br>
        `,
      question: '11. What is the main purpose of paragraph 7?',
      responses: [
        {text: 'To explain why water can flow through rock', answered: 'A'},
        {text: 'To emphasize the large amount of empty space in all rock', answered: 'B'},
        {text: 'To point out that a rock cannot be both porous and permeable', answered: 'C'},
        {text: 'To distinguish between two related properties of rock', answered: 'D', correct: 'D'},
      ]
    },
    {
      text: `Paragraph 9: ✦ The relative amount of these two kinds of water varies greatly from one kind of rock or sediment to another, even though their porosities may be the same. What happens depends on pore size. <strong>If the pores are large, the water in them will exist as drops too heavy for surface tension to hold, and it will drain away; but if the pores are small enough, the water in them will exist as thin films, too light to overcome the force of surface tension holding them in place; then the water will be firmly held</strong>.
        <br><br>
        `,
      question: '12. Which of the sentences below best expresses the essential information in the highlighted sentence in the passage? Incorrect choices change the meaning in important ways or leave out essential information.',
      responses: [
        {text: 'Surface tension is not strong enough to retain drops of water in rocks with large pores but it strong enough to hold on to thin films of water in rocks with small pores.', answered: 'A', correct: 'A'},
        {text: 'Water in rocks is held in place by large pores and drains away from small size pores through surface tension.', answered: 'B'},
        {text: 'Small pores and large pores both interact with surface tension to determine whether a rock will hold water as heavy drops or as a thin film.', answered: 'C'},
        {text: 'If the force of surface tension is too weak to hold water in place as heavy drops, the water will continue to be held firmly in place as a thin film when large pores exist.', answered: 'D'},
      ]
    },
    //////////////
    {
      text: `Much of the water in a sample of water-saturated sediment or rock will drain from it if the sample is put in a suitable dry place. <span class="A">[▇]</span> But some will remain, clinging to all solid surfaces. <span class="B">[▇]</span> It is held there by the force of surface tension without which water would drain instantly from any wet surface, leaving it totally dry. <span class="C">[▇]</span> The total volume of water in the saturated sample must therefore be thought of as consisting of water that can, and water that cannot, drain away. <span class="D">[▇]</span>
        <br><br>
        `,
      question: '13. Look at the four squares [▇] that indicate where the following sentence could be added to the passage. Where would the sentence best fit?',
      responses: [
        {text: 'What, then, determines what proportion of the water stays and what proportion drains away?', answered: 'A', correct: 'A'},
      ]
    }///////////////
    ,
    {
      text: `
        <br><br>
        `,
      question: '14. An introductory sentence for a brief summary of the passage is provided below. Complete the summary by selecting the THREE answer choices that express the most important ideas in the passage. Some sentences do not belong in the summary because they express ideas that are not presented in the passage or are minor ideas in the passage. This question is worth 2 points. Much of the ground is actually saturated with water.',
      responses: [
        {text: 'Sediments that hold water were spread by glaciers and are still spread by rivers and streams.', answered: 'A', correct: 'A'},
        {text: 'Water is stored underground in beds of loose sand and gravel or in cemented sediment.', answered: 'B', correct: 'B'},
        {text: 'The size of a saturated rock’s pores determines how much water it will retain when the rock is put in a dry place.', answered: 'C', correct: 'C'},
        {text: 'Groundwater often remains underground for a long time before it emerges again.', answered: 'D'},
        {text: 'Like sandstone, basalt is a crystalline rock that is very porous.', answered: 'E'},
        {text: 'Beds of unconsolidated sediments are typically located at inland sites that were once underwater.', answered: 'F'},
      ]
    },{
      text: `
        The Origins of Theater
        <br><br>
        In seeking to describe the origins of theater, one must rely primarily on
        speculation, since there is little concrete evidence on which to draw. The most
        widely accepted theory, championed by anthropologists in the late nineteenth and
        early twentieth centuries, envisions theater as emerging out of myth and ritual. The
        process perceived by these anthropologists may be summarized briefly. During the
        early stages of its development, a society becomes aware of forces that appear to
        influence or control its food supply and well-being. Having little understanding of
        natural causes, it attributes both desirable and undesirable occurrences to
        supernatural or magical forces, and it searches for means to win the favor of these
        forces. Perceiving an apparent connection between certain actions performed by
        the group and the result it desires, the group repeats, refines and formalizes those
        actions into fixed ceremonies, or rituals.<br><br>
        Stories (myths) may then grow up around a ritual. Frequently the myths include
        representatives of those supernatural forces that the rites celebrate or hope to
        influence. Performers may wear costumes and masks to represent the mythical
        characters or supernatural forces in the rituals or in accompanying celebrations. As
        a people becomes more sophisticated, its conceptions of supernatural forces and
        causal relationships may change. As a result, it may abandon or modify some rites.
        But the myths that have grown up around the rites may continue as part of the
        group’s oral tradition and may even come to be acted out under conditions
        divorced from these rites. When this occurs, the first step has been taken toward
        theater as an autonomous activity, and thereafter entertainment and aesthetic values
        may gradually replace the former mystical and socially efficacious concerns.<br><br>
        Although origin in ritual has long been the most popular, it is by no means the only
        theory about how the theater came into being.Storytelling has been proposed as
        one alternative. Under this theory, relating and listening to stories are seen as
        fundamental human pleasures. Thus, the recalling of an event (a hunt, battle, or
        other feat) is elaborated through the narrator’s pantomime and impersonation and
        eventually through each role being assumed by a different person.<br><br>
        A closely related theory sees theater as evolving out of dances that are primarily
        pantomimic, rhythmical or gymnastic, or from imitations of animal noises and
        sounds. Admiration for the performer’s skill, virtuosity, and grace are seen as
        motivation for elaborating the activities into fully realized theatrical performances.
        In addition to exploring the possible antecedents of theater, scholars have also
        theorized about the motives that led people to develop theater. Why did theater
        develop, and why was it valued after it ceased to fulfill the function of ritual? Most
        answers fall back on the theories about the human mind and basic human needs.
        One, set forth by Aristotle in the fourth century B.C., sees humans as naturally
        imitative—as taking pleasure in imitating persons, things, and actions and in seeing
        such imitations. Another, advanced in the twentieth century, suggests that humans
        have a gift for fantasy, through which they seek to reshape reality into more
        satisfying forms than those encountered in daily life. Thus, fantasy or fiction (of
        which drama is one form) permits people to objectify their anxieties and fears,
        confront them, and fulfill their hopes in fiction if not fact. The theater, then, is one
        tool whereby people define and understand their world or escape from unpleasant
        realities.<br><br>
        But neither the human imitative instinct nor a penchant for fantasy by itself leads
        to an autonomous theater. Therefore, additional explanations are needed. One
        necessary condition seems to be a somewhat detached view of human problems.
        For example, one sign of this condition is the appearance of the comic vision,
        since comedy requires sufficient detachment to view some deviations from social
        norms as ridiculous rather than as serious threats to the welfare of the entire group.
        Another condition that contributes to the development of autonomous theater is the
        emergence of the aesthetic sense. For example, some early societies ceased to
        consider certain rites essential to their well-being and abandoned them,
        nevertheless, they retained as parts of their oral tradition the myths that had grown
        up around the rites and admired them for their artistic qualities rather than for their
        religious usefulness.<br><br>
      `},
     {
      text: `Paragraph 1: ✦ In seeking to describe the origins of theater, one must rely primarily on speculation, since there is little concrete evidence on which to draw. The most widely accepted theory, <strong>championed</strong> by anthropologists in the late nineteenth and early twentieth centuries, envisions theater as emerging out of myth and ritual. The process perceived by these anthropologists may be summarized briefly. During the early stages of its development, a society becomes aware of forces that appear to influence or control its food supply and well-being. Having little understanding of natural causes, it attributes both desirable and undesirable occurrences to supernatural or magical forces, and it searches for means to win the favor of these forces. Perceiving an apparent connection between certain actions performed by the group and the result it desires, the group repeats, refines and formalizes those actions into fixed ceremonies, or rituals.
        <br><br>
        `,
      question: '1. The word “championed” in the passage is closest in meaning to',
      responses: [
        {text: 'Changed', answered: 'A'},
        {text: 'Debated', answered: 'B'},
        {text: 'Created', answered: 'C'},
        {text: 'Supported', answered: 'D', correct: 'D'},
      ]
    }
    ,{
      text: `Paragraph 1: ✦ In seeking to describe the origins of theater, one must rely primarily on speculation, since there is little concrete evidence on which to draw. The most widely accepted theory, championed by anthropologists in the late nineteenth and early twentieth centuries, envisions theater as emerging out of myth and ritual. The process perceived by these anthropologists may be summarized briefly. During the early stages of its development, a society becomes aware of forces that appear to influence or control its food supply and well-being. Having little understanding of natural causes, it <strong>attributes</strong> both desirable and undesirable occurrences to supernatural or magical forces, and it searches for means to win the favor of these forces. Perceiving an apparent connection between certain actions performed by the group and the result it desires, the group repeats, refines and formalizes those actions into fixed ceremonies, or rituals.
        <br><br>
        `,
      question: '2. The word “attributes” in the passage is closest in meaning to',
      responses: [
        {text: 'Ascribes', answered: 'A', correct: 'A'},
        {text: 'Leaves', answered: 'B'},
        {text: 'Limits', answered: 'C'},
        {text: 'Contrasts', answered: 'D'},
      ]
    },
    {
      text: `Paragraph 1: ✦ In seeking to describe the origins of theater, one must rely primarily on speculation, since there is little concrete evidence on which to draw. The most widely accepted theory, championed by anthropologists in the late nineteenth and early twentieth centuries, envisions theater as emerging out of myth and ritual. The process perceived by these anthropologists may be summarized briefly. During the early stages of its development, a society becomes aware of forces that appear to influence or control its food supply and well-being. Having little understanding of natural causes, it attributes both desirable and undesirable occurrences to supernatural or magical forces, and it searches for means to win the favor of these forces. Perceiving an apparent connection between certain actions performed by the group and the result it desires, the group repeats, refines and formalizes those actions into fixed ceremonies, or rituals.
        <br><br>
        `,
      question: '3. According to paragraph 1, theories of the origins of theater',
      responses: [
        {text: 'Are mainly hypothetical', answered: 'A', correct: 'A'},
        {text: 'Are well supported by factual evidence', answered: 'B'},
        {text: 'Have rarely been agreed upon by anthropologists', answered: 'C'},
        {text: 'Were expressed in the early stages of theater’s development', answered: 'D'},
      ]
    },
    {
      text: `Paragraph 1: ✦ In seeking to describe the origins of theater, one must rely primarily on speculation, since there is little concrete evidence on which to draw. The most widely accepted theory, championed by anthropologists in the late nineteenth and early twentieth centuries, envisions theater as emerging out of myth and ritual. The process perceived by these anthropologists may be summarized briefly. During the early stages of its development, a society becomes aware of forces that appear to influence or control its food supply and well-being. Having little understanding of natural causes, it attributes both desirable and undesirable occurrences to supernatural or magical forces, and it searches for means to win the favor of these forces. Perceiving an apparent connection between certain actions performed by the group and the result it desires, the group repeats, refines and formalizes those actions into fixed ceremonies, or rituals.
        <br><br>
        `,
      question: '4. According to paragraph 1, why did some societies develop and repeat ceremonial actions?',
      responses: [
        {text: 'To establish a positive connection between the members of the society', answered: 'A'},
        {text: 'To help society members better understand the forces controlling their food supply', answered: 'B'},
        {text: 'To distinguish their beliefs from those of other societies', answered: 'C'},
        {text: 'To increase the society’s prosperity', answered: 'D', correct: 'D'},
      ]
    },
      {
      text: `Paragraph 2: ✦ Stories (myths) may then grow up around a ritual. Frequently the myths include representatives of those supernatural forces that the rites celebrate or hope to influence. Performers may wear costumes and masks to represent the mythical characters or supernatural forces in the rituals or in accompanying celebrations. As a person becomes more sophisticated, its conceptions of supernatural forces and causal relationships may change. As a result, it may abandon or modify some rites. But the myths that have grown up around the rites may continue as part of the group’s oral tradition and may even come to be acted out under conditions divorced from these rites. When <strong>this</strong> occurs, the first step has been taken toward theater as an autonomous activity, and thereafter entertainment and aesthetic values may gradually replace the former mystical and socially efficacious concerns.
        <br><br>
        `,
      question: '5. The word “this” in the passage refers to',
      responses: [
        {text: 'The acting out of rites', answered: 'A'},
        {text: 'The divorce of ritual performers from the rest of society', answered: 'B'},
        {text: 'The separation of myths from rites', answered: 'C', correct: 'C'},
        {text: 'The celebration of supernatural forces', answered: 'D'},
      ]
    },
    {
      text: `Paragraph 2: ✦ Stories (myths) may then grow up around a ritual. Frequently the myths include representatives of those supernatural forces that the rites celebrate or hope to influence. Performers may wear costumes and masks to represent the mythical characters or supernatural forces in the rituals or in accompanying celebrations. As a person becomes more sophisticated, its conceptions of supernatural forces and causal relationships may change. As a result, it may abandon or modify some rites. But the myths that have grown up around the rites may continue as part of the group’s oral tradition and may even come to be acted out under conditions divorced from these rites. When this occurs, the first step has been taken toward theater as an <strong>autonomous</strong> activity, and thereafter entertainment and aesthetic values may gradually replace the former mystical and socially efficacious concerns.
        <br><br>
        `,
      question: '6. The word “autonomous” in the passage is closest in meaning to',
      responses: [
        {text: 'Artistic', answered: 'A'},
        {text: 'Important', answered: 'B'},
        {text: 'Independent', answered: 'C', correct: 'C'},
        {text: 'Established', answered: 'D'},
      ]
    },
    {
      text: `Paragraph 2: ✦ Stories (myths) may then grow up around a ritual. Frequently the myths include representatives of those supernatural forces that the rites celebrate or hope to influence. Performers may wear costumes and masks to represent the mythical characters or supernatural forces in the rituals or in accompanying celebrations. As a person becomes more sophisticated, its conceptions of supernatural forces and causal relationships may change. As a result, it may abandon or modify some rites. But the myths that have grown up around the rites may continue as part of the group’s oral tradition and may even come to be acted out under conditions divorced from these rites. When this occurs, the first step has been taken toward theater as an autonomous activity, and thereafter entertainment and aesthetic values may gradually replace the former mystical and socially efficacious concerns.
        <br><br>
        `,
      question: '7. According to paragraph 2, what may cause societies to abandon certain rites?',
      responses: [
        {text: 'Emphasizing theater as entertainment', answered: 'A'},
        {text: 'Developing a new understanding of why events occur', answered: 'B', correct: 'B'},
        {text: 'Finding a more sophisticated way of representing mythical characters', answered: 'C'},
        {text: 'Moving from a primarily oral tradition to a more written tradition', answered: 'D'},
      ]
    },
    {
      text: `Paragraph 5: ✦ In addition to exploring the possible antecedents of theater, scholars have also theorized about the motives that led people to develop theater. Why did theater develop, and why was it valued after it ceased to fulfill the function of ritual? Most answers fall back on the theories about the human mind and basic human needs. One, set forth by Aristotle in the fourth century B.C., sees humans as naturally imitative—as taking pleasure in imitating persons, things, and actions and in seeing such imitations. Another, advanced in the twentieth century, suggests that humans have a gift for fantasy, through which they seek to reshape reality into more satisfying forms than those encountered in daily life. Thus, fantasy or fiction (of which drama is one form) permits people to objectify their anxieties and fears, confront them, and fulfill their hopes in fiction if not fact. The theater, then, is one tool whereby people define and understand their world or escape from unpleasant realities.
        <br><br>
        `,
      question: '8. All of following are mentioned in paragraph 5 as possible reasons that led societies to develop theater EXCEPT',
      responses: [
        {text: 'Theater allows people to face that they are afraid of.', answered: 'A'},
        {text: 'Theater gives an opportunity to imagine a better reality.', answered: 'B'},
        {text: 'Theater is a way to enjoy imitating other people.', answered: 'C'},
        {text: 'Theater provides people the opportunity to better understand the human mind.', answered: 'D', correct: 'D'},
      ]
    },
    {
      text: `Paragraph 5: ✦ In addition to exploring the possible antecedents of theater, scholars have also theorized about the motives that led people to develop theater. Why did theater develop, and why was it valued after it ceased to fulfill the function of ritual? Most answers fall back on the theories about the human mind and basic human needs. One, set forth by Aristotle in the fourth century B.C., sees humans as naturally imitative—as taking pleasure in imitating persons, things, and actions and in seeing such imitations. Another, advanced in the twentieth century, suggests that humans have a gift for fantasy, through which they seek to reshape reality into more satisfying forms than those encountered in daily life. Thus, fantasy or fiction (of which drama is one form) permits people to objectify their anxieties and fears, confront them, and fulfill their hopes in fiction if not fact. The theater, then, is one tool whereby people define and understand their world or escape from unpleasant realities.
        <br><br>
        `,
      question: '9. Which of the following best describes the organization of paragraph 5?',
      responses: [
        {text: 'The author presents two theories for a historical phenomenon.', answered: 'A', correct: 'A'},
        {text: 'The author argues against theories expressed earlier in the passage.', answered: 'B'},
        {text: 'The author argues for replacing older theories with a new one.', answered: 'C'},
        {text: 'The author points out problems with two popular theories.', answered: 'D'},
      ]
    },
    {
      text: `Paragraph 6: ✦ But neither the human imitative instinct nor a <strong>penchant</strong> for fantasy by itself leads to an autonomous theater. Therefore, additional explanations are needed. One necessary condition seems to be a somewhat detached view of human problems. For example, one sign of this condition is the appearance of the comic vision, since comedy requires sufficient detachment to view some deviations from social norms as ridiculous rather than as serious threats to the welfare of the entire group. Another condition that contributes to the development of autonomous theater is the emergence of the aesthetic sense. For example, some early societies ceased to consider certain rites essential to their well-being and abandoned them, nevertheless, they retained as parts of their oral tradition the myths that had grown up around the rites and admired them for their artistic qualities rather than for their religious usefulness.
        <br><br>
        `,
      question: '10. The word “penchant ” in the passage is closest in meaning to',
      responses: [
        {text: 'Compromise', answered: 'A'},
        {text: 'Inclination', answered: 'B', correct: 'B'},
        {text: 'Tradition', answered: 'C'},
        {text: 'Respect', answered: 'D'},
      ]
    },
    {
      text: `Paragraph 6: ✦ But neither the human imitative instinct nor a penchant for fantasy by itself leads to an autonomous theater. Therefore, additional explanations are needed. One necessary condition seems to be a somewhat detached view of human problems. For example, one sign of this condition is the appearance of the comic vision, since <strong>comedy</strong> requires sufficient detachment to view some deviations from social norms as ridiculous rather than as serious threats to the welfare of the entire group. Another condition that contributes to the development of autonomous theater is the emergence of the aesthetic sense. For example, some early societies ceased to consider certain rites essential to their well-being and abandoned them, nevertheless, they retained as parts of their oral tradition the myths that had grown up around the rites and admired them for their artistic qualities rather than for their religious usefulness.
        <br><br>
        `,
      question: '11. Why does the author mention “comedy”?',
      responses: [
        {text: 'To give an example of early types of theater', answered: 'A'},
        {text: 'To explain how theater helps a society respond to threats to its welfare', answered: 'B'},
        {text: 'To help explain why detachment is needed for the development of theater', answered: 'C', correct: 'C'},
        {text: 'To show how theatrical performers become detached from other members of society', answered: 'D'},
      ]
    },
        {
      text: `Paragraph 6: ✦ But neither the human imitative instinct nor a penchant for fantasy by itself leads to an autonomous theater. Therefore, additional explanations are needed. One necessary condition seems to be a somewhat detached view of human problems. <strong>For example, one sign of this condition is the appearance of the comic vision, since <strong>comedy</strong> requires sufficient detachment to view some deviations from social norms as ridiculous rather than as serious threats to the welfare of the entire group. Another condition that contributes to the development of autonomous theater is the emergence of the aesthetic sense. For example, some early societies ceased to consider certain rites essential to their well-being and abandoned them, nevertheless, they retained as parts of their oral tradition the myths that had grown up around the rites and admired them for their artistic qualities rather than for their religious usefulness.</strong>
        <br><br>
        `,
      question: '12. Which of the sentences below best expresses the essential information in the highlighted sentence in the passage? Incorrect choices change the meaning in important ways or leave out essential information.',
      responses: [
        {text: 'A society’s rites were more likely to be retained in the oral tradition if its myths were admired for artistic qualities.', answered: 'A'},
        {text: 'The artistic quality of a myth was sometimes an essential reason for a society to abandon it from the oral tradition.', answered: 'B'},
        {text: 'Some early societies stopped using myths in their religious practices when rites ceased to be seen as useful for social well-being.', answered: 'C'},
        {text: 'Myths sometimes survived in a society’s tradition because of their artistic qualities even after they were no longer deemed religiously beneficial.', answered: 'D', correct: 'D'},
      ]
    },
    ////////////////////////////////////////////////////////////////
    {
      text: `<span class="TEXT2A">[▇]</span>Although origin in ritual has long been the most popular, it is by no means the only theory about how the theater came into being.<span class="TEXT2B">[▇]</span> Storytelling has been proposed as one alternative.<span class="TEXT2C">[▇]</span> Under this theory, relating and listening to stories are seen as fundamental human pleasures.<span class="TEXT2D">[▇]</span> Thus, the recalling of an event (a hunt, battle, or other feat) is elaborated through the narrator’s pantomime and impersonation and eventually through each role being assumed by a different person.
        <br><br>
        `,
      question: '13. Look at the four squares [▇] that indicate where the following sentence could be added to the passage. Where would the sentence best fit?',
      responses: [
        {text: 'To enhance their listeners’ enjoyment, storytellers continually make their stories more engaging and memorable.', answered: 'D', correct: 'D'},
      ]
    },
    //////////////////////////////
     {
      text: `
        <br><br>
        `,
      question: '14. Directions: An introductory sentence for a brief summary of the passage is provided below. Complete the summary by selecting the THREE answer choices that express the most important ideas in the passage. Some sentences do not belong in the summary because they express ideas that are not presented in the passage or are minor ideas in the passage. This question is worth 2 points. Anthropologists have developed many theories to help understand why and how theater originated.',
      responses: [
        {text: 'The presence of theater in almost all societies is thought to have occurred because early storytellers traveled to different groups to tell their stories.', answered: 'A'},
        {text: 'Many theorists believe that theater arises when societies act out myths to preserve social well-being.', answered: 'B', correct: 'B'},
        {text: 'The more sophisticated societies became, the better they could influence desirable occurrences through ritualized theater.', answered: 'C'},
        {text: 'Some theories of theater development focus on how theater was used by group leaders to group leaders govern other members of society.', answered: 'D'},
        {text: 'Theater may have come from pleasure humans receive from storytelling and moving rhythmically.', answered: 'E', correct: 'E'},
        {text: 'The human capacities for imitation and fantasy are considered possible reasons why societies develop theater.', answered: 'F', correct: 'F'},

      ]
    },
    {
      text: `
        Timberline Vegetation on Mountains
        <br><br>
        The transition from forest to treeless tundra on a mountain slope is often
        a dramatic one. Within a vertical distance of just a few tens of meters, trees
        disappear as a life-form and are replaced by low shrubs, herbs, and grasses. This
        rapid zone of transition is called the upper timberline or tree line. In many semiarid
        areas there is also a lower timberline where the forest passes into steppe or desert
        at its lower edge, usually because of a lack of moisture.<br>
        The upper timberline, like the snow line, is highest in the tropics and lowest in the
        Polar Regions. It ranges from sea level in the Polar Regions to 4,500 meters in the
        dry subtropics and 3,500-4,500 meters in the moist tropics. Timberline trees are
        normally evergreens, suggesting that these have some advantage over deciduous
        trees (those that lose their leaves) in the extreme environments of the upper
        timberline. There are some areas, however, where broadleaf deciduous trees form
        the timberline. Species of birch, for example, may occur at the timberline in parts
        of the Himalayas.<br>
        At the upper timberline the trees begin to become twisted and deformed. This is
        particularly true for trees in the middle and upper latitudes, which tend
        to attain greater heights on ridges, whereas in the tropics the trees reach their
        greater heights in the valleys. This is because middle- and upper- latitude
        timberlines are strongly influenced by the duration and depth of the snow cover.
        As the snow is deeper and lasts longer in the valleys, trees tend to attain greater
        heights on the ridges, even though they are more exposed to high-velocity winds
        and poor, thin soils there. In the tropics, the valleys appear to be more favorable
        because they are less prone to dry out, they have less frost, and they have deeper
        soils.<br>
        There is still no universally agreed-on explanation for why there should be such a
        dramatic cessation of tree growth at the upper timberline. Various environmental
        factors may play a role. Too much snow, for example, can smother trees, and
        avalanches and snow creep can damage or destroy them. Late-lying snow reduces
        the effective growing season to the point where seedlings cannot establish
        themselves. Wind velocity also increases with altitude and may cause serious stress
        for trees, as is made evident by the deformed shapes at high altitudes.Some
        scientists have proposed that the presence of increasing levels of ultraviolet light
        with elevation may play a role, while browsing and grazing animals like the ibex
        may be another contributing factor. Probably the most important environmental
        factor is temperature, for if the growing season is too short and temperatures are
        too low, tree shoots and buds cannot mature sufficiently to survive the winter
        months.<br>
        Above the tree line there is a zone that is generally called alpine
        tundra. Immediately adjacent to the timberline, the tundra consists of a fairly
        complete cover of low-lying shrubs, herbs, and grasses, while higher up the
        number and diversity of species decrease until there is much bare ground with
        occasional mosses and lichens and some prostrate cushion plants. Some plants can
        even survive in favorable microhabitats above the snow line. The highest plants in
        the world occur at around 6,100 meters on Makalu in the Himalayas. At this great
        height, rocks, warmed by the sun, melt small snowdrifts.<br>
        The most striking characteristic of the plants of the alpine zone is their low growth
        form. This enables them to avoid the worst rigors of high winds and permits them
        to make use of the higher temperatures immediately adjacent to the ground surface.
        In an area where low temperatures are limiting to life, the importance of the
        additional heat near the surface is crucial. The low growth form can also permit the
        plants to take advantage of the insulation provided by a winter snow cover. In the
        equatorial mountains the low growth form is less prevalent.<br>
    `,
    },
    {
      text: `Paragraph 1: ✦ The transition from forest to treeless tundra on a mountain slope is often a <strong>dramatic</strong> one. Within a vertical distance of just a few tens of meters, trees disappear as a life-form and are replaced by low shrubs, herbs, and grasses. This rapid zone of transition is called the upper timberline or tree line. In many semiarid areas there is also a lower timberline where the forest passes into steppe or desert at its lower edge, usually because of a lack of moisture.
        <br><br>
        `,
      question: '1. The word “dramatic” in the passage is closest in meaning to',
      responses: [
        {text: 'Gradual', answered: 'A'},
        {text: 'Complex', answered: 'B'},
        {text: 'Visible', answered: 'C'},
        {text: 'Striking', answered: 'D', correct: 'D'},
      ]
    },
    {
      text: `Paragraph 1: ✦ The transition from forest to treeless tundra on a mountain slope is often a dramatic one. Within a vertical distance of just a few tens of meters, trees disappear as a life-form and are replaced by low shrubs, herbs, and grasses. This rapid zone of transition is called the upper timberline or tree line. In many semiarid areas there is also a lower timberline where the forest passes into steppe or desert at its lower edge, usually because of a lack of moisture.
        <br><br>
        `,
      question: '2. Where is the lower timberline mentioned in paragraph 1 likely to be found?',
      responses: [
        {text: 'In an area that has little water', answered: 'A', correct: 'A'},
        {text: 'In an area that has little sunlight', answered: 'B'},
        {text: 'Above a transition area', answered: 'C'},
        {text: 'On a mountain that has on upper timberline.', answered: 'D'},
      ]
    },
    {
      text: `Paragraph 1: ✦ The transition from forest to treeless tundra on a mountain slope is often a dramatic one. Within a vertical distance of just a few tens of meters, trees disappear as a life-form and are replaced by low shrubs, herbs, and grasses. This rapid zone of transition is called the upper timberline or tree line. In many semiarid areas there is also a lower timberline where the forest passes into steppe or desert at its lower edge, usually because of a lack of moisture.
        <br><br>
        `,
      question: '3. Which of the following can be inferred from paragraph 1 about both the upper and lower timberlines?',
      responses: [
        {text: 'Both are treeless zones.', answered: 'A'},
        {text: 'Both mark forest boundaries.', answered: 'B', correct: 'B'},
        {text: 'Both are surrounded by desert areas.', answered: 'C'},
        {text: 'Both suffer from a lack of moisture.', answered: 'D'},
      ]
    },
    {
      text: `Paragraph 3: ✦ At the upper timberline the trees begin to become twisted and deformed. This is particularly true for trees in the middle and upper latitudes, which tend to <strong>attain</strong> greater heights on ridges, whereas in the tropics the trees reach their greater heights in the valleys. This is because middle- and upper- latitude timberlines are strongly influenced by the duration and depth of the snow cover. As the snow is deeper and lasts longer in the valleys, trees tend to attain greater heights on the ridges, even though they are more exposed to high-velocity winds and poor, thin soils there. In the tropics, the valleys appear to be more favorable because they are less prone to dry out, they have less frost, and they have deeper soils.
        <br><br>
        `,
      question: '4. The word “attain” in the passage is closest in meaning to',
      responses: [
        {text: 'Require', answered: 'A'},
        {text: 'Resist', answered: 'B'},
        {text: 'Achieve', answered: 'C', correct: 'C'},
        {text: 'Endure', answered: 'D'},
      ]
    },
    {
      text: `Paragraph 3: ✦ At the upper timberline the trees begin to become twisted and deformed. This is particularly true for trees in the middle and upper latitudes, which tend to attain greater heights on ridges, whereas in the tropics the trees reach their greater heights in the valleys. This is because middle- and upper- latitude timberlines are strongly influenced by the duration and depth of the snow cover. As the snow is deeper and lasts longer in the valleys, trees tend to attain greater heights on the ridges, even though they are more exposed to high-velocity winds and poor, thin soils there. In the tropics, the valleys appear to be more favorable because they are less prone to dry out, they have less frost, and they have deeper soils.
        <br><br>
        `,
      question: '5. According to paragraph 3, which of the following is true of trees in the middle and upper latitudes?',
      responses: [
        {text: 'Tree growth is negatively affected by the snow cover in valleys', answered: 'A', correct: 'A'},
        {text: 'Tree growth is greater in valleys than on ridges.', answered: 'B'},
        {text: 'Tree growth on ridges is not affected by high-velocity winds.', answered: 'C'},
        {text: 'Tree growth lasts longer in those latitudes than it does in the tropics.', answered: 'D'},
      ]
    },
    {
      text: `Paragraph 4: ✦ There is still no universally agreed-on explanation for why there should be such a dramatic cessation of tree growth at the upper timberline. Various environmental factors may play a role. Too much snow, for example, can smother trees, and avalanches and snow creep can damage or destroy them. Late-lying snow reduces the effective growing season to the point where seedlings cannot establish themselves. <strong>Wind velocity also increases with altitude and may cause serious stress for trees, as is made evident by the deformed shapes at high altitudes.</strong> Some scientists have proposed that the presence of increasing levels of ultraviolet light with elevation may play a role, while browsing and grazing animals like the ibex may be another contributing factor. Probably the most important environmental factor is temperature, for if the growing season is too short and temperatures are too low, tree shoots and buds cannot mature sufficiently to survive the winter months.
        <br><br>
        `,
      question: '6. Which of the sentences below best express the essential information in the highlighted sentence in the passage? In correct choices change the meaning in important ways or leave out essential information.',
      responses: [
        {text: 'Because of their deformed shapes at high altitudes, trees are not likely to be seriously harmed by the strong winds typical of those altitudes.', answered: 'A'},
        {text: 'As altitude increases, the velocity of winds increase, leading to a serious decrease in the number of trees found at high altitudes.', answered: 'B'},
        {text: 'The deformed shapes of trees at high altitudes show that wind velocity, which increase with altitude, can cause serious hardship for trees.', answered: 'C', correct: 'C'},
        {text: 'Increased wind velocity at high altitudes deforms the shapes of trees, and this may cause serious stress for trees.', answered: 'D'},
      ]
    },
    {
      text: `Paragraph 4: ✦ There is still no universally agreed-on explanation for why there should be such a dramatic cessation of tree growth at the upper timberline. Various environmental factors may play a role. Too much snow, for example, can smother trees, and avalanches and snow creep can damage or destroy them. Late-lying snow reduces the effective growing season to the point where seedlings cannot establish themselves. Wind velocity also increases with altitude and may cause serious stress for trees, as is made evident by the deformed shapes at high altitudes. Some scientists have proposed that the presence of increasing levels of ultraviolet light with elevation may play a role, while browsing and grazing animals like the ibex may be another contributing factor. Probably the most important environmental factor is temperature, for if the growing season is too short and temperatures are too low, tree shoots and buds cannot mature sufficiently to survive the winter months.
        <br><br>
        `,
      question: '7. In paragraph 4, what is the author’s main purpose in the discussion of the dramatic cessation of tree growth at the upper timberline?',
      responses: [
        {text: 'To argue that none of several environment factors that are believed to contribute to that phenomenon do in fact play a role in causing it.', answered: 'A'},
        {text: 'To argue in support of one particular explanation of that phenomenon against several competing explanations', answered: 'B'},
        {text: 'To explain why the primary environmental factor responsible for that phenomenon has not yet been identified', answered: 'C'},
        {text: 'To present several environmental factors that may contribute to a satisfactory explanation of that phenomenon', answered: 'D', correct: 'D'},
      ]
    },
    {
      text: `Paragraph 6: ✦ The most striking characteristic of the plants of the alpine zone is their low growth form. This enables them to avoid the worst rigors of high winds and permits them to make use of the higher temperatures immediately adjacent to the ground surface. In an area where low temperatures are limiting to life, the importance of the additional heat near the surface is crucial. The low growth form can also permit the plants to take advantage of the insulation provided by a winter snow cover. In the equatorial mountains the low growth form is less prevalent.
        <br><br>
        `,
      question: '8. According to paragraph 6, all of the following statements are true of plants in the alpine zone EXCEPT:',
      responses: [
        {text: 'Because they are low, they are less exposed to strong winds.', answered: 'A'},
        {text: 'Because they are low, the winter snow cover gives them more protection from the extreme cold.', answered: 'B'},
        {text: 'In the equatorial mountains, they tend to be lower than in mountains elsewhere.', answered: 'C', correct: 'C'},
        {text: 'Their low growth form keeps them closer to the ground, where there is more heat than further up', answered: 'D'},
      ]
    },
    {
      text: `Above the tree line there is a zone that is generally called alpine tundra.<span class="TEXT3A">[▇]</span>Immediately adjacent to the timberline, the tundra consists of a fairly complete cover of low-lying shrubs, herbs, and grasses, while higher up the number and diversity of species decrease until there is much bare ground with occasional mosses and lichens and some prostrate cushion plants.<span class="TEXT3B">[▇]</span> Some plants can even survive in favorable microhabitats above the snow line. The highest plants in the world occur at around 6,100 meters on Makalu in the Himalayas.<span class="TEXT3C">[▇]</span> t this great height, rocks, warmed by the sun, melt small snowdrifts.<span class="TEXT3D">[▇]</span>
        <br><br>
        `,
      question: '9. Look at the four squares [▇] that indicate where the following sentence could be added to the passage. Where would the sentence best fit?',
      responses: [
        {text: 'This explains how, for example, alpine cushion plants have been found growing at an altitude of 6,180 meters.', answered: 'D', correct: 'D'},
      ]
    },
    {
      text: `
        `,
      question: '10.Directions: An introductory sentence for a brief summary of the passage is provided below. Complete the summary by selecting the THREE answer choices that express the most important ideas in the passage. Some sentences do not belong in the summary because they express ideas that are not presented in the passage or are minor ideas in the passage. This question is worth 2 points. At the timberline, whether upper or lower, there is a profound change in the growth of trees and other plants.',
      responses: [
        {text: 'Birch is one of the few species of tree that can survive in the extreme environments of the upper timberline.', answered: 'A'},
        {text: 'There is no agreement among scientists as to exactly why plant growth is sharply different above and below the upper timberline.', answered: 'B', correct: 'B'},
        {text: 'The temperature at the upper timberline is probably more important in preventing tree growth than factors such as the amount of snowfall or the force of winds.', answered: 'C', correct: 'C'},
        {text: 'The geographical location of an upper timberline has an impact on both the types of trees found there and their physical characteristics.', answered: 'D', correct: 'D'},
        {text: 'High levels of ultraviolet light most likely play a greater role in determining tree growth at the upper timberline than do grazing animals such as the ibex.', answered: 'E'},
        {text: 'Despite being adjacent to the timberline, the alpine tundra is an area where certain kinds of low trees can endure high winds and very low temperatures.', answered: 'F'},

      ]
    },
  ]
};

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
    data() {
     return {
        countDown : 3240,
        response1: '',
        response2: '',
        questionIndexDecrementByText: 3,
        scrolledToBottom: false,
        quiz: quiz_tpo_01,
        correctedAnwsers: ['C', 'C', 'B', 'D','D', 'A', 'A', 'A', 'C', 'B', 'D', 'A', 'D', 'A', 'B', 'C', 'D', 'A','D','D','D','D','D','D','D','D','D','D','D','D','D','D','D','D'],
        selected: [''],
        showResults: false,
        questionIndex: 0,
        userResponses: Array(quiz_tpo_01.questions.length).fill(false),
     }
    }, methods: {
    consoleFilter(response, answered) {
      if(this.questionIndex === 15){
           if(old_value_text_one.includes(answered)){
               old_value_text_one = old_value_text_one.filter(e => e !== answered)
           }else{
               old_value_text_one.push(...answered)
           }
          this.selected[this.questionIndex-2] = old_value_text_one;
      }else if(this.questionIndex === 30){
           if(old_value_text_two.includes(answered)){
               old_value_text_two = old_value_text_two.filter(e => e !== answered)
           }else{
               old_value_text_two.push(...answered)
           }
          this.selected[this.questionIndex-2] = old_value_text_two;
      }else if(this.questionIndex === 41){
           if(old_value_text_three.includes(answered)){
               old_value_text_three = old_value_text_three.filter(e => e !== answered)
           }else{
               old_value_text_three.push(...answered)
           }
          this.selected[this.questionIndex-2] = old_value_text_three;
      }
     else if(this.questionIndex != 0 && this.questionIndex != 1/*  && this.questionIndex != 16 */){
          this.selected[this.questionIndex-2] = answered;
      }
      this.$forceUpdate();
    },
    onChange(){

    },
    insertText(){
         $(".A").unbind().click(function() {
            $(".A").html('<strong>What, then, determines what proportion of the water stays and what proportion drains away?</strong>');
            if($(".B").text().length > 3 || $(".C").text().length > 3 || $(".D").text().length > 3){
                $(".B").html('[▇]');
                $(".C").html('[▇]');
                $(".D").html('[▇]');
            }
            response_text_one = 'A';
        });

         $(".B").unbind().click(function() {
            $(".B").html('<strong>What, then, determines what proportion of the water stays and what proportion drains away?</strong>');
            if($(".A").text().length > 3 || $(".C").text().length > 3 || $(".D").text().length > 3 ){
                $(".A").html('[▇]');
                $(".C").html('[▇]');
                $(".D").html('[▇]');
            }
            response_text_one = 'B';
        });

        $(".C").unbind().click(function() {
            $(".C").html('<strong>What, then, determines what proportion of the water stays and what proportion drains away?</strong>');
            if($(".A").text().length > 3 || $(".B").text().length > 3 || $(".D").text().length > 3){
                $(".A").html('[▇]');
                $(".B").html('[▇]');
                $(".D").html('[▇]');
            }
            response_text_one = "C"
        });

        $(".D").unbind().click(function() {
            $(".D").html('<strong>What, then, determines what proportion of the water stays and what proportion drains away?</strong>');
            if($(".A").text().length > 3 || $(".B").text().length > 3 || $(".C").text().length > 3){
                $(".A").html('[▇]');
                $(".B").html('[▇]');
                $(".C").html('[▇]');
            }
            response_text_one = "D"
        });
        this.selected[12] = response_text_one;

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
      if(old_value_text_one.length > 3 || old_value_text_two.length > 3 || old_value_text_three > 3){
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
       var toefl_score = [0, 1, 2, 3, 4, 5, 6, 6, 7, 8, 9, 10, 11, 11, 12, 13, 14, 15, 15, 16, 17, 18, 19, 19, 20, 20, 21, 22, 23, 24, 24, 25, 26, 27, 28, 28, 29, 30]
       var l = this.userResponses.filter(function(val) { if(val !== true) { return val}}).length
       return toefl_score[l]
    }
  },mounted () {
    this.countDownTimer();
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
  watch : {
    timeIsOver: function () {
        if(this.countDown < 1){
          alert("Time is over")
          this.saveDatabase(score);
          this.$router.push('/scoreboard');
        }
      }
  }
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

