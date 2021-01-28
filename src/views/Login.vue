<template>
    <div id="app" >
    <v-app>
    <v-row>
        <v-col cols="12">
            <p class="line-1 anim-typewriter">TOEFL MADE EASY - 2021</p>
            <p class="line-1 anim-typewriter">THE BEST WAY TO IMPROVE YOUR READING AND LISTENING FOR THE TOEFL TEST</p>
        </v-col>
        </v-row>
        <v-row>
        <v-col cols="12">
        <div class="dialog">
            <div>
                <v-tabs v-model="tab" show-arrows background-color="blue accent-4" icons-and-text dark grow>
                    <v-tabs-slider  color="purple darken-4"></v-tabs-slider>
                    <v-tab v-for="(i, index) in tabs"  @click="getTabId(index)"  :key="index">
                        <v-icon large>{{ i.icon }}</v-icon>
                        <div  class="caption py-1">{{ i.name }}</div>
                    </v-tab>
                    <v-tab-item  >
                        <v-card class="px-4">
                            <v-card-text>
                                <v-form ref="loginForm" v-model="valid" lazy-validation>
                                    <v-row>
                                        <v-col cols="12">
                                            <v-text-field v-model="loginUsername" :rules="loginUsernameRules" label="Username" required></v-text-field>
                                        </v-col>
                                        <v-col cols="12">
                                            <v-text-field v-model="loginPassword" :append-icon="show1?'eye':'eye-off'" :rules="[rules.required, rules.min]" :type="show1 ? 'text' : 'password'" name="input-10-1" label="Password" hint="At least 8 characters" counter @click:append="show1 = !show1"></v-text-field>
                                        </v-col>
                                        <v-col class="d-flex" cols="12" sm="6" xsm="12">
                                        </v-col>
                                        <v-spacer></v-spacer>
                                        <v-col class="d-flex" cols="12" sm="3" xsm="12" align-end>
                                            <v-btn x-large block :disabled="!valid" color="blue accent-4 white--text" @click="validate"> Login </v-btn>
                                        </v-col>
                                    </v-row>
                                </v-form>
                            </v-card-text>
                        </v-card>
                    </v-tab-item>
                    <v-tab-item>
                        <v-card class="px-4">
                            <v-card-text>
                                <v-form ref="registerForm" v-model="valid" lazy-validation>
                                    <v-row>
                                        <v-col cols="12">
                                            <v-text-field v-model="username" :rules="[rules.required]" label="Username" maxlength="40" required></v-text-field>
                                        </v-col>
                                        <!--<v-col cols="12" sm="6" md="6">
                                            <v-text-field v-model="lastName" :rules="[rules.required]" label="Last Name" maxlength="20" required></v-text-field>
                                        </v-col>-->
                                        <v-col cols="12">
                                            <v-text-field v-model="email" :rules="emailRules" label="E-mail" required></v-text-field>
                                        </v-col>
                                        <v-col cols="12">
                                            <v-text-field v-model="password" :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'" :rules="[rules.required, rules.min]" :type="show1 ? 'text' : 'password'" name="input-10-1" label="Password" hint="At least 8 characters" counter @click:append="show1 = !show1"></v-text-field>
                                        </v-col>
                                        <v-col cols="12">
                                            <v-text-field block v-model="verify" :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'" :rules="[rules.required, passwordMatch]" :type="show1 ? 'text' : 'password'" name="input-10-1" label="Confirm Password" counter @click:append="show1 = !show1"></v-text-field>
                                        </v-col>
                                        <v-spacer></v-spacer>
                                        <v-col class="d-flex ml-auto" cols="12" sm="3" xsm="12">
                                            <v-btn x-large block :disabled="!valid" color="blue accent-4 white--text" @click="validate">Register</v-btn>
                                        </v-col>
                                    </v-row>
                                </v-form>
                            </v-card-text>
                        </v-card>
                    </v-tab-item>
                </v-tabs>
            </div>
        </div>
        </v-col>
        </v-row>
    </v-app>
</div>
</template>
<script>
import axios from 'axios';
import VueCookies from 'vue-cookies'
import Vue from 'vue'
import Router from 'vue-router';

Vue.use(Router)

export default {
computed: {
    passwordMatch() {
      return () => this.password === this.verify || "Password must match";
    }
  },
  methods: {
      getTabId(index){
          this.currentTab = index;
      },
    validate() {
      if (this.$refs.loginForm.validate()) {
          if(this.currentTab == 0){
            axios.post("https://toeflmadeeasy.pythonanywhere.com/login",{},{
            auth: {
                username: this.loginUsername,
                password: this.loginPassword
            }})
            .then(response => {
                if(response.status === 200) {
                    VueCookies.set('TOEFLMADEEASY' , JSON.stringify(response.data), "4h")
                    this.$toast.success("Welcome back, " + VueCookies.get('TOEFLMADEEASY').name + " !", {
                    timeout: 5000
                    })
                    this.$router.push("/");
                }
            })
            .catch(error =>{
            console.log(error)
            this.$toast.error(error.response.data , {
            timeout: 5000
            })})}
      }
         if (this.$refs.registerForm.validate()) {
          if(this.currentTab == 1){
            axios.post("https://toeflmadeeasy.pythonanywhere.com/register",{
            "name": this.username,
            "email": this.email,
            "password": this.password
        })
        .then(response =>
            this.$toast.success(response.data , {
            timeout: 5000
            })
        )
        .catch(error =>
        this.$toast.error(error.response.data , {
        timeout: 5000
        }))}
      }
    },
    reset() {
      this.$refs.form.reset();
    },
    resetValidation() {
      this.$refs.form.resetValidation();
    }
  },
  mounted() {
      console.log(this.currentTab)
  },
  data: () => ({
    dialog: true,
    tab: 0,
    currentTab: 0,
    tabs: [
        {name:"Login", icon:"mdi-account"},
        {name:"Register", icon:"mdi-account-outline"}
    ],
    valid: true,
    username: "",
    email: "",
    password: "",
    verify: "",
    loginPassword: "",
    loginUsername: "",
    loginUsernameRules: [
      v => !!v || "Required",
      //v => /.+@.+\..+/.test(v) || "E-mail must be valid"
    ],
    emailRules: [
      v => !!v || "Required",
      v => /.+@.+\..+/.test(v) || "E-mail must be valid"
    ],

    show1: false,
    rules: {
      required: value => !!value || "Required.",
      min: v => (v && v.length >= 8) || "Min 8 characters"
    }
  })
}
</script>

<style scoped>

/* Google Fonts */
@import url(https://fonts.googleapis.com/css?family=Anonymous+Pro);

/* Global */
.dialog {
    height: 380px;
    width: 600px;
    display: table;
    margin: 0 auto;
    border: 2px solid;
    border-color: #2962FF;
}
html{
  min-height: 100%;
  overflow: hidden;
}
p{
  color: #2962FF;
  font-family: 'Anonymous Pro', monospace;
}
.line-1{
    position: relative;
    top: 50%;
    width: 24em;
    margin: 0 auto;
    border-right: 2px solid rgba(255,255,255,.75);
    font-size: 180%;
    text-align: center;
    white-space: nowrap;
    overflow: hidden;
    transform: translateY(-50%);
}

/* Animation */
.anim-typewriter{
  animation: typewriter 8s steps(44) 1s 1 normal both,
             blinkTextCursor 500ms steps(44) infinite normal;
             animation-iteration-count:infinite;
}
@keyframes typewriter{
  from{width: 0;}
  to{width: 50em;}
}
@keyframes blinkTextCursor{
  from{border-right-color: rgba(255,255,255,.75);}
  to{border-right-color: transparent;}
}
</style>

