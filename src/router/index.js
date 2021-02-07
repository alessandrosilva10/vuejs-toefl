import Vue from 'vue'
import VueRouter from 'vue-router'
import Dashboard from '../views/Dashboard.vue'
import ToeflListening from '../views/ToeflListening.vue'
import Words1800 from '../views/Words1800.vue'
import Import from '../views/Import.vue'
import Study from '../views/Study.vue'
import ReadingPractice from '../views/ReadingPractice.vue'
import StudyYoutube from '../views/StudyYoutube.vue'
import Login from '../views/Login.vue'
import AddSpeaking from '../views/AddSpeaking.vue'
import Teste from '../views/Teste.vue'
import Reading from '../views/Reading.vue'
import VueCookies from 'vue-cookies'
import axios from 'axios';
import Toast from "vue-toastification";

Vue.use(VueRouter)
Vue.use(VueCookies)
Vue.use(axios)
Vue.use(Toast)

const routes = [
  {
    path: '/',
    name: 'Dashboard',
    component: Dashboard,
    props: true,
    beforeEnter(to, from, next) {
        try {
            if(!VueCookies.get('TOEFLMADEEASY') || VueCookies.get('TOEFLMADEEASY').jwt == null) {
                router.push("/login")
            }else{
                axios.defaults.headers.common['X-Access-Token'] = VueCookies.get('TOEFLMADEEASY').jwt
            }
            axios.post("https://toeflmadeeasy.pythonanywhere.com/validate")
          .then(response => {
              if(response.status === 200){
                next();
              }else if(response.status === 403){
                router.push("/login")
                next();
              }
          })}
          catch(err) {

        }},
    },

  {
    path: '/import',
    name: 'YouTube',
    component: Import,
    beforeEnter(to, from, next) {
        try {
            if(!VueCookies.get('TOEFLMADEEASY') || VueCookies.get('TOEFLMADEEASY').jwt == null) {
                router.push("/login")
            }else{
                axios.defaults.headers.common['X-Access-Token'] = VueCookies.get('TOEFLMADEEASY').jwt
            }
            axios.post("https://toeflmadeeasy.pythonanywhere.com/validate")
          .then(response => {
              if(response.status === 200){
                next();
              }else if(response.status === 403){
                router.push("/login")
                next();
              }
          })}
          catch(err) {

        }},
  },
  {
    path: '/toefl',
    name: 'Toefl Listening',
    component: ToeflListening,
    beforeEnter(to, from, next) {
        try {
            if(!VueCookies.get('TOEFLMADEEASY') || VueCookies.get('TOEFLMADEEASY').jwt == null) {
                router.push("/login")
            }else{
                axios.defaults.headers.common['X-Access-Token'] = VueCookies.get('TOEFLMADEEASY').jwt
            }
            axios.post("https://toeflmadeeasy.pythonanywhere.com/validate")
          .then(response => {
              if(response.status === 200){
                next();
              }else if(response.status === 403){
                router.push("/login")
                next();
              }
          })}
          catch(err) {

        }},
  },
  {
    path: '/1800',
    name: '1800 words',
    component: Words1800,
    beforeEnter(to, from, next) {
        try {
            if(!VueCookies.get('TOEFLMADEEASY') || VueCookies.get('TOEFLMADEEASY').jwt == null) {
                router.push("/login")
            }else{
                axios.defaults.headers.common['X-Access-Token'] = VueCookies.get('TOEFLMADEEASY').jwt
            }
            axios.post("https://toeflmadeeasy.pythonanywhere.com/validate")
          .then(response => {
              if(response.status === 200){
                next();
              }else if(response.status === 403){
                router.push("/login")
                next();
              }
          })}
          catch(err) {

        }},
  }
  ,
  {
    path: '/index',
    name: 'Study from YouTube',
    component: Study,
    beforeEnter(to, from, next) {
        try {
            if(!VueCookies.get('TOEFLMADEEASY') || VueCookies.get('TOEFLMADEEASY').jwt == null) {
                router.push("/login")
            }else{
                axios.defaults.headers.common['X-Access-Token'] = VueCookies.get('TOEFLMADEEASY').jwt
            }
            axios.post("https://toeflmadeeasy.pythonanywhere.com/validate")
          .then(response => {
              if(response.status === 200){
                next();
              }else if(response.status === 403){
                router.push("/login")
                next();
              }
          })}
          catch(err) {

        }},
  }
  ,
  {
    path: '/add-listening-lecture',
    name: 'Add new lectures / Speaking section',
    component: AddSpeaking,
    beforeEnter(to, from, next) {
        try {
            if(!VueCookies.get('TOEFLMADEEASY') || VueCookies.get('TOEFLMADEEASY').jwt == null) {
                router.push("/login")
            }else{
                axios.defaults.headers.common['X-Access-Token'] = VueCookies.get('TOEFLMADEEASY').jwt
            }
            axios.post("https://toeflmadeeasy.pythonanywhere.com/validate")
          .then(response => {
              if(response.status === 200){
                next();
              }else if(response.status === 403){
                router.push("/login")
                next();
              }
          })}
          catch(err) {

        }},
  }
  ,
  {
    path: '/index/study&lesson=:video_id',
    name: 'Study from YouTube',
    component: StudyYoutube,
    beforeEnter(to, from, next) {
        try {
            if(!VueCookies.get('TOEFLMADEEASY') || VueCookies.get('TOEFLMADEEASY').jwt == null) {
                router.push("/login")
            }else{
                axios.defaults.headers.common['X-Access-Token'] = VueCookies.get('TOEFLMADEEASY').jwt
            }
            axios.post("https://toeflmadeeasy.pythonanywhere.com/validate")
          .then(response => {
              if(response.status === 200){
                next();
              }else if(response.status === 403){
                router.push("/login")
                next();
              }
          })}
          catch(err) {

        }},
  }
  ,
  {
    path: '/login',
    name: 'Login',
    component: Login
  }/*,
  {
    path: '/register',
    name: 'Register',
    component: Register
  }*/
  ,
  {
    path: '/testeteste',
    name: 'Teste',
    component: Teste,
    beforeEnter(to, from, next) {
        try {
            if(!VueCookies.get('TOEFLMADEEASY') || VueCookies.get('TOEFLMADEEASY').jwt == null) {
                router.push("/login")
            }else{
                axios.defaults.headers.common['X-Access-Token'] = VueCookies.get('TOEFLMADEEASY').jwt
            }
            axios.post("https://toeflmadeeasy.pythonanywhere.com/validate")
          .then(response => {
              if(response.status === 200){
                next();
              }else if(response.status === 403){
                router.push("/login")
                next();
              }
          })}
          catch(err) {

        }},
  },
  {
    path: '/toefl/reading',
    name: 'Reading',
    component: Reading,
    beforeEnter(to, from, next) {
        try {
            if(!VueCookies.get('TOEFLMADEEASY') || VueCookies.get('TOEFLMADEEASY').jwt == null) {
                router.push("/login")
            }else{
                axios.defaults.headers.common['X-Access-Token'] = VueCookies.get('TOEFLMADEEASY').jwt
            }
            axios.post("https://toeflmadeeasy.pythonanywhere.com/validate")
          .then(response => {
              if(response.status === 200){
                next();
              }else if(response.status === 403){
                router.push("/login")
                next();
              }
          })}
          catch(err) {

        }},
  }
  ,
  {
    path: '/toefl/reading&tpo=:tpo_id',
    name: 'Reading Practice',
    component: ReadingPractice,
    beforeEnter(to, from, next) {
        try {
            if(!VueCookies.get('TOEFLMADEEASY') || VueCookies.get('TOEFLMADEEASY').jwt == null) {
                router.push("/login")
            }else{
                axios.defaults.headers.common['X-Access-Token'] = VueCookies.get('TOEFLMADEEASY').jwt
            }
            axios.post("https://toeflmadeeasy.pythonanywhere.com/validate")
          .then(response => {
              if(response.status === 200){
                next();
              }else if(response.status === 403){
                router.push("/login")
                next();
              }
          })}
          catch(err) {

        }},
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
