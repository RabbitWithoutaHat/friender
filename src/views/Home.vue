<template>
  <div class="home">
    <h1 class="header">Friender</h1>
    <!-- <Map /> -->
    <login v-if="this.$store.state.isLogin" />
  </div>
</template>

<script>
// @ is an alias to /src
import Map from '@/components/Map.vue'
import NewCase from '@/components/NewCase.vue'
import login from '@/views/login.vue'
import axios from 'axios'
export default {
  components: {
    Map, login
  },
}
</script>

<style>
.header {
  margin-top: 0px;
  margin-bottom: 50px;
}
</style>
