<template>
  <div id="app">
    <nav-bar></nav-bar>
    <router-view></router-view>
    <div class="loading" v-if="$root.loading">
      Loading...
    </div>
  </div>
</template>

<script>
import Navbar from './components/Navbar';

import './assets/medium-editor-master/dist/css/medium-editor.min.css';
import './assets/medium-editor-master/dist/css/themes/beagle.min.css';

export default {
  name: 'app',
  components: {
    'nav-bar': Navbar,
  },
};
</script>

<style>
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
.loading {
  background-color: rgba(255, 255, 255, 0.5);
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}
</style>
