<template>
  <div class="text-center">
    <v-dialog
      v-model="dialog"
      width="600">
      <template v-slot:activator="{ on, attrs }">
        <v-btn x-large block v-bind="attrs" v-on="on" color="blue accent-4 white--text" > Recovery Password </v-btn>
      </template>
      <v-card>
        <v-card-title class="headline grey lighten-2">
          Recovery your password
        </v-card-title>
        <v-card-text>
            <br><br><p style="font-size: 18px">
            Forgot password?
            Enter your login email address through
            which you can receive a link to reset your password.</p>
        </v-card-text>
        <v-card-text>
            <v-col cols="12">
                <v-text-field v-model="email"></v-text-field>
            </v-col>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="#2962FF"
            text
            @click="submit"
            >
            Send
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
import axios from 'axios';

  export default {
    data () {
      return {
        dialog: false,
        email: ''
      }
    },
    methods: {
        submit() {
            //this.dialog = false
            axios.post("https://toeflmadeeasy.pythonanywhere.com/resetpassword",{
            "email": this.email,
        })
        .then(response =>
            this.$toast.success(response.data , {
            timeout: 5000
            })
        )
        .catch(error =>
        this.$toast.error(error.response.data , {
        timeout: 5000
        }));
        }
    }
  }
</script>
