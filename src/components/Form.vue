<template>
  <form>
    <v-text-field
      v-model="video_name"
      :error-messages="nameVideoErrors"
      :counter="60"
      label="Name"
      required
      @input="$v.video_name.$touch()"
      @blur="$v.video_name.$touch()"
    ></v-text-field>
    <v-text-field
      v-model="name"
      :error-messages="nameErrors"
      :counter="60"
      label="YouTube Link"
      required
      @input="$v.name.$touch()"
      @blur="$v.name.$touch()"
    ></v-text-field>
    <v-checkbox
      v-model="checkbox"
      :error-messages="checkboxErrors"
      label="Do you agree?"
      required
      @change="$v.checkbox.$touch()"
      @blur="$v.checkbox.$touch()"
    ></v-checkbox>
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
</template>

<script>
  import { validationMixin } from 'vuelidate'
  import { required, maxLength, email } from 'vuelidate/lib/validators'
  import axios from 'axios';

  export default {
    mixins: [validationMixin],

    validations: {
      name: { required, maxLength: maxLength(60) },
      video_name: { required, maxLength: maxLength(60) },
      email: { required, email },
      select: { required },
      checkbox: {
        checked (val) {
          return val
        },
      },
    },

    data: () => ({
      name: '',
      video_name: '',
      email: '',
      select: null,
      items: [
        'Item 1',
        'Item 2',
        'Item 3',
        'Item 4',
      ],
      checkbox: false
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
        !this.$v.name.maxLength && errors.push('Link must be at most 60 characters long')
        !this.$v.name.required && errors.push('Link is required.')
        return errors
      },
     nameVideoErrors () {
        const errors = []
        if (!this.$v.video_name.$dirty) return errors
        !this.$v.video_name.maxLength && errors.push('Name must be at most 60 characters long')
        !this.$v.video_name.required && errors.push('Name is required.')
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

    methods: {
      submit () {
        this.$v.$touch()
         if(this.name === ''){
            this.$toast.error("The name must not be empty", {
            timeout: 3000
          })}else if(this.video_name === ''){
              this.$toast.error("The video must not be empty", {
              timeout: 3000
            })
          }else{
          const headers = { "Content-Type": "application/json" };
          axios.post("https://toeflmadeeasy.pythonanywhere.com/import",{
          "name": this.video_name,
          "video": this.name
          }, { headers })
          .then(response => {
              this.$toast.success("The video has been imported successfully", {
              timeout: 3000
              });
              this.$router.push('/index')
          }).catch(error => {
                this.$toast.error("Video not found " + this.name, {
                timeout: 3000
            });
          })}
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
