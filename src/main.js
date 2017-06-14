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
    updateBlockOrder(currentPage, contentMeta) {
      // this.$log.log(currentPage, contentMeta);
      if (currentPage && contentMeta) {
        pageRef.child(currentPage['.key']).child('contentMeta').set(contentMeta)
        .then(() => {
          this.success('Block order changed');
        })
        .then(() => {
          this.danger('Block order has not changed');
        });
      }
    },
    createPage(page) {
      const self = this;
      const newPage = {
        routeName: page.title.toLowerCase(),
        title: page.title,
        index: this.pages.length,
        contentMeta: [],
      };
      contentRef.push({ body: { value: '' }, title: { value: '' } })
      .then((snapshot) => {
        newPage.contentMeta = [{ block: '-Kkbgem08HsqkeJqamaO', content: snapshot.key }];
        self.$log.log(newPage);
        pageRef.push(newPage).then(() => {
          this.$router.push(`${newPage.routeName}`);
          this.success('Page have been created successfully');
        });
      });

      // pageRef.push(newPage);
    },
    removePage(data) {
      pageRef.child(data['.key']).remove()
      .then(() => {
        Vue.delete(data, '.key');
        this.$router.push('/');
        this.success('Page deleted successfully');
      });
    },
    updateContent(content, textKey, text) {
      // this.$log.log(content['.key'], textKey, text);
      contentRef.child(content['.key']).child(textKey).update({
        value: text,
      });
    },
    logOut() {
      firebase.auth().signOut()
      .then(() => {
        this.toast('Logout successful');
      });
      this.ui.reset();
    },
    setData() {
      const pages = this.pages;
      // const blocks = this.blocks;
      // const content = this.content;
      pages.forEach(e => pageRef.child(e['.key']).child('contentMeta').set([{ block: 'xxx', content: 'xxx' }, { block: 'xxx', content: 'xxx' }]));
      // contents.forEach(e => contentRef.push(e));
    },
    toast(message) {
      this.$toast.open(message);
    },
    success(message) {
      this.$toast.open({
        message,
        type: 'is-success',
      });
    },
    danger(message) {
      this.$toast.open({
        message,
        type: 'is-danger',
      });
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
