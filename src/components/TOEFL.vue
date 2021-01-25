<template>
    <v-row>
<v-col v-for="(tpo, i) in tpos" :key="i" cols="4">
  <v-card flat class="text-center main" >
  <v-responsive class="pt-4">
    <img
        src="https://d2cyt36b7wnvt9.cloudfront.net/exams/wp-content/uploads/2020/07/09233814/TOEFL-Reading-Practice-600x400.png"
        width=70%
        height= auto
        display=block
        margin= 0 auto
      >
    </v-responsive>
    <v-list-item three-line>
      <v-list-item-content>
            <v-card-text>
               <h1 class="grey--text">TPO{{++i}}</h1>
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
        LET'S GET STARTED
      </v-btn>
        </template>
        <span>Are you ready?</span>
    </v-tooltip>
        <v-tooltip top>
        <template v-slot:activator="{ on, attrs }">
            <v-icon class="like-button-up" v-bind="attrs"
            v-on="on" @click="like()" normal left>mdi-thumb-up
            </v-icon>
        </template>
        <span>Helpful</span>
        </v-tooltip>
        {{likes}}
        <v-tooltip top>
      <template v-slot:activator="{ on, attrs }">
        <v-icon class="like-button-down" v-bind="attrs"
          v-on="on" @click="dislike()" normal left>mdi-thumb-down-outline
        </v-icon>
      </template>
      <span>Not helpful</span>
    </v-tooltip>
    {{dislikes}}
    </v-card-actions>
  </v-card>
</v-col>
</v-row>
</template>
