<template>
  <nav id='Navbar' class="nav has-shadow">
    <div class="container">
      <div class="nav-left">
        <router-link class="nav-item" to="/" >
          <img src="http://bulma.io/images/bulma-logo.png" alt="Bulma logo">
        </router-link>
        <router-link to="/" class="nav-item is-tab is-hidden-mobile">Home</router-link>
      </div>
      <span class="nav-toggle">
        <span></span>
        <span></span>
        <span></span>
      </span>
      <div class="nav-right nav-menu">
        <router-link to="/" class="nav-item is-tab is-hidden-tablet">Home</router-link>
        <router-link to="/login" class="nav-item is-tab is-hidden-tablet">Login</router-link>
        <a class="nav-item is-tab">
          <figure class="image is-16x16" style="margin-right: 8px;">
            <img :src="$root.store.user.photoURL" >
          </figure>
          Profile
        </a>
        <a v-if="$root.store.user.uid" class="nav-item is-tab" @click="$root.logOut">Log out</a>
        <router-link v-else to="/login" class="nav-item is-tab">Login</router-link>
      </div>
    </div>
  </nav>
</template>
<script>
export default {
  name: 'Navbar',
  data: function data() {
    return {

    };
  },
};
</script>
<style>
</style>
