<template>
  <div class="login">
    <form @submit.prevent="loginSubmit">
      <input type="text" placeholder="Login" v-model="login">
      <input type="password" placeholder="Password" v-model="password">
      <button type="submit">Login</button>
    </form>
  </div>
</template>

<script>
import { mapMutations } from "vuex";
import axios from 'axios'
export default {
   name: 'login',
   data() {
   return {
      login: '',
      password: '',
   }
},
async mounted () {
      await this.onload();
   },

methods: {
      ...mapMutations(["loginToggle", "currentLoccation"]),
      loginSubmit() {
         axios
        .post(
          'http://localhost:3000/login',
          {
            login: this.login,
            password: this.password,
            position: {
              lat: this.$store.state.lat,
              lng: this.$store.state.lng,
              }
          },
          { withCredentials: true },
        )
        .then(res => {

          this.loginToggle(res.data.login)
          this.$router.push('/new');
        })
    },
    onload() {
         let startPos;
         const geoSuccess = (position) => {
            startPos = position;
            const lat = startPos.coords.latitude
            const lng = startPos.coords.longitude
            this.currentLoccation({lat,lng})
         };
            navigator.geolocation.getCurrentPosition(geoSuccess);
      },
      },

   }

</script>

<style scoped>
.login {
    border: 1px solid black;
    border-radius: 5px;
    padding: 1.5rem;
    width: 300px;
    margin-left: auto;
    margin-right: auto;
    position: relative;
    overflow: hidden;
}
.container-loading {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: rgba(0,0,0,.3);
}

img {
        width: 2rem;
        height: 2rem;
      }
form {
      display: flex;
      flex-flow: column;}

form:not(:last-child) {
        margin-bottom: 1rem;
      }
input {
        padding: .5rem;
}
button {
        padding: .5rem;
        background-color: lightgray;
        border: 1px solid gray;
        border-radius: 3px;
        cursor: pointer;}
button:hover {
          background-color: lightslategray;
}
</style>
