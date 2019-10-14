import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    login: '',
    isLogin: true,
    lat: '',
    lng: '',
    user: {},
  },
  mutations: {
    loginToggle(state, login) {
      state.isLogin = !state.isLogin;
      state.login = login;
    },
    currentLoccation(state, { lat, lng }) {
      state.lat = lat;
      state.lng = lng;
    },
    updateUser(state, user) {
      state.user = user;
    },
  },
  actions: {},
});
