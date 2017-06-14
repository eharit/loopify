<template>
  <section class="section mu-handle-container">
    <i class="material-icons mu-handle">&#xE25D;</i>
    <div class="container">
      <div class="title is-2" :data-content-id="`${content['.key']}-title`">
        <medium-editor custom-tag="h2"
          :text="title"
          @edit="applyTextEdit(content, 'title')">
        </medium-editor>
      </div>
      <div class="content" :data-content-id="`${content['.key']}-body`">
        <medium-editor
          :text="body"
          @edit="applyTextEdit(content, 'body')">
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
      body: this.content.body.value,
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
  mounted() {
    // this.$log.log(this.title, this.body);
  },
};
</script>
<style>
</style>
