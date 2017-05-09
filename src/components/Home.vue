<template>
  <div class="hello">

    <section class="hero is-primary is-small">
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
              <button v-if="store.user.uid" class="delete is-small is-pulled-right" @click="$root.removePost(post)"></button>
              <h3 class="title">{{post.title}}</h3>
              <medium-editor
              :text.sync="post.body"
              @edit="applyTextEdit(post)"
              :options=" {
                toolbar: {buttons: ['bold', 'strikethrough', 'h1']}
              }"></medium-editor>
              <!-- <button type="button" name="button" @click="$root.updatePost(post)">Update</button> -->
            </div>
          </div>
          <div class="column is-one-third-desktop is-half-tablet" v-if="store.user.uid">
            <div class="title" v-if="addPostClosed">
              <a id="add-post" href="#" @click="openAddPost">+</a>
            </div>
            <div class="box" v-if="!addPostClosed">
              <button v-if="store.user.uid" class="delete is-small is-pulled-right" @click="closeAddPost"></button>
              <div class="title">
                New Post
              </div>
              <div class="field">
                <p class="control">
                  <input class="input" type="text" name="postTitle" v-model="newPost.title" placeholder="Title">
                </p>
              </div>
              <div class="field">
                <p class="control">
                  <textarea class="textarea" name="postBody" rows="8" cols="80" v-model="newPost.body" placeholder="Text"></textarea>
                </p>
              </div>
              <div class="field">
                <p class="control">
                  <button class="button is-success" type="button" name="submit" @click="addPost(newPost)">Submit</button>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <div id="firebaseui-auth-container" style="display: none;"></div>

    <div class="console">
      <pre>{{log}}</pre>
    </div>

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
      addPostClosed: true,
    };
  },
  methods: {
    addPost(post) {
      this.$root.addPost(post);
      this.newPost.title = '';
      this.newPost.body = '';
      this.addPostClosed = true;
    },
    applyTextEdit(post) {
      const key = post['.key'];
      // const text = this.posts.find(e => e['.key'] === post['.key']).body;
      const text = document.querySelector(`[data-id="${key}"] .medium-editor-element`).innerHTML;
      // this.log = text;
      this.$root.updatePost(key, text);
    },
    openAddPost() {
      this.addPostClosed = false;
    },
    closeAddPost() {
      this.addPostClosed = true;
    },
  },
  components: {
    'medium-editor': editor,
    draggable: () => import('vuedraggable'),
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
#add-post {
  height: 30px;
  width: 30px;
  text-align: center;
  line-height: .81;
  padding: 0;
  color: #fff;
  background: #42b983;
  border-radius: 50%;
  display: inline-block;
}
</style>
