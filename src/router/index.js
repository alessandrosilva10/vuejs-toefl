import Vue from 'vue'
import VueRouter from 'vue-router'
import Dashboard from '../views/Dashboard.vue'
import ToeflListening from '../views/ToeflListening.vue'
import Words1800 from '../views/Words1800.vue'
import Import from '../views/Import.vue'
import Study from '../views/Study.vue'
import QuizReading from '../views/QuizReading.vue'
import StudyYoutube from '../views/StudyYoutube.vue'
import Login from '../views/Login.vue'
import Teste from '../views/Teste.vue'
import Reading from '../views/Reading.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Dashboard',
    component: Dashboard,
    meta: {
        title: 'Home Page - Example App',
        metaTags: [
          {
            name: 'description',
            content: 'The home page of our example app.'
          },
          {
            property: 'og:description',
            content: 'The home page of our example app.'
          }
        ]
      }
  },/*,
  {
    path: '/reading',
    name: 'Reading  Practice',
    component: Reading
  },*/
  {
    path: '/import',
    name: 'YouTube',
    component: Import
  },
  {
    path: '/toefl',
    name: 'Toefl Listening',
    component: ToeflListening
  },
  {
    path: '/1800',
    name: '1800 words',
    component: Words1800
  }
  ,
  {
    path: '/index',
    name: 'Study from YouTube',
    component: Study
  }
  ,
  {
    path: '/index/study&lesson=:video_id',
    name: 'Study from YouTube',
    component: StudyYoutube
  }
  ,
  {
    path: '/login',
    name: 'Login',
    component: Login
  }
  ,
  {
    path: '/testeteste',
    name: 'Teste',
    component: Teste
  },
  ,
  {
    path: '/toefl/reading',
    params: '/tpo=id',
    name: 'Reading',
    component: Reading
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
