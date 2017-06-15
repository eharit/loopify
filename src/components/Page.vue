<template>
  <div class="">
    <section class="hero is-dark" v-if="user.uid">
      <div class="hero-body">
        <div class="container">
          <h3 class="title">
            Hi {{blockToAdd}}
          </h3>
          <div class="level">
            <div class="leve-left">
              <new-page class=""></new-page>
              <b-dropdown v-model="blockToAdd">
                <button class="button is-primary" slot="trigger">
                    <span>Add Block</span>
                    <b-icon icon="arrow_drop_down"></b-icon>
                </button>
                <b-dropdown-option subheader>
                    Add a block to the page
                </b-dropdown-option>
                <b-dropdown-option :value="block['.key']" v-for="block in blocks">{{block['.value']}}</b-dropdown-option>
            </b-dropdown>
            </div>
            <div class="level-right">
              <a class="button is-danger is-outlined" @click="confirmDeletePage(currentPage())">
                <span>Delete</span>
                <span class="icon is-small">
                  <i class="material-icons">delete</i>
                </span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
    <draggable v-model="contentMeta"
      @end="$root.updateBlockOrder(currentPage(), contentMeta)"
      :options="{ handle: '.mu-handle' }">
      <component :is="blockComponents[index]"
      :page="currentPage()"
      :content="content"
      v-for="(content, index) in blockContent"
      :key="content['.key']"></component>
    </draggable>
  </div>
</template>
<script>
export default {
  name: 'page',
  data() {
    return {
      contentMeta: this.currentPage().contentMeta,
      blocks: this.$root.blocks,
      content: this.$root.content,
      user: this.$root.user,
      blockToAdd: '',
    };
  },
  methods: {
    addBlockToPage(blockKey, currentPage) {
      this.$root.addBlockToPage(blockKey, currentPage);
    },
    confirmDeletePage(data) {
      this.$dialog.confirm({
        title: 'Deleting page',
        message: 'Are you sure you want to <strong>delete</strong> your page? This action cannot be undone.',
        confirmText: 'Delete Page',
        type: 'is-danger',
        hasIcon: true,
        onConfirm: () => {
          this.$toast.open({
            message: 'Page deleted!',
          });
          this.$root.removePage(data);
        },
      });
    },
    currentPage() {
      return this.$root.pages.find(e => e.routeName === this.$route.params.route);
    },
  },
  computed: {
    blockComponents() {
      if (this.contentMeta) {
        const blockIds = this.contentMeta.map(obj => obj.block);
        const blocks = blockIds.map(id => this.blocks.find(obj => obj['.key'] === id)['.value']);
        return blocks.map(e => () => import(`./blocks/${e}`));
      }
      return [];
    },
    blockContent() {
      if (this.contentMeta) {
        const contentIds = this.contentMeta.map(obj => obj.content);
        const content = contentIds.map(id => this.content.find(obj => obj['.key'] === id));
        return content;
      }
      return [];
    },
  },
  watch: {
    $route() {
      this.contentMeta = this.currentPage().contentMeta;
    },
    blockToAdd() {
      this.addBlockToPage(this.blockToAdd, this.currentPage());
    },
  },
  components: {
    draggable: () => import('vuedraggable'),
    'new-page': () => import('./admin/new-page'),
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
 .dropdown .box .option {
   color: #454545;
 }
</style>
