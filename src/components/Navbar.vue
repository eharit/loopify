<template>
  <nav id='Navbar' class="nav has-shadow">
    <div class="container">
      <div class="nav-left">
        <router-link class="nav-item" to="/" >
          <img src="../assets/logo.png" alt="Mikroblog">
        </router-link>
      </div>
      <span class="nav-toggle" @click="toggleMenu">
        <span></span>
        <span></span>
        <span></span>
      </span>
      <div class="nav-right nav-menu" :class="{ 'display-block': mobileMenuVisible }">
        <router-link to="/" class="nav-item is-tab">Home</router-link>
        <a class="nav-item is-tab" v-if="$root.store.user.uid">
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
      mobileMenuVisible: false,
    };
  },
  methods: {
    toggleMenu() {
      this.mobileMenuVisible = !this.mobileMenuVisible;
    },
  },
  mounted() {
    window.addEventListener('click', (e) => {
      if (!e.target.classList.contains('nav-toggle')) {
        this.mobileMenuVisible = false;
      }
    }, false);
  },
};
</script>
<style>
  .display-block {
    display: block !important;
  }
  @media screen and (min-width: 767px) {
    .display-block {
      display: none !important;
    }
  }
</style>
