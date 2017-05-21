<template>
  <draggable v-model="blocks"
    @end="$root.updateBlockOrder(currentPage(), blocks)"
    :options="{ handle: '.mu-handle' }">
    <component :is="blockComponents[index]"
    :page="currentPage()"
    :content="content"
    v-for="(content, index) in blockContent"
    :key="content['.key']"></component>
  </draggable>
</template>
<script>
export default {
  name: 'page',
  data() {
    return {
      queries: this.currentPage().queries,
      blocks: this.$root.blocks,
      content: this.$root.content,
    };
  },
  methods: {
    currentPage() {
      return this.$root.pages.find(e => e.routeName === this.$route.params.route);
    },
  },
  computed: {
    blockComponents() {
      const componentNames = Object.keys(this.queries).map(key => this.blocks.find(e => e['.key'] === this.queries[key].block)['.value']);
      return componentNames.map(e => () => import(`./blocks/${e}`));
    },
    blockContent() {
      const content = [];
      // const componentIds = Object.keys(this.queries)
      //   .map(key => this.blocks.find(e => e['.key'] === this.queries[key].block)['.key']);
      const contentIds = Object.keys(this.queries)
        .map(key => this.content.find(e => e['.key'] === this.queries[key].content)['.key']);
      contentIds.forEach(id => content.push(this.content.find(e => e['.key'] === id)));
      // .map(key => this.blocks.find(e => e.block === id))));
      return content;
    },
  },
  watch: {
    $route() {
      this.queries = this.currentPage().queries;
    },
  },
  components: {
    draggable: () => import('vuedraggable'),
  },
  mounted() {
    this.$log.log('Page.vue', this.blockContent);
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
