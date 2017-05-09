<template>
  <div class="hello">

    <section class="hero is-primary is-medium">
      <div class="hero-body">
        <div class="container">
          <h1 class="title">
            Posts
          </h1>
          <h2 class="subtitle">
            of the Great Uncertainity
          </h2>
        </div>
      </div>
    </section>

    <section class="section">
      <div class="container">
        <div class="columns is-multiline">
          <div class="column is-one-third-desktop is-half-tablet" v-for="post in posts">
            <div class="box" :data-id="post['.key']">
              <button class="delete is-small is-pulled-right" @click="$root.removePost(post)"></button>
              <h3 class="title">{{post.title}}</h3>
              <medium-editor
              :text.sync="posts.find(e => e['.key'] === post['.key']).body"
              @edit="applyTextEdit(post)"
              :options=" {
                toolbar: {buttons: ['bold', 'strikethrough', 'h1']}
              }"></medium-editor>
              <!-- <button type="button" name="button" @click="$root.updatePost(post)">Update</button> -->
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="section">
      <div class="container">
        <div class="columns">
          <div class="column" v-if="store.user.uid">
            <h2 class="title">Hello {{ store.user.displayName }}!</h2>

            <div class="field">
              <p class="control">
                <input class="input" type="text" name="postTitle" v-model="newPost.title">
              </p>
            </div>
            <div class="field">
              <p class="control">
                <textarea class="textarea" name="postBody" rows="8" cols="80" v-model="newPost.body"></textarea>
              </p>
            </div>
            <div class="field">
              <p class="control">
                <button class="button is-success" type="button" name="submit" @click="addPost(newPost)">Submit</button>
              </p>
            </div>
            <div id="firebaseui-auth-container"></div>
          </div>
        </div>
      </div>
    </section>

    <div class="console">
      <pre>{{log}}</pre>
    </div>

    <pre>{{posts}}</pre>

  </div>
</template>

<script>
import editor from 'vue2-medium-editor';

require('../assets/medium-editor-master/dist/css/medium-editor.min.css');

export default {
  name: 'home',
  data() {
    return {
      store: this.$root.store,
      posts: this.$root.posts,
      newPost: {
        title: '',
        body: '',
      },
      log: '',
    };
  },
  methods: {
    addPost(post) {
      this.$root.addPost(post);
      this.newPost.title = '';
      this.newPost.body = '';
    },
    applyTextEdit(post) {
      const key = post['.key'];
      // const text = this.posts.find(e => e['.key'] === post['.key']).body;
      const text = document.querySelector(`[data-id="${key}"] .medium-editor-element`).innerHTML;
      this.log = text;
      this.$root.updatePost(key, text);
    },
  },
  components: {
    'medium-editor': editor,
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
.console {
  position: fixed;
  bottom: 10px;
  right: 10px;
  padding: 5px;
  border: 1px blue solid;
  border-radius: 3px;
  color: blue;
  background: white;
}
</style>
