<template>
  <section class="hero is-medium is-info is-bold">
    <div class="hero-body mu-handle-container">
      <i class="material-icons mu-handle">&#xE25D;</i>
      <div class="container">
        <medium-editor class="title is-1" custom-tag="h1"
          :text='title'
          @editableBlur="applyTextEdit(block)">
        </medium-editor>
        <h2 class="subtitle is-3">
          {{subtitle}}
        </h2>
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
      title: this.block.content.title,
      subtitle: this.block.content.subtitle,
      pageKey: this.page['.key'],
    };
  },
  props: ['page', 'block'],
  components: {
    'medium-editor': editor,
  },
  methods: {
    applyTextEdit(block) {
      this.$root.updatePage(this.pageKey, block);
    },
  },
};
</script>
<style>
</style>
