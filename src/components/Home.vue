<template>
  <div id='home' class="section">
    <div class="container">
      <h1 class="title is-1">Hello</h1>
      <pre>{{blocks}}</pre>
      <pre>{{content}}</pre>
      <pre>{{pages}}</pre>
    </div>
    <button type="button" name="button" @click="$root.setData">Set Data</button>
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
};
</script>
<style>
</style>
