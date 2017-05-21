<template>
  <section class="hero is-medium is-info is-bold">
    <div class="hero-body mu-handle-container">
      <i class="material-icons mu-handle">&#xE25D;</i>
      <div class="container">
        <medium-editor class="title is-1" custom-tag="h1"
          :text='title'
          @edit="applyTextEdit(content, title, 'title')">
        </medium-editor>
      </div>
    </div>
  </section>
</template>
<script>
import editor from 'vue2-medium-editor';

export default {
  name: 'Page1',
  data() {
    return {
      title: this.content.title,
      pageKey: this.page['.key'],
    };
  },
  props: ['page', 'content'],
  components: {
    'medium-editor': editor,
  },
  methods: {
    applyTextEdit(block) {
      this.$log.log('hero.vue', this.content);
      // this.$root.updatePage(nodeKey, text);
    },
  },
};
</script>
<style>
</style>
