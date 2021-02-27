<template>
    <v-app  style="background: rgb(2,0,36);
    background: linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(19,72,194,0.9472163865546218) 0%, rgba(101,209,231,1) 97%);">
    <v-row>
        <v-col cols="12">
            <span style="font-size: 36px; color: white; margin:auto; display:table; text-align: center; padding-top: 80px">TOEF MADE EASY 2021</span>
        </v-col>
    </v-row>
        <v-row>
        <v-col cols="6">
            <div class="card-login">
                 <span style="padding-left:100px; font-size: 36px; color: white; margin:auto; display:table; text-align: center; padding-top: 0px">
                    Fast, Accurate, and Customized Get the TOEFL®
                </span>
                <br>
                <span style="padding-left:100px; font-size: 36px; color: white; margin:auto; display:table; text-align: center; padding-top: 0px">
                    Improve your reading and listening with TPO
                </span>
            </div>
        </v-col>
        <v-col cols="6">
        <div class="dialog">
                <v-tabs v-model="tab" show-arrows background-color="rgba(19,72,194,0.9472163865546218)" icons-and-text dark grow>
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
                                        <v-spacer></v-spacer><span style="display: inline-block;">
                                        <v-col class="d-flex" cols="8">
                                            <!--<v-btn x-large block color="blue accent-4 white--text" @click="modal"> Recovery Password </v-btn>-->
                                            <v-btn style="margin-right:40px;" x-large block :disabled="!valid" color="blue accent-4 white--text" @click="validate"> Login </v-btn>
                                            <Dialog />
                                        </v-col></span>
                                    </v-row>
                                </v-form>
                            </v-card-text>
                            <br/>
                            <span v-show="message">{{messageBan}}</span>
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
        </v-col>
        </v-row>
    </v-app>

</template>
<script>
import axios from 'axios';
import VueCookies from 'vue-cookies'
import Vue from 'vue'
import Router from 'vue-router';
import Dialog from '../components/Dialog.vue'
import { VueReCaptcha } from 'vue-recaptcha-v3'
 
// For more options see below
Vue.use(VueReCaptcha, { siteKey: '6LcR9WkaAAAAAOmFZF2P26dHXEQkb2JKNMD20-bz', loaderOptions: {
    useRecaptchaNet: true,
    autoHideBadge: false
  }})
// secret key: 6LcR9WkaAAAAAEdbIo6Wu_TbPV4rbGAtLhKDb_c7

Vue.use(Router)

export default {
components: {
    Dialog
},
data: () => ({
    autoHideBadge: false,
}),
computed: {
    passwordMatch() {
      return () => this.password === this.verify || "Password must match";
    }
  },
  methods: {
      async recaptcha() {
      // (optional) Wait until recaptcha has been loaded.
      await this.$recaptchaLoaded()
 
      // Execute reCAPTCHA with action "login".
      const token = await this.$recaptcha('login')
 
      // Do stuff with the received token.
    },
      modal(){
          alert("modal")
      },
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
                    this.autoHideBadge = true;
                    this.$router.push("/");
                }
            })
            .catch(error =>{
            if(error.response.status == 401){
                this.message = true;
                this.$toast.error(error.response.data , {
                timeout: 5000
                })
            }else if(error.response.status === 429){
                this.$toast.error("Your IP has been banned. Please try again in an hour." , {
                timeout: 5000
            })}
        })}
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
    message: false,
    messageBan: "You'll be banned with 10 failed attempts",
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
}
.card-login {
    display: table;
    margin: 0 auto;
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

