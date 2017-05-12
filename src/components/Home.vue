<template>
  <div class="hello">

    <!-- HERO -->
    <section class="hero is-primary is-medium is-bold">
      <div class="hero-body">
        <vue-particles color="#dedede" :particlesNumber="80" hoverMode="grab"></vue-particles>
        <div class="container">
          <h1 class="title">
            Mikroblog
          </h1>
          <h2 class="subtitle">
            the tiniest blog ever
          </h2>
        </div>
      </div>
    </section>

    <!-- CONTENT -->
    <section class="section">
      <div class="container">
        <div class="columns is-multiline">

          <!-- posts -->
          <div class="column is-one-third-desktop is-half-tablet" v-for="post in posts">
            <div class="box" :data-id="post.id">
              <button v-if="store.user.uid" class="delete is-small is-pulled-right" @click="confirmDeletePost(post)"></button>
              <h2 class="title"><router-link :to="{name: 'Post', params: {id: post.id}}">{{post.title}}</router-link></h2>
              <h3 class="subtitle">{{niceDate(post.id)}}</h3>
              <p v-html="truncate(post.body, 300, '…')"></p>
              <!-- <button type="button" name="button" @click="$root.updatePost(post)">Update</button> -->
            </div>
          </div>

          <!-- new post -->
          <div class="column is-one-third-desktop is-half-tablet" v-if="store.user.uid">
            <div class="title" v-if="createPostClosed">
              <a id="add-post" @click="opencreatePost">+</a>
            </div>
            <div class="box" v-if="!createPostClosed">
              <button v-if="store.user.uid" class="delete is-small is-pulled-right" @click="closecreatePost"></button>
              <div class="title">
                New Post
              </div>
              <b-field>
                  <b-input
                    name="postTitle"
                    minlength="3"
                    maxlength="100"
                    v-model="newPost.title"
                    placeholder="Title">
                  </b-input>
              </b-field>
              <b-field>
                <b-input
                maxlength="300"
                type="textarea"
                v-model="newPost.body"
                placeholder="Text">
              </b-input>
              </b-field>
              <div class="field">
                <p class="control">
                  <button class="button is-primary" type="button" name="submit" @click="createPost(newPost)">Add New Post</button>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Firebase auth container -->
    <div id="firebaseui-auth-container" style="display: none;"></div>

    <!-- <div class="console">
      <pre>{{log}}</pre>
    </div> -->

  </div>
</template>

<script>
import moment from 'moment';

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
      createPostClosed: true,
    };
  },
  methods: {
    confirmDeletePost(data) {
      this.$dialog.confirm({
        title: 'Deleting post',
        message: 'Are you sure you want to <strong>delete</strong> your post? This action cannot be undone.',
        confirmText: 'Delete Post',
        type: 'is-danger',
        hasIcon: true,
        onConfirm: () => {
          this.$toast.open({
            message: 'Post deleted!',
          });
          this.$root.removePost(data);
        },
      });
    },
    getPostId(post) {
      this.log = post;
    },
    niceDate(id) {
      return moment(new Date(parseInt(id, 10))).calendar();
    },
    truncate(value, length, omission) {
      if (value.length <= length) return value;
      return value.substring(0, parseInt(length, 10)) + omission.toString();
    },
    createPost(post) {
      this.$root.createPost(post);
      this.newPost.title = '';
      this.newPost.body = '';
      this.createPostClosed = true;
    },
    opencreatePost() {
      this.createPostClosed = false;
    },
    closecreatePost() {
      this.createPostClosed = true;
    },
  },
  components: {
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
.hero-body {
  position: relative;
}
#particles-js {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
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
  position: relative;
}
#add-post::after{
  content: 'add post';
  text-transform: uppercase;
  color: black;
  font-size: 10px;
  position: absolute;
  bottom: 10px;
  width: 70px;
  display: none;
  left: 25px;
}
#add-post:hover::after{
  display: block;
}
</style>
