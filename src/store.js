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
  },
  actions: {},
});
