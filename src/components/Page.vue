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
      blocks: this.currentPage().blocks,
      // currentBlocks: this.$root.pages
      //   .find(e => e.route === this.$route.params.route).blocks
      //   .map(e => () => import(`./blocks/${e.name}`)),
    };
  },
  methods: {
    currentPage() {
      return this.$root.pages.find(e => e.route === this.$route.params.route);
    },
  },
  computed: {
    currentBlocks() {
      return this.blocks.map(e => () => import(`./blocks/${e.name}`));
    },
  },
  watch: {
    $route() {
      this.blocks = this.currentPage().blocks;
    },
  },
  updated() {
    this.$log.log(this.currentBlocks);
  },
};
</script>
<style>
</style>
