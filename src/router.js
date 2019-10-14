import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/map',
      name: 'map',
      component: () => import(/* webpackChunkName: "about" */ './components/Map.vue'),
    },
    {
      path: '/new',
      name: 'new',
      component: () => import(/* webpackChunkName: "about" */ './components/NewCase.vue'),
    },
    {
      path: '/chat',
      name: 'chat',
      component: () => import(/* webpackChunkName: "about" */ './views/Chat.vue'),
    },
    {
      path: '/signup',
      name: 'signup',
      component: () => import(/* webpackChunkName: "about" */ './views/signup.vue'),
    },
    {
      path: '/login',
      name: 'login',
      component: () => import(/* webpackChunkName: "about" */ './views/login.vue'),
    },

    {
      path: '/logout',
      name: 'logout',
      component: () => import(/* webpackChunkName: "about" */ './views/logout.vue'),
    },
  ],
});
