<template>
  <section class="section">
    <div class="container mu-handle-container">
      <i class="material-icons mu-handle">&#xE25D;</i>
      <medium-editor class="title is-1" custom-tag="h1"
        :text='title'
        @edit="applyTextEdit(content, title, 'title')">
      </medium-editor>
      <medium-editor class="content" custom-tag="div"
        :text="body"
        @edit="applyTextEdit(content, body, 'body')">
      </medium-editor>
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
      body: this.content.body,
      pageKey: this.page['.key'],
    };
  },
  props: ['page', 'content'],
  components: {
    'medium-editor': editor,
  },
  methods: {
    applyTextEdit(block) {
      this.$log.log('titleBody.vue', this.content);
      // this.$root.updatePage(nodeKey, text);
    },
  },
};
</script>
<style>
</style>
