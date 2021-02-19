<template>
     <div v-show="loading" class="loading">
        <v-row>
            <h1 style="padding-left: 200px; padding-top: 50px; padding-bottom: 200px; color: rgba(34, 167, 240, 1); text-align: center;" class="subheading-6">{{title}}</h1>
        </v-row>
        <v-row>
             <v-col col="3">
                <pacman-loader :loading="loading" :color="color" :size="size"></pacman-loader>
            </v-col>
             <v-col col="3">
                <pacman-loader :loading="loading" :color="color" :size="size"></pacman-loader>
            </v-col>
            <v-col col="3">
                <pacman-loader :loading="loading" :color="color" :size="size"></pacman-loader>
            </v-col>
            <v-col col="3">
                <pacman-loader :loading="loading" :color="color" :size="size"></pacman-loader>
            </v-col>
        </v-row>
    </div>
</template>
<script>
import PacmanLoader from 'vue-spinner/src/PacmanLoader.vue'
export default {
    components: {
        PacmanLoader
    },
    props: ['title', 'thumbnail'],
    data(){
        return {
            size: '30px',
            color: 'rgba(34, 167, 240, 1)',
            loading: true,
        }
    },mounted() {

        this.interval = setInterval(() => {
             this.loading = false;
        }, 4000);
    },
};

</script>
<style scoped>
.loading{
    width: 50%;
    margin: 0 auto;
    padding-left: 70px;
}
</style>
