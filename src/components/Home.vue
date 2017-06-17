<template>
  <div id='home' class="section">
    <div class="container">
      <h1 class="title is-1">Hello</h1>
      <new-page></new-page>
    </div>
  </div>
</template>
<script>
export default {
  name: 'home',
  data: function data() {
    return {
      pages: this.$root.pages,
      blocks: this.$root.blocks,
      content: this.$root.content,
    };
  },
  components: {
    'new-page': () => import('./admin/new-page'),
  },
};
</script>
<style>
</style>
