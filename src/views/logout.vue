<template>
  <div class="logout">
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
      msg: ''
   }
},
methods: {
      ...mapMutations(["loginToggle"]),
},
mounted(){
  axios.get(
          `http://localhost:3000/logout`,
          { withCredentials: true },
  ).then( (response) => {
        const data = response.data
  }).then(res => {
        this.loginToggle()
        this.$router.push('/');
  })
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
