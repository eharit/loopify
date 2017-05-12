<template>

  <section class="section">
    <div class="container" data-id="post.id">
        <h1 class="title">{{post.title}}</h1>
        <h2 class="subtitle">{{niceDate}}</h2>
      <div id="medium-body">
        <medium-editor
        :text="post.body"
        @edit="applyTextEdit(post)"
        :options=" {
          toolbar: true,
          disableEditing: !$root.store.user.uid
        }"></medium-editor>
      </div>
    </div>
  </section>

</template>
<script>
import editor from 'vue2-medium-editor';
import moment from 'moment';

import '../assets/medium-editor-master/dist/css/medium-editor.min.css';
import '../assets/medium-editor-master/dist/css/themes/beagle.min.css';

export default {
  name: 'post',
  data: function data() {
    return {
      post: this.$root.posts.find(e => e.id === this.$route.params.id),
    };
  },
  computed: {
    niceDate() {
      return moment(new Date(parseInt(this.post.id, 10))).calendar();
    },
  },
  methods: {
    applyTextEdit(post) {
      const key = post['.key'];
      const text = document.querySelector('#medium-body .medium-editor-element').innerHTML;
      this.$root.updatePost(key, text);
    },
  },
  components: {
    'medium-editor': editor,
  },
};
</script>
<style >
  p {
    margin-bottom: 10px;
  }
  [contenteditable]:hover {
    border: 1px blue dashed;
    color: blue;
    padding: 5px 5px 5px 15px;
    margin: -6px -6px -6px -16px;
  }
  [contenteditable][data-medium-focused] {
    border: 1px lightgray dashed;
    color: black;
    padding: 5px 5px 5px 15px;
    margin: -6px -6px -6px -16px;
  }
  .medium-editor-element {
    outline: none;
  }
</style>
