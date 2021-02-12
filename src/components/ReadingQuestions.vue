<template>
<div id="app">
  <Navbar/>
    <Navbar v-show="questionIndex === quiz.questions.length"/>
    <div style="display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;" v-if="questionIndex-1 > 0 && questionIndex-1 < quiz.questions.length-1 && questionIndex-1 !== 15">
      <h3>Question {{(questionIndex-questionIndexDecrementByText) + 1 }} of {{quiz.questions.length-questionIndexDecrementByText}} </h3><br/> <br/> <br/>
    </div>
    <v-card min-height="1000px">
  <div v-show="selected.length === 2">
    <table  v-show="questionIndex === quiz.questions.length">
      <tr v-for="(s, i) in selected" :key="i">
        <th v-if="selected[i] != 'Not Answered'">Resposta escolhida: {{selected[i]}}</th>
        <th v-else-if="selected[i] == 'Not Answered'">Resposta escolhida: 'Not Answered'</th>
        <th>Right anwer: {{correctedAnwsers[i]}}</th>
      </tr>
    </table>
  </div>
  <h1 v-show="showResults && questionIndex > 1"> Resposta certa: {{correctedAnwsers[questionIndex-2]}}</h1>
  <!--<v-btn v-show="questionIndex > 1 && questionIndex < 4" @click="showResults = !showResults">Show answer</v-btn>-->
  <!--<h1>{{ quiz.title }}</h1>-->
  <!-- index is used to check with current question index -->
  <div v-for="(question, index) in quiz.questions" :key="index">
    <!-- Hide all questions, show only the one with index === to current question index -->
    <div v-show="index === questionIndex">
    <v-row>
    <br><br><br>
    <v-col class="answers-col" col="10">
      <v-col col="2"><span class="justify" v-html="question.question"/></v-col>
      <ol type="A">
        <li v-for="(response, i) in question.responses" :key="i">
          <label>
            <input type="radio"
              style="   border: 0px;
              width: 10%;
              height: 2em;"
              @change="consoleFilter(response.correct, response.answered)"
                v-bind:value="response.correct"
                v-bind:name="index"
                v-model="userResponses[index]"> {{response.text}}
          </label>
        </li>
      </ol>
      </v-col>
        <v-col class="text-col" col="10">
         <span class="justify" v-html="question.text">
        </span>
        </v-col>
      </v-row><v-row>
          <v-col class="button-position-screen" col="2">
            <v-btn class="v-btn" v-if="questionIndex > 0" v-on:click="prev">
                    Previous
            </v-btn >
            <v-btn class="v-btn" v-on:click="next">
                    Next
            </v-btn >
          </v-col>
    </v-row>
    </div>
  </div>
  <div v-show="questionIndex === quiz.questions.length">
    <h2>
    Quiz finished
  </h2>
    <p>
      Total score: {{ score() }} / {{ quiz.questions.length - questionIndexDecrementByText }}
    </p>
    <v-btn @click="saveDatabase(quiz.questions.length - 2)"> Save scores?</v-btn>
  </div>
</v-card>
</div>
</template>
<script>
import Navbar from '@/components/Navbar';
import Vtabs from '@/components/Vtabs';

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
        {text: 'Like sandstone, basalt is a crystalline rock that is very porous.', answered: 'D'},
        {text: 'Beds of unconsolidated sediments are typically located at inland sites that were once underwater.', answered: 'D'},
      ]
    },{
      text: `
        Desert Formation
        <br><br>
        The deserts, which already occupy approximately a fourth of the Earth's land
        surface, have in recent decades been increasing at an alarming pace. The expansion
        of desert-like conditions into areas where they did not previously exist is called
        desertification. It has been estimated that an additional one-fourth of the Earth's
        land surface is threatened by this process.<br><br>
        Desertification is accomplished primarily through the loss of stabilizing natural
vegetation and the subsequent accelerated erosion of the soil by wind and water. In
some cases the loose soil is blown completely away, leaving a stony surface. In
other cases, the finer particles may be removed, while the sand-sized particles are
accumulated to form mobile hills or ridges of sand.<br><br>
Even in the areas that retain a soil cover, the reduction of vegetation typically
results in the loss of the soil's ability to absorb substantial quantities of water. The
impact of raindrops on the loose soil tends to transfer fine clay particles into the
tiniest soil spaces, sealing them and producing a surface that allows very little
water penetration. Water absorption is greatly reduced; consequently runoff is
increased, resulting in accelerated erosion rates. The gradual drying of the soil
caused by its diminished ability to absorb water results in the further loss of
vegetation, so that a cycle of progressive surface deterioration is established.<br><br>
In some regions, the increase in desert areas is occurring largely as the result of a
trend toward drier climatic conditions. Continued gradual global warming has
produced an increase in aridity for some areas over the past few thousand years.
The process may be accelerated in subsequent decades if global warming resulting
from air pollution seriously increases.<br><br>
There is little doubt, however, that desertification in most areas results primarily
from human activities rather than natural processes. The semiarid lands bordering
the deserts exist in a delicate ecological balance and are limited in their potential to
adjust to increased environmental pressures. Expanding populations are subjecting
the land to increasing pressures to provide them with food and fuel. In wet periods,
the land may be able to respond to these stresses. During the dry periods that are
common phenomena along the desert margins, though, the pressure on the land is
often far in excess of its diminished capacity, and desertification results.<br><br>
Four specific activities have been identified as major contributors to the
desertification processes: overcultivation, overgrazing, firewood gathering, and
overirrigation. The cultivation of crops has expanded into progressively drier
regions as population densities have grown. These regions are especially likely to
have periods of severe dryness, so that crop failures are common. Since the raising
of most crops necessitates the prior removal of the natural vegetation, crop failures
leave extensive tracts of land devoid of a plant cover and susceptible to wind and
water erosion.<br><br>
The raising of livestock is a major economic activity in semiarid lands, where
grasses are generally the dominant type of natural vegetation. The consequences of
an excessive number of livestock grazing in an area are the reduction of the
vegetation cover and the trampling and pulverization of the soil. This is usually
followed by the drying of the soil and accelerated erosion.<br><br>
Firewood is the chief fuel used for cooking and heating in many countries. The
increased pressures of expanding populations have led to the removal of woody
plants so that many cities and towns are surrounded by large areas completely
lacking in trees and shrubs. The increasing use of dried animal waste as a substitute
fuel has also hurt the soil because this valuable soil conditioner and source of plant
nutrients is no longer being returned to the land.<br><br>
The final major human cause of desertification is soil salinization resulting from
overirrigation. Excess water from irrigation sinks down into the water table. If no
drainage system exists, the water table rises, bringing dissolved salts to the surface.
The water evaporates and the salts are left behind, creating a white crustal layer
that prevents air and water from reaching the underlying soil.<br><br>
The extreme seriousness of desertification results from the vast areas of land and
the tremendous numbers of people affected, as well as from the great difficulty of
reversing or even slowing the process. Once the soil has been removed by erosion,
only the passage of centuries or millennia will enable new soil to form. In areas
where considerable soil still remains, though, a rigorously enforced program of
land protection and cover-crop planting may make it possible to reverse the present
deterioration of the surface.<br><br>
      `},
     {
      text: `Paragraph 5: ✦ There is little doubt, however, that desertification in most areas results primarily from human activities rather than natural processes. The semiarid lands bordering the deserts exist in a <strong>delicate</strong> ecological balance and are limited in their potential to adjust to increased environmental pressures. Expanding populations are subjecting the land to increasing pressures to provide them with food and fuel. In wet periods, the land may be able to respond to these stresses. During the dry periods that are common phenomena along the desert margins, though, the pressure on the land is often far in excess of its diminished capacity, and desertification results..
        <br><br>
        `,
      question: '1. The word "delicate" in the passage is closest in meaning to',
      responses: [
        {text: 'Fragile', answered: 'A', correct: 'A'},
        {text: 'Predictable', answered: 'B'},
        {text: 'Complex', answered: 'C'},
        {text: 'Valuable', answered: 'D'},
      ]
    }
    ,
  ]
};

export default {
        components: {
        Navbar, Vtabs
    },
    data() {
     return {
        questionIndexDecrementByText: 3,
        scrolledToBottom: false,
        quiz: quiz_tpo_01,
        correctedAnwsers: ['C', 'C', 'B', 'D', 'A', 'A', 'A', 'C', 'B', 'D', 'A'],
        selected: [''],
        showResults: false,
        selected22: [''],
        // Store current question index
        questionIndex: 0,
        // An array initialized with "false" values for each question
        // It means: "did the user answered correctly to the question n?" "no".
        userResponses: Array(quiz_tpo_01.questions.length).fill(false)
     }
    }, methods: {
    consoleFilter(response, answered) {
      if(typeof response !== 'undefined'){
        this.selected[this.questionIndex-2] = response;
      }else{
        this.selected[this.questionIndex-2] = answered;
      }

      if(typeof response !== 'undefined'){
        this.selected22[this.questionIndex-2] = response;
      }else{
        this.selected22[this.questionIndex-2] = 'Not answered';
      }

    },
        saveDatabase(score){
            alert(score)
            alert(this.$route.params.tpo_id)
            alert(new Date().toLocaleString())
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
      if(this.questionIndex > 1){
        if(!typeof this.selected22[this.questionIndex-2] !== "undefined"){
            this.selected22[this.questionIndex-2] = "Not Answered"
        }/*
        if(typeof this.selected[this.questionIndex-2] !== "undefined"){
          this.selected[this.questionIndex-2] = "Not Answered"
        }*/
      }this.questionIndex++;
      /*if(this.questionIndex != 15){
        this.questionIndex++;
      }*/
    },
    // Go to previous question
    prev: function() {
      this.questionIndex--;
    },
    // Return "true" count in userResponses
    score: function() {
      return this.userResponses.filter(function(val) { return val }).length;
    }
  },mounted () {

  },
  watch: function() {

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
