<template lang="html">
  <div id="firebaseui-auth-container"></div>
</template>

<script>
import firebase from 'firebase';

export default {
  name: 'auth',
  mounted() {
    const ui = this.$root.ui;
    const uiConfig = {
      callbacks: {
        signInSuccess() {
          this.success('Login successful');
          return true;
        },
      },
      signInOptions: [
        firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        firebase.auth.EmailAuthProvider.PROVIDER_ID,
      ],
    };
    ui.start('#firebaseui-auth-container', uiConfig);
  },
};
</script>

<style lang="css">
</style>
