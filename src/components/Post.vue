<template>

  <section class="section">
    <div class="container" data-id="post.id">
      <div class="heading">
        <h1 class="title">{{post.title}}</h1>
        <h2 class="subtitle">{{niceDate}}</h2>
      </div>
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

require('../assets/medium-editor-master/dist/css/medium-editor.min.css');

export default {
  name: 'post',
  data: function data() {
    return {
      post: this.$root.posts.find(e => e.id === this.$route.params.id),
    };
  },
  computed: {
    niceDate() {
      return moment(Date(this.post.id)).calendar();
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
<style scoped>
  p {
    margin-bottom: 10px;
  }
  [contenteditable] {
    color: blue;
  }
</style>
