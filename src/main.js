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
const pageRef = db.ref('pages');
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
  },
  firebase: {
    posts: postRef,
    pages: pageRef,
  },
  methods: {
    updateBlockOrder(currentPage, blocks) {
      pageRef.child(currentPage['.key']).child('blocks').set(blocks);
    },
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
    updatePage(key, data) {
      this.$log.log(key, data);
    },
    setPages() {
      this.pages.forEach(e => pageRef.push(e));
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
