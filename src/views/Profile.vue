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
                        disabled
                    ></v-text-field>
                </p>
                <p>
                    <strong>Email</strong>
                    <v-text-field
                        v-model="user_info.email"
                        :rules="nameRules"
                        :counter="25"
                        required
                        disabled
                    ></v-text-field>
                </p>
                <p>
                    <strong>Password</strong>
                    <v-text-field
                        v-model="old_password"
                        :rules="nameRules"
                        :counter="25"
                        required
                        type="password"
                    ></v-text-field>
                </p>
                <p>
                    <strong>New password</strong>
                    <v-text-field
                        v-model="new_password"
                        :rules="nameRules"
                        :counter="25"
                        required
                        type="password"
                    ></v-text-field>
                </p>
                                <p>
                    <strong>Retype new password</strong>
                    <v-text-field
                        v-model="new_password_two"
                        :rules="nameRules"
                        :counter="25"
                        required
                        type="password"
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
        user_info: [],
        old_password: '',
        new_password: '',
        new_password_two: ''
    }),
    methods: {
        updateProfile(){
            if(this.old_password === ''){
                this.$toast.error("Password can not be empty", {
                    timeout: 3000
                })
            }

            if(this.new_password != this.new_password_two){
                this.$toast.error("Password confirmation doesn't match Password", {
                    timeout: 3000
                })
            }
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
