<template>
  <div class="signup">
    <!-- <div v-if="loggingIn" class="container-loading">
      <img src="/loading.gif" alt="Loading Icon">
    </div> -->
    <form @submit.prevent="loginSubmit">
      <input type="text" placeholder="Login" v-model="login">
      <input type="password" placeholder="Password" v-model="password">
      <button  type="submit">Sign Up</button>
    </form>
  </div>
</template>

<script>
import axios from 'axios'
export default {
   name: 'signup',
   data() {
      return {
         login: '',
         password: '',
         mes: ''
      }
   },
   methods: {
      loginSubmit() {
         axios.post(`http://localhost:3000/signup`, {
          login: this.login,
          password: this.password
      })
      .then( (response) => {
         const data = response.data
        if (response.data){
           this.$router.push({ name: '/'})
           } else {
              this.$router.push({ name: '/'})
           }
      })
      },

   }
}
</script>

<style scoped>
.signup {
    border: 1px solid black;
    border-radius: 5px;
    padding: 1.5rem;
    width: 300px;
    margin-left: auto;
    margin-right: auto;
    position: relative;
    overflow: hidden;
}
input {
        padding: .5rem;
        margin-bottom: 10px;
}
img {
        width: 2rem;
        height: 2rem;
      }
form {
      display: flex;
      flex-flow: column;
      }
button {
        padding: .5rem;
        background-color: lightgray;
        border: 1px solid gray;
        border-radius: 3px;
        cursor: pointer;
}
button:hover {
          background-color: lightslategray;
}
</style>
