<template>
  <section class="section-container">
    <v-row class="signin">
      <v-col cols="8" class="left">
        <h1>TOEFL MADE EASY</h1>
      </v-col>
      <v-col cols="4" class="right">
        <h2>LOGIN</h2>
        <validation-observer ref="observer">
          <v-form @submit.prevent="submit">
              <validation-provider v-slot="{ errors }" name="Name" rules="required">
                <v-text-field
                v-model="email"
                :error-messages="errors"
                label="Username"
                required
                outlined
                dark
                filled
                dense
              ></v-text-field>
              </validation-provider>
            <!--<validation-provider /*v-slot="{ errors }"*/ name="Name" rules="required|email">
              <v-text-field
                v-model="email"
                :error-messages="errors"
                label="Email"
                required
                outlined
                dark
                filled
                dense
              ></v-text-field>
            </validation-provider>-->
            <validation-provider v-slot="{ errors }" name="email" rules="required">
              <v-text-field
                v-model="password"
                :error-messages="errors"
                label="Password"
                :append-icon="showPass ? 'mdi-eye' : 'mdi-eye-off'"
                @click:append="showPass = !showPass"
                required
                outlined
                dense
                dark
                filled
                :type="showPass ? 'text' : 'password'"
              ></v-text-field>
            </validation-provider>
            <v-row clas="credentials">
                <v-col cols="6">
                    <div class="text-center">
                        <v-btn class="signin-btn" type="submit" rounded color="white" dark>
                            Sign In
                        </v-btn>
                    </div>
                </v-col>
            </v-row>
          </v-form>
        </validation-observer><v-row clas="credentials">
         <v-col cols="6">
                    <div class="text-center">
                        <v-btn class="signin-btn" @click="register()" type="text" rounded color="white" dark>
                            Register
                        </v-btn>
                    </div>
                </v-col></v-row>
      </v-col>
    </v-row>
  </section>
</template>

<script>
import { required, email } from 'vee-validate/dist/rules'
import { extend, ValidationProvider, setInteractionMode, ValidationObserver } from 'vee-validate'
import axios from 'axios';
import VueCookies from 'vue-cookies'

setInteractionMode('eager')

extend('required', {
  ...required,
  message: '{_field_} can not be empty'
})

extend('email', {
  ...email,
  message: 'Email must be valid'
})

export default {
  components: {
    ValidationProvider,
    ValidationObserver
  },
  data: () => ({
    email: '',
    password: null,
    showPass: false
  }),
  computed: {
    params() {
      return {
        email: this.email,
        password: this.password
      }
    }
  },
  methods: {
    register() {
        this.$router.push('/register')
    },
    async submit() {
      const valid = await this.$refs.observer.validate()
      //if (valid) {
        axios.post("https://toeflmadeeasy.pythonanywhere.com/login",{},{
        auth: {
            username: this.email,
            password: this.password
        }})
        .then(response => {
            if(response.status === 200) {
                VueCookies.set('TOEFLMADEEASY' , JSON.stringify(response.data), "4h")
                 this.$toast.success("Welcome back, " + VueCookies.get('TOEFLMADEEASY').name + " !", {
                timeout: 5000
                })
                window.location.href = '/';
               }
        })
        .catch(error =>
        this.$toast.error(error.response.data , {
        timeout: 5000
        }));
       }
    ,
    clear() {
      // you can use this method to clear login form
      this.email = ''
      this.password = null
      this.$refs.observer.reset()
    }
  },
  mounted() {
      //console.log(VueCookies.get('TOEFLMADEEASY'))
  }
}
</script>

<style lang="scss" scoped>
 .section-container {
  padding-left: 10%;
  padding-right: 10%;
  background: #fff;
  .signin {
    padding: 0;
    margin: 0 auto;
    min-height: 100vh;
    .left {
      padding: 30px;
      justify-content: center;
      align-items: center;
      box-sizing: border-box;
      display: flex;
      color: #287FD6;
      background-color: #fff;
    }
    .right {
      padding-top: 10%;
      padding-right: -10%;
      box-sizing: border-box;
      background: #287FD6;
      color: #fff;
      h2 {
        text-align: center;
        margin: 30px 0;
      }
      .signin-btn {
        width: 100%;
        color: #287FD6;
        justify-content: center;
        align-items: center;
      }
    }
  }
}
</style>
