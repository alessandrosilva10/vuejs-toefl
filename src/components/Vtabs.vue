<template>
  <v-card>
    <v-toolbar
      flat
      color="blue"
      dark
    >
      <v-toolbar-title>TPO 1</v-toolbar-title>
    </v-toolbar>
    <v-tabs vertical @click="index">

      <v-tab v-for="t in tabs" :key="t.key" @click="getIndex(t.key)" :ref="'ref'+t.key">
        <v-icon left>
          mdi-account
        </v-icon>
        {{t.value}}
      </v-tab>
      <!--<v-tab>
        <v-icon left>
          mdi-lock
        </v-icon>
        LECTURE
      </v-tab>

      <v-tab>
        <v-icon left>
          mdi-access-point
        </v-icon>
        Question 1
      </v-tab>-->

      <v-tab-item>
        <v-card flat>
          <v-card-text>
            <p>
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

            </p>
            <v-btn @click="nextTab">Continue</v-btn>
            <!--
            <p>
              Nam ipsum risus, rutrum vitae, vestibulum eu, molestie vel, lacus. Aenean tellus metus, bibendum sed, posuere ac, mattis non, nunc. Aliquam lobortis. Aliquam lobortis. Suspendisse non nisl sit amet velit hendrerit rutrum.
            </p>

            <p class="mb-0">
              Phasellus dolor. Fusce neque. Fusce fermentum odio nec arcu. Pellentesque libero tortor, tincidunt et, tincidunt eget, semper nec, quam. Phasellus blandit leo ut odio.
            </p>-->
          </v-card-text>
        </v-card>
      </v-tab-item>

      <v-tab-item>
        <v-card flat>
          <v-card-text>
            <p>
              Morbi nec metus. Suspendisse faucibus, nunc et pellentesque egestas, lacus ante convallis tellus, vitae iaculis lacus elit id tortor. Sed mollis, eros et ultrices tempus, mauris ipsum aliquam libero, non adipiscing dolor urna a orci. Curabitur ligula sapien, tincidunt non, euismod vitae, posuere imperdiet, leo. Nunc sed turpis.
            </p>

            <p>
              Suspendisse feugiat. Suspendisse faucibus, nunc et pellentesque egestas, lacus ante convallis tellus, vitae iaculis lacus elit id tortor. Proin viverra, ligula sit amet ultrices semper, ligula arcu tristique sapien, a accumsan nisi mauris ac eros. In hac habitasse platea dictumst. Fusce ac felis sit amet ligula pharetra condimentum.
            </p>

            <p>
              Sed consequat, leo eget bibendum sodales, augue velit cursus nunc, quis gravida magna mi a libero. Nam commodo suscipit quam. In consectetuer turpis ut velit. Sed cursus turpis vitae tortor. Aliquam eu nunc.
            </p>

            <p>
              Etiam ut purus mattis mauris sodales aliquam. Ut varius tincidunt libero. Aenean viverra rhoncus pede. Duis leo. Fusce fermentum odio nec arcu.
            </p>

            <p class="mb-0">
              Donec venenatis vulputate lorem. Aenean viverra rhoncus pede. In dui magna, posuere eget, vestibulum et, tempor auctor, justo. Fusce commodo aliquam arcu. Suspendisse enim turpis, dictum sed, iaculis a, condimentum nec, nisi.
            </p>
          </v-card-text>
        </v-card>
      </v-tab-item>
      <v-tab-item>
        <v-card flat>
          <v-card-text>
            <p>
              Fusce a quam. Phasellus nec sem in justo pellentesque facilisis. Nam eget dui. Proin viverra, ligula sit amet ultrices semper, ligula arcu tristique sapien, a accumsan nisi mauris ac eros. In dui magna, posuere eget, vestibulum et, tempor auctor, justo.
            </p>

            <p class="mb-0">
              Cras sagittis. Phasellus nec sem in justo pellentesque facilisis. Proin sapien ipsum, porta a, auctor quis, euismod ut, mi. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nam at tortor in tellus interdum sagittis.
            </p>
          </v-card-text>
        </v-card>
      </v-tab-item>
    </v-tabs>
  </v-card>
</template>

<script>
//import axios from 'axios';

export default {
    name: 'Dashboard',
    components: {

    },
    data: () => ({
        currentTab: 1,
        tabs: [{key: 1, value: 'Instruction'}, {key: 2, value: 'Question 1'}, {key: 3, value: 'Question 2'}, {key: 4, value: 'Question 3'}, {key: 5, value: 'Question 4'}]
    }),
    created(){

    },
    mounted() {

    },
    computed: {

    },
    methods:{
        getIndex(id) {
            this.currentTab = id;
        },
        nextTab() {
            if(this.currentTab > 0){
                this.currentTab += 1;
                this.$refs.ref1.$el.click()
                //console.log(this.$refs.ref1.click())
            }
        }
   }
}
</script>

<style scoped>

</style>
