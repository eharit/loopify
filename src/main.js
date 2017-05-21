// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import VueFire from 'vuefire';
import firebase from 'firebase';
import firebaseui from 'firebaseui';
import Buefy from 'buefy';
// import VueParticles from 'vue-particles';
import vueLogger from 'vue-logger';
import 'buefy/lib/buefy.css';

import App from './App';
import router from './router';
import config from './helpers/firebase.config';

require('firebaseui/dist/firebaseui.css');

Vue.config.productionTip = false;

Vue.use(VueFire);
Vue.use(Buefy);
// Vue.use(VueParticles);
Vue.use(vueLogger, { prefix: new Date(), dev: true });

const app = firebase.initializeApp(config);
const db = app.database();
const pageRef = db.ref('pages');
const blockRef = db.ref('blocks');
const contentRef = db.ref('content');

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App },
  data: {
    user: {},
    ui: new firebaseui.auth.AuthUI(firebase.auth()),
    loading: false,
  },
  firebase: {
    pages: pageRef,
    blocks: blockRef,
    content: contentRef,
  },
  methods: {
    updateBlockOrder(currentPage, blocks) {
      pageRef.child(currentPage['.key']).child('blocks').set(blocks);
    },
    createPage(page) {
      const newPage = {
        id: JSON.stringify(new Date().getTime()),
        body: page.body,
        title: page.title,
      };
      pageRef.push(newPage);
    },
    removePage(data) {
      pageRef.child(data['.key']).remove();
      Vue.delete(data, '.key');
    },
    updatePage(key, text) {
      pageRef.child(key).update({
        value: text,
      });
    },
    logOut() {
      firebase.auth().signOut();
      this.ui.reset();
    },
    setData() {
      const pages = this.pages;
      // const blocks = this.blocks;
      // const content = this.content;
      pages.forEach(e => pageRef.child(e['.key']).child('queries').push({ content: 'xxx', block: 'xxx' }));
      // contents.forEach(e => contentRef.push(e));
    },
  },
  created() {
    // firebase.initializeApp(config);
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.user = user;
        this.$router.push('/');
      } else {
        this.user = {};
      }
    });
  },
});
