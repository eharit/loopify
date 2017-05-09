import Vue from 'vue';
import Router from 'vue-router';
import Home from '@/components/Home';
import Auth from '@/components/Auth';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
    },
    {
      path: '/login',
      name: 'Login',
      component: Auth,
    },
  ],
});
