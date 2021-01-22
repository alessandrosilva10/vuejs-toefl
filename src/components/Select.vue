<template>
  <v-container fluid>
    <v-row align="center">
      <v-col cols="6">
        <v-subheader>
          What is your mother tongue?
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
</template>

<script>
  export default {
    props: ['selected'],
    data: () => ({
      items: ['Portuguese', 'English', 'Chinese', 'Cantonese', 'Spanish', 'German', 'Spanish'],
    }),
  }
</script>
