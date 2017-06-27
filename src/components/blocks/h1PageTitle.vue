<template>
  <section class="hero h1-section">
    <div class="hero-body mu-container">
      <i v-if="$root.user.uid"  class="material-icons mu-handle mu-object">&#xE25D;</i>
      <i v-if="$root.user.uid" class="material-icons mu-clear mu-object" @click="deleteBlock">cancel</i>
      <div class="container title is-1" :data-content-id="pageKey">
        <h1>{{page.title}}</h1>
      </div>
    </div>
  </section>
</template>
<script>

export default {
  name: 'H1PageTitleBlock',
  data() {
    return {
      pageKey: this.page['.key'],
    };
  },
  props: ['page', 'content'],
  methods: {
    deleteBlock() {
      this.$emit('deleteBlock');
    },
  },
};
</script>
<style scoped>
</style>
