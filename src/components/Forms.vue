<template>
  <v-container fill-height>
    <v-row justify="center" align="center">
        <v-col cols="12" sm="10">
  <form>
    <h1 style="text-align: center">Insert new Lectures and Conversations</h1><br>
    <v-text-field
      v-model="lecture"
      :counter="10"
      label="Lecture's name / Conversation's name"
      required
      @input="$v.name.$touch()"
      @blur="$v.name.$touch()"
    ></v-text-field><br>
    <v-select
        v-model="select"
        height="30"
          :items="items"
          label="TPO ID"
          outlined
        ></v-select><br>
     <v-textarea
          v-model="text"
          style="border:1px solid"
          height="680"
          solo
          name="input-7-4"
          label="Lecture and/or conversation"
        ></v-textarea><br>
    <v-text-field
      v-model="google_drive_id"
      :counter="10"
      label="Goodle Drive ID"
      required
      @input="$v.name.$touch()"
      @blur="$v.name.$touch()"
    ></v-text-field>
    <v-checkbox
    style="font-weight: bold;"
      v-model="checkbox"
      :error-messages="checkboxErrors"
      label="Do you agree?"
      required
      @change="$v.checkbox.$touch()"
      @blur="$v.checkbox.$touch()"
    ></v-checkbox><br>
    <v-btn
      class="mr-4"
      @click="submit"
    >
      submit
    </v-btn>
    <v-btn @click="clear">
      clear
    </v-btn>
  </form>
  </v-col>
</v-row>
</v-container>
</template>

<script>
  import { validationMixin } from 'vuelidate'
  import { required, maxLength, email } from 'vuelidate/lib/validators'
  import axios from 'axios';

  export default {
    mixins: [validationMixin],

    validations: {
      name: { required, maxLength: maxLength(10) },
      email: { required, email },
      select: { required },
      checkbox: {
        checked (val) {
          return val
        },
      },
    },

    data: () => ({
      text: '',
      google_drive_id: 'http://docs.google.com/uc?export=open&id=',
      lecture: '',
      items: [...Array(80).keys()],
      select: null,
      checkbox: false,
    }),

    computed: {
      checkboxErrors () {
        const errors = []
        if (!this.$v.checkbox.$dirty) return errors
        !this.$v.checkbox.checked && errors.push('You must agree to continue!')
        return errors
      },
      selectErrors () {
        const errors = []
        if (!this.$v.select.$dirty) return errors
        !this.$v.select.required && errors.push('Item is required')
        return errors
      },
      nameErrors () {
        const errors = []
        if (!this.$v.name.$dirty) return errors
        !this.$v.name.maxLength && errors.push('Name must be at most 10 characters long')
        !this.$v.name.required && errors.push('Name is required.')
        return errors
      },
      emailErrors () {
        const errors = []
        if (!this.$v.email.$dirty) return errors
        !this.$v.email.email && errors.push('Must be valid e-mail')
        !this.$v.email.required && errors.push('E-mail is required')
        return errors
      },
    },
    created () {
        const tpos = this.items.map(item => {
            return 'TPO'+item
        })
        this.items = tpos;
    },
    methods: {
      submit () {
        this.$v.$touch()
        if(this.checkbox){
            axios.post("https://toeflmadeeasy.pythonanywhere.com/insert-listening-lecture",{
                "text": this.text,
                "lecture": this.lecture,
                "tpo_id": this.select,
                "mp3": this.google_drive_id
            })
            .then(response => {
            if(response.status === 200) {
                    this.$toast.success(response.data, {
                    timeout: 5000
                    }
                    )
                this.$router.push("/toefl");
                }
            })
            .catch(error =>{
                console.log(error)
        })
        }
      },
      clear () {
        this.$v.$reset()
        this.name = ''
        this.email = ''
        this.select = null
        this.checkbox = false
      },
    },
  }
</script>
