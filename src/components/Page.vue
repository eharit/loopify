<template>
  <div>
    <component :is="currentBlocks[index]" v-for="(block, index) in blocks">{{block.name}}</component>
  </div>
</template>
<script>

export default {
  name: 'page',
  data: function data() {
    return {
      blocks: this.$root.pages.find(e => e.route === this.$route.params.route).blocks,
      // currentBlocks: this.$root.pages
      //   .find(e => e.route === this.$route.params.route).blocks
      //   .map(e => () => import(`./blocks/${e.name}`)),
    };
  },
  computed: {
    currentBlocks() {
      return this.blocks.map(e => () => import(`./blocks/${e.name}`));
    },
  },
  watch: {
    $route() {
      this.blocks = this.$root.pages.find(e => e.route === this.$route.params.route).blocks;
    },
  },
  updated() {
    this.$log.log(this.currentBlocks);
  },
};
</script>
<style>
</style>
