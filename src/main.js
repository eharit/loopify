// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import VueFire from 'vuefire';
import firebase from 'firebase';
import firebaseui from 'firebaseui';
import Buefy from 'buefy';
import VueParticles from 'vue-particles';
import vueLogger from 'vue-logger';
import 'buefy/lib/buefy.css';

import App from './App';
import router from './router';
import config from './helpers/firebase.config';

require('firebaseui/dist/firebaseui.css');

Vue.config.productionTip = false;

Vue.use(VueFire);
Vue.use(Buefy);
Vue.use(VueParticles);
Vue.use(vueLogger, { prefix: new Date(), dev: true });

const app = firebase.initializeApp(config);
const db = app.database();
const postRef = db.ref('posts');
// const pageRef = db.ref('pages');
// const blockRef = db.ref('blocks');

const store = {
  user: {},
};

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App },
  data: {
    store,
    ui: new firebaseui.auth.AuthUI(firebase.auth()),
    loading: false,
    pages: [
      { id: '1', route: 'page1', title: 'Page 1', blocks: [{ name: 'block1' }, { name: 'block3' }, { name: 'block2' }] },
      { id: '2', route: 'page2', title: 'Page 2', blocks: [{ name: 'block3' }, { name: 'block1' }, { name: 'block2' }] },
      { id: '3', route: 'page3', title: 'Page 3', blocks: [{ name: 'block2' }, { name: 'block2' }, { name: 'block3' }] },
    ],
  },
  firebase: {
    posts: postRef,
    // pages: pageRef,
  },
  methods: {
    createPost(post) {
      const newPost = {
        id: JSON.stringify(new Date().getTime()),
        body: post.body,
        title: post.title,
      };
      postRef.push(newPost);
    },
    logOut() {
      firebase.auth().signOut();
      this.ui.reset();
    },
    removePost(data) {
      postRef.child(data['.key']).remove();
      Vue.delete(data, '.key');
    },
    updatePost(key, text) {
      postRef.child(key).update({
        body: text,
      });
    },
  },
  created() {
    // firebase.initializeApp(config);
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.store.user = user;
        this.$router.push('/');
      } else {
        this.store.user = {};
      }
    });
  },
});
