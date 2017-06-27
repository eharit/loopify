<template>
  <section class="section mu-container">
    <i v-if="$root.user.uid" class="material-icons mu-handle mu-object">&#xE25D;</i>
    <i v-if="$root.user.uid" class="material-icons mu-clear mu-object" @click="deleteBlock">cancel</i>
    <div class="container">
      <div class="title is-2" :data-content-id="`${content['.key']}-title`">
        <medium-editor custom-tag="h2"
          v-if="$root.user.uid"
          :options="{disableEditing: !$root.user.uid}"
          :text="title"
          @edit="applyTextEdit(content, 'title')">
        </medium-editor>
        <h2 v-else v-html="title"></h2>
      </div>
      <div class="content" :data-content-id="`${content['.key']}-body`">
        <medium-editor
          v-if="$root.user.uid"
          :options="{disableEditing: !$root.user.uid}"
          :text="body"
          @edit="applyTextEdit(content, 'body')">
        </medium-editor>
        <div v-else v-html="body"></div>
      </div>
    </div>
  </section>
</template>
<script>
import editor from 'vue2-medium-editor';

export default {
  name: 'TitleBodyBlock',
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
    deleteBlock() {
      this.$emit('deleteBlock');
    },
  },
  mounted() {
    // this.$log.log(this.title, this.body);
  },
};
</script>
<style>
</style>
