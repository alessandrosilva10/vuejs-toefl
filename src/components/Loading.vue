<template>
     <div v-show="loading" class="loading">
            <!--<h1 class="subheading-6 blue--text">{{title}}</h1>-->
            <br><br>
            <v-responsive class="pt-4">
            <img
                :src="thumbnail"
                width=70%
                height= auto
                display=block
                margin= 0 auto
            >
            </v-responsive>
            <br><br>
        <v-row>
            <v-col col="3"><dot-loader :loading="loading" :color="color" :size="size"></dot-loader></v-col>
            <v-col col="3"><dot-loader :loading="loading" :color="color" :size="size"></dot-loader></v-col>
            <v-col col="3"><dot-loader :loading="loading" :color="color" :size="size"></dot-loader></v-col>
        </v-row>
    </div>
</template>
<script>
import DotLoader from 'vue-spinner/src/DotLoader.vue'

export default {
    components: {
        DotLoader
    },
    props: ['title', 'thumbnail'],
    data(){
        return {
            size: '150px',
            color: 'lightblue',
            loading: true,
        }
    },mounted() {

        this.interval = setInterval(() => {
             this.loading = false;
        }, 2000);
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
