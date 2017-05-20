<template>
  <draggable v-model="blocks"
    @end="$root.updateBlockOrder(currentPage(), blocks)"
    :options="{ handle: '.mu-handle' }">
    <component :is="blockComponents[index]"
    :page="currentPage()"
    :block="block"
    v-for="(block, index) in blocks">
    :key="block.id"</component>
  </draggable>
</template>
<script>
export default {
  name: 'page',
  data() {
    return {
      blocks: this.currentPage().blocks,
    };
  },
  methods: {
    currentPage() {
      return this.$root.pages.find(e => e.route === this.$route.params.route);
    },
  },
  computed: {
    blockComponents() {
      return this.blocks.map(e => () => import(`./blocks/${e.name}`));
    },
  },
  watch: {
    $route() {
      this.blocks = this.currentPage().blocks;
    },
  },
  components: {
    draggable: () => import('vuedraggable'),
  },
};
</script>
<style>
 .mu-handle {
   position: absolute;
   display: block;
   top: 20px;
   left: 20px;
 }
 .mu-handle-container {
   position: relative;
   cursor: grab;
 }
 .sortable-chosen .mu-handle {
   cursor: grabbing;
 }
</style>
