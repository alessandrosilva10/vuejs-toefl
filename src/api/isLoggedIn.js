import axios from 'axios';
import VueCookies from 'vue-cookies'
import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueCookies);
Vue.use(VueRouter)

export function isLoggedIn(){
    try {
        if(!VueCookies.get('TOEFLMADEEASY') || VueCookies.get('TOEFLMADEEASY').jwt == null) {
            this.$router.push("/login")
        }else{
            axios.defaults.headers.common['X-Access-Token'] = VueCookies.get('TOEFLMADEEASY').jwt
            console.log(VueCookies.get('TOEFLMADEEASY').jwt)
        }
        axios.post("https://toeflmadeeasy.pythonanywhere.com/validate")
      .then(response => {
          alert(response.status)
          if(response.status === 200){
            return true;
          }else if(response.status === 403){
            return window.location.href = '/login';;
          }
      })}
      catch(err) {
        alert(err)
    }
}

/*
export function isLoggedIn(){
    axios.post("https://toeflmadeeasy.pythonanywhere.com/validate",{
        headers: {
          'x-access-token': VueCookies.get('TOEFLMADEEASY').name,
        }})
    .then(response => {
        if(response.status === 200) {
            this.$router.push('/')
            this.$toast.success("You're already logged in", {
            timeout: 5000
        })}
    })
    .catch(error => {
        window.location.replace("/login");
        this.$toast.error("You're already logged in", {
        timeout: 5000
    })});
}*/
