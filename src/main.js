// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import VueFire from 'vuefire';
import firebase from 'firebase';
import firebaseui from 'firebaseui';
import Buefy from 'buefy';
import 'buefy/lib/buefy.css';

import App from './App';
import router from './router';
import config from './helpers/firebase.config';

require('firebaseui/dist/firebaseui.css');

Vue.config.productionTip = false;

Vue.use(VueFire);
Vue.use(Buefy);

const app = firebase.initializeApp(config);
const db = app.database();
const postRef = db.ref('posts');

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
  },
  firebase: {
    posts: postRef,
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
