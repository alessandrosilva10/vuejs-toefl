<template>
  <div class="text-center">
    <h1 class="blue--text">Loading lessons from the server</h1><br/><br/>
    <v-progress-circular
      :rotate="-90"
      :size="250"
      :width="15"
      :value="value"
      color="blue"
    >
      {{ value }}%
    </v-progress-circular>
    <!--<v-progress-circular
      :rotate="360"
      :size="250"
      :width="15"
      :value="value"
      color="teal"
    >
      {{ value }}
    </v-progress-circular>

    <v-progress-circular
      :rotate="-90"
      :size="250"
      :width="15"
      :value="value"
      color="primary"
    >
      {{ value }}
    </v-progress-circular>

    <v-progress-circular
      :rotate="90"
      :size="250"
      :width="15"
      :value="value"
      color="red"
    >
      {{ value }}
    </v-progress-circular>

    <v-progress-circular
      :rotate="180"
      :size="250"
      :width="15"
      :value="value"
      color="pink"
    >
      {{ value }}
    </v-progress-circular>-->
  </div>
</template>

<script>
  export default {
    data () {
      return {
        interval: {},
        value: 0,
      }
    },
    beforeDestroy () {
      clearInterval(this.interval)
    },
    mounted () {
      this.interval = setInterval(() => {
        if (this.value === 100) {
          return (this.value = 0)
        }
        this.value += 25
      }, 1000)
    },
  }
</script>

<style scoped>
.v-progress-circular {
  margin: 1rem;
}
</style>
