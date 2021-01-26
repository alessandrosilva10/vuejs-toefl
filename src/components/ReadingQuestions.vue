<template>
<div id="app">
    <Navbar v-show="questionIndex === quiz.questions.length"/>
  <!--<h1>{{ quiz.title }}</h1>-->
  <!-- index is used to check with current question index -->
  <div v-for="(question, index) in quiz.questions" :key="index">
    <!-- Hide all questions, show only the one with index === to current question index -->
    <div v-show="index === questionIndex">
        <v-row>
          <v-col class="button-position-screen" col="2">
            <v-btn class="v-btn" v-if="questionIndex > 0" v-on:click="prev">
                    Previous
            </v-btn >
            <v-btn class="v-btn" v-on:click="next">
                    Next
            </v-btn >
          </v-col>
      </v-row>
      <v-row>
    <v-col class="answers-col" col="6">
      <ol type="A">
        <li v-for="response in question.responses">
          <label>
            <!-- The radio button has three new directives -->
            <!-- v-bind:value sets "value" to "true" if the response is correct -->
            <!-- v-bind:name sets "name" to question index to group answers by question -->
            <!-- v-model creates binding with userResponses -->
            <input type="radio"
                   v-bind:value="response.correct"
                   v-bind:name="index"
                   v-model="userResponses[index]"> {{response.text}}
          </label>
        </li>
      </ol>
      <!-- The two navigation buttons -->
      <!-- Note: prev is hidden on first question -->
      </v-col>
        <v-col class="text-col" col="6">
         <span class="justify" v-html="question.text">
        </span>
        </v-col>
      </v-row>
    </div>
  </div>
  <div v-show="questionIndex === quiz.questions.length">
    <h2>
    Quiz finished
  </h2>
    <p>
      Total score: {{ score() }} / {{ quiz.questions.length - 2 }}
    </p>
    <v-btn @click="saveDatabase(quiz.questions.length - 2)"> Save scores?</v-btn>

  </div>
</div>
</template>
<script>
import Navbar from '@/components/Navbar';

var quiz = {
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
to hold all this water.
The necessary space is there, however, in many forms. The commonest spaces are
those among the particles—sand grains and tiny pebbles—of loose, unconsolidated
sand and gravel. Beds of this material, out of sightbeneath the soil, are common.
They are found wherever fast rivers carrying loads of coarse sediment once flowed.
For example, as the great ice sheets that covered North America during the last ice
age steadily melted away, huge volumes of water flowed from them. The water
was always laden with pebbles, gravel, and sand, known as glacial outwash, that
was deposited as the flow slowed down.
The same thing happens to this day, though on a smaller scale, wherever a
sediment-laden river or stream emerges from a mountain valley onto relatively flat
land, dropping its load as the current slows: the water usually spreads out fanwise,
depositing the sediment in the form of a smooth, fan-shaped slope. Sediments are
also dropped where a river slows on entering a lake or the sea, the deposited
sediments are on a lake floor or the seafloor at first, but will be located inland at
some future date, when the sea level falls or the land rises; such beds are
sometimes thousands of meters thick.
TPO Reading Passages (www.ZabanExam.com)
[14]
In lowland country almost any spot on the ground may overlie what was once the
bed of a river that has since become buried by soil; if they are now below the
water’s upper surface (the water table), the gravels and sands of the former
riverbed, and its sandbars, will be saturated with groundwater.
So much for unconsolidated sediments. Consolidated (or cemented) sediments, too,
contain millions of minute water-holding pores. This is because the gaps among
the original grains are often not totally pluggedwith cementing chemicals; also,
parts of the original grains may become dissolved by percolating groundwater,
either while consolidation is taking place or at any time afterwards. The result is
that sandstone, for example, can be as porous as the loose sand from which it was
formed.
Thus a proportion of the total volume of any sediment, loose or cemented, consists
of empty space. Most crystalline rocks are much more solid; a common exception
is basalt, a form of solidified volcanic lava, which is sometimes full of tiny bubbles
that make it very porous.
The proportion of empty space in a rock is known as its porosity. But note that
porosity is not the same as permeability, which measures the ease with which
water can flow through a material; this depends on the sizes of the individual
cavities and the crevices linking them.
Much of the water in a sample of water-saturated sediment or rock will drain from
it if the sample is put in a suitable dry place. But some will remain, clinging to all
solid surfaces. It is held there by the force of surface tension without which water
would drain instantly from any wet surface, leaving it totally dry. The total volume
of water in the saturated sample must therefore be thought of as consisting of water
that can, and water that cannot, drain away.
TPO Reading Passages (www.ZabanExam.com)
[15]
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
      text: `
      Paragraph 1: ✦ Ordinary meteoric water is water that has soaked into the ground
        from the surface, from precipitation (rain and snow) and from lakes and streams.
        There it remains, sometimes for long periods, before emerging at the surface again.
        At first thought it seems incredible that there can be enough space in the “solid”
        ground underfoot to hold all this water.

        <br><br>
        2. The word <strong>“incredible”<strong> in the passage is closest in meaning to
      `,
      responses: [
        {text: 'confusing'},
        {text: 'comforting', correct: true},
        {text: 'unbelievable'},
        {text: 'interesting'},
      ]
    }, {
      text: "Question 2",
      responses: [
        {text: 'Right answer', correct: true},
        {text: 'Wrong answer'},
        {text: 'Right answer', },
        {text: 'Wrong answer'},
      ]
    }
  ]
};

export default {
        components: {
        Navbar
    },
    data() {
     return {
        scrolledToBottom: false,
        quiz: quiz,
        selected: '',
        // Store current question index
        questionIndex: 0,
        // An array initialized with "false" values for each question
        // It means: "did the user answered correctly to the question n?" "no".
        userResponses: Array(quiz.questions.length).fill(false)
     }
    }, methods: {
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
      this.questionIndex++;
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
