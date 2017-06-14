<template>
  <section class="hero is-medium is-info is-bold">
    <div class="hero-body mu-handle-container">
      <i class="material-icons mu-handle">&#xE25D;</i>
      <div class="container title is-1" :data-content-id="`${content['.key']}-title`">
        <medium-editor
          custom-tag="h1"
          :text='title'
          @edit="applyTextEdit(content, 'title')">
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
      title: this.content.title.value,
      pageKey: this.page['.key'],
    };
  },
  props: ['page', 'content'],
  components: {
    'medium-editor': editor,
  },
  methods: {
    applyTextEdit(content, textKey) {
      const editorElement = document.querySelector(`[data-content-id="${content['.key']}-${textKey}"] .medium-editor-element`);
      if (editorElement) {
        const text = editorElement.innerHTML;
        this.$root.updateContent(content, textKey, text);
      }
    },
  },
};
</script>
<style>
</style>
