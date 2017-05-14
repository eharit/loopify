import Vue from 'vue';
import Router from 'vue-router';
import Home from '@/components/Home';
import Auth from '@/components/Auth';
import Post from '@/components/Post';
import Page from '@/components/Page';

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
    {
      path: '/post/:id',
      name: 'Post',
      component: Post,
    },
    {
      path: '/:route',
      name: 'Page',
      component: Page,
    },
  ],
});
