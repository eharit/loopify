import Vue from 'vue';
import Router from 'vue-router';
import Home from '@/components/Home';
import Auth from '@/components/Auth';
import Page from '@/components/Page';
import Pages from '@/components/admin/Pages';


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
      path: '/:route',
      name: 'Page',
      component: Page,
    },
    {
      path: '/admin/pages',
      name: 'Pages',
      component: Pages,
    },
  ],
});
