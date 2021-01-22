<template>
<div class="main">
  <v-card flat class="text-center"
  >
  <v-responsive class="pt-4">
    <img
        :src="thumbnail"
        width=80%
        height= auto
        display=block
        margin= 0 auto
      >
    </v-responsive>
    <v-list-item three-line>
      <v-list-item-content>
            <v-card-text>
              <div class="subheading">{{ name }}</div>
              <div class="grey--text">{{ lecture}}</div>
            </v-card-text>
      </v-list-item-content>
    </v-list-item>
    <v-card-actions>
    <v-tooltip top>
        <template v-slot:activator="{ on, attrs }">
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
        <span>Open the lesson? Let's study now?</span>
    </v-tooltip>
        <v-tooltip top>
        <template v-slot:activator="{ on, attrs }">
            <v-icon class="like-button-up" v-bind="attrs"
            v-on="on" @click="likes += 1" normal left>mdi-thumb-up
            </v-icon>
        </template>
        <span>Helpful</span>
        </v-tooltip>
      {{likes}}
        <v-tooltip top>
      <template v-slot:activator="{ on, attrs }">
        <v-icon class="like-button-down" v-bind="attrs"
          v-on="on" @click="likes -= 1" normal left>mdi-thumb-down-outline
        </v-icon>
      </template>
      <span>Not helpful</span>
    </v-tooltip>
    </v-card-actions>
  </v-card>
</div>
</template>

<script>
  export default {
      props: ['lecture', 'video', 'thumbnail', 'name', 'route'],
      data: () => ({
          likes: 0,
          active_helpful: false,
          active_not_helpful: false,
      }),
      methods: {
        mouseOverHelpful: function(){
            this.active_helpful = !this.active_helpful;
        },
        mouseOverNotHelpful: function(){
            this.active_not_helpful = !this.active_not_helpful;
        },
    }
  }
</script>

<style scoped>
.main{
    float: left;
    margin-left: 40px;
    margin-bottom: 50px;
    border: 0.1px solid;
}

.main:hover {
  transform: scale(1.1); /* (150% zoom - Note: if the zoom is too large, it will go outside of the viewport) */
}

.helpful{
    display: none;
}

.like-button-up:hover .helpful{
    display: block;
}

.css {
  margin: 0 auto;
  display: block;
}

.like-button-up {
    margin-left: 10px;
}
.like-button-down {
    margin-left: 10px;
}
</style>
