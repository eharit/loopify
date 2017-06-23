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
        <router-link v-for="page in pages" :to="`/${page.routeName}`" class="nav-item is-tab" :key="page.id">{{page.title}}</router-link>
        <a class="nav-item is-tab" v-if="$root.user.uid">
          <figure class="image is-16x16" style="margin-right: 8px;">
            <img :src="$root.user.photoURL" >
          </figure>
          Profile
        </a>
        <a v-if="$root.user.uid" class="nav-item is-tab" @click="$root.logOut">Log out</a>
        <router-link v-else to="/login" class="nav-item is-tab">Login</router-link>
        <new-page v-if="$root.user.uid"></new-page>
      </div>
    </div>

    <!-- <div class="modal" :class="{ 'visible': loginVisible}">
      <div class="modal-background"></div>
      <div class="modal-card">
        <header class="modal-card-head">
          <p class="modal-card-title">Log in</p>
          <button class="delete" @click="hideLogin"></button>
        </header>
        <section class="modal-card-body">
          <auth></auth>
        </section>
        <footer class="modal-card-foot"></footer>
      </div>
    </div> -->

  </nav>
</template>
<script>
// import Auth from './Auth';

export default {
  name: 'Navbar',
  data: function data() {
    return {
      mobileMenuVisible: false,
      loginVisible: false,
      pages: this.$root.pages,
    };
  },
  // components: {
  //   auth: Auth,
  // },
  methods: {
    toggleMenu() {
      this.mobileMenuVisible = !this.mobileMenuVisible;
    },
    showLogin() {
      this.loginVisible = true;
    },
    hideLogin() {
      this.loginVisible = false;
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
  .visible {
    display: block;
  }
  .modal-card {
    margin-top: 50px;
  }
</style>
