<template>
    <div class="">
        <Navbar/>
        <v-container class="grey lighten-5">
            <v-row no-gutters>
                <v-col>
                    <v-card
                        class="pa-2"
                        outlined
                        tile
                    >
                        Scoreboard - Reading
                </v-card>
                </v-col>
                <v-col>
                <v-card
                    class="pa-2"
                    outlined
                    tile
                >
                    Scoreboard - Listening
                </v-card>
                </v-col>
            </v-row>
            <v-row no-gutters>
                <v-col>
                    <v-card
                        class="pa-2"
                        outlined
                        tile
                    >
                        Scoreboard - Writing
                </v-card>
                </v-col>
                <v-col>
                <v-card
                    class="pa-2"
                    outlined
                    tile
                >
                   Scoreboard - Speaking
                </v-card>
                </v-col>
            </v-row>
        </v-container>
    </div>
</template>
<script>
import Navbar from '@/components/Navbar';
import axios from 'axios';
import VueCookies from 'vue-cookies'

export default {
    components: {
        Navbar
    },
}
</script>
<style scoped>

</style>
