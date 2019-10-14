<template>
  <div id="app">
    <div id="nav">
      <!-- <router-link v-if="this.$store.state.login" to="/chat">Chat</router-link> -->
      <!-- <span v-if="this.$store.state.login">|</span> -->
      <router-link v-if="this.$store.state.login" to="/new">New Case</router-link>
      <span v-if="this.$store.state.login">|</span>
      <router-link to="/map" v-if="this.$store.state.login">Map</router-link>
      <span v-if="this.$store.state.login">|</span>
      <router-link v-if="this.$store.state.isLogin" to="/signup">Sign Up</router-link>
      <span v-if="!this.$store.state.login">|</span>
      <router-link v-if="this.$store.state.isLogin" to="/login">Log in </router-link>
      <router-link v-if="this.$store.state.login" to="/logout"> Log Out</router-link>
      <div class="row">
        <span class="login" v-if="this.$store.state.login"> &#11089;&#11089; {{this.$store.state.login}} &#11089;&#11089; </span>
      </div>
    </div>
    <router-view/>
  </div>
</template>

<script>
import { mapMutations } from "vuex";
import axios from 'axios'
export default {

  // mounted() {
  //   axios.get('http://localhost:3000/isAuthorize', { withCredentials: true }).then(res => {
  //     this.updateUser(res.data)
  //         this.$router.push(`/${$route.params.id}}`);
  //       })
  // },
  methods: {
    ...mapMutations(["updateUser"]),
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  font-weight: bold;
  padding: 30px;
}

#nav a {

  color: #2c3e50;
  padding-left: 10px;
  padding-right: 10px;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
.login {
  margin-top: 20px;
  font-size: 18px;
  font-weight: bold;
}
</style>
