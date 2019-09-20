import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    isLogin: true,
    startLat: '',
    startLon: '',
  },
  mutations: {
    loginToggle(state) {
      state.isLogin = !state.isLogin;
    },
    currentLoccation(state, { lat, lng }) {
      state.startLat = lat;
      state.startLon = lng;
    },
  },
  actions: {},
});
