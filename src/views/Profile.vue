<template>
    <div class="">
        <Navbar />
        <div style="padding-left: 20px; padding-top: 20px;">
            <h2><v-icon>mdi-account-cog-outline</v-icon> Settings</h2>
        </div>
        <v-container class="grey lighten-5">
            <v-row no-gutters>
            <v-col>
                <v-card
                class="pa-2"
                outlined
                tile
                >
                <div class="user_info">
                <p>
                    <strong>Display name</strong>
                    <v-text-field
                        v-model="user_info.name"
                        :rules="nameRules"
                        :counter="25"
                        required
                    ></v-text-field>
                </p>
                <p>
                    <strong>Email</strong>
                    <v-text-field
                        v-model="user_info.email"
                        :rules="nameRules"
                        :counter="25"
                        required
                    ></v-text-field>
                </p>
                <p>
                    <strong>Password</strong>
                    <v-text-field
                        v-model="password"
                        :rules="nameRules"
                        :counter="25"
                        required
                    ></v-text-field>
                </p>
                <p>
                    <strong>New password</strong>
                    <v-text-field
                        v-model="password"
                        :rules="nameRules"
                        :counter="25"
                        required
                    ></v-text-field>
                </p>
                                <p>
                    <strong>New password</strong>
                    <v-text-field
                        v-model="password"
                        :rules="nameRules"
                        :counter="25"
                        required
                    ></v-text-field>
                </p>
                <v-btn @click="updateProfile()">Update Profile</v-btn>
                <br><br>
                </div>
                </v-card>
            </v-col>
            <v-col order="12">
                <!--<v-card
                class="pa-2"
                outlined
                tile
                >
                second grid
                </v-card>-->
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
    data: () => ({
        user_info: []
    }),
    methods: {
        updateProfile(){
            alert('This feature is coming soon!')
        }
    },
    mounted() {
        const headers = { "Content-Type": "application/json" };
        axios.get("https://toeflmadeeasy.pythonanywhere.com/user/"+VueCookies.get('TOEFLMADEEASY').public_id,{
        })
        .then(response =>
           this.user_info = response.data
        );
    }
}
</script>
<style>
    .user_info{
        padding-top: 20px;
        padding-left: 20px;
        padding-right: 350px;
    }
</style>
