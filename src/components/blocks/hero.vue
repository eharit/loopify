<template>
  <section class="hero is-medium is-warning is-bold">
    <div class="hero-body mu-container">
      <i v-if="$root.user.uid"  class="material-icons mu-handle mu-object">&#xE25D;</i>
      <i v-if="$root.user.uid" class="material-icons mu-clear mu-object" @click="deleteBlock">cancel</i>
      <div class="container title is-1" :data-content-id="`${content['.key']}-title`">
        <medium-editor
          v-if="$root.user.uid"
          :options="{disableEditing: !$root.user.uid}"
          custom-tag="h1"
          :text='title'
          @edit="applyTextEdit(content, 'title')">
        </medium-editor>
        <h1 v-else v-html="title"></h1>
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
    deleteBlock() {
      this.$emit('deleteBlock');
    },
  },
};
</script>
<style>
</style>
