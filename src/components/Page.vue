<template>
  <draggable v-model="contentMeta"
    @end="$root.updateBlockOrder(currentPage(), contentMeta)"
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
      contentMeta: this.currentPage().contentMeta,
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
      const blockIds = this.contentMeta.map(obj => obj.block);
      const blocks = blockIds.map(id => this.blocks.find(obj => obj['.key'] === id)['.value']);
      return blocks.map(e => () => import(`./blocks/${e}`));
    },
    blockContent() {
      const contentIds = this.contentMeta.map(obj => obj.content);
      const content = contentIds.map(id => this.content.find(obj => obj['.key'] === id));
      return content;
    },
  },
  watch: {
    $route() {
      this.contentMeta = this.currentPage().contentMeta;
    },
  },
  components: {
    draggable: () => import('vuedraggable'),
  },
  mounted() {
    // this.$log.log('Page.vue', this.blockContent);
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
