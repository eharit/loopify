<template>
  <div class="hello">


    <!-- CONTENT -->
    <section class="section">
      <div class="container">
        <draggable v-model="pages" class="columns is-multiline">

          <!-- pages -->
            <div class="column is-one-third-desktop is-half-tablet" v-for="page in pages">
              <div class="box" :data-id="page.id">
                <button v-if="user.uid" class="delete is-small is-pulled-right" @click="confirmDeletePage(page)"></button>
                <h2 class="title"><router-link :to="{name: 'Page', params: {id: page.id}}">{{page.title}}</router-link></h2>
                <h3 class="subtitle">{{niceDate(page.id)}}</h3>
                <p v-html="truncate(page.body, 300, '…')"></p>
                <!-- <button type="button" name="button" @click="$root.updatePage(page)">Update</button> -->
              </div>
            </div>

          <!-- new page -->
          <div class="column is-one-third-desktop is-half-tablet" v-if="user.uid">
            <div class="title" v-if="createPageClosed">
              <a id="add-page" @click="opencreatePage">+</a>
            </div>
            <div class="box" v-if="!createPageClosed">
              <button v-if="user.uid" class="delete is-small is-pulled-right" @click="closecreatePage"></button>
              <div class="title">
                New Page
              </div>
              <b-field>
                <b-input
                  name="pageTitle"
                  minlength="3"
                  maxlength="100"
                  v-model="newPage.title"
                  placeholder="Title">
                </b-input>
              </b-field>
              <b-field>
                <b-input
                  maxlength="300"
                  type="textarea"
                  v-model="newPage.body"
                  placeholder="Text">
                </b-input>
              </b-field>
              <div class="field">
                <p class="control">
                  <button class="button is-primary" type="button" name="submit" @click="createPage(newPage)">Add New Page</button>
                </p>
              </div>
            </div>
          </div>

        </draggable>
      </div>
    </section>

    <!-- Firebase auth container -->
    <!-- <div id="firebaseui-auth-container" style="display: none;"></div> -->

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
      pages: this.$root.pages,
      newPage: {
        title: '',
        body: '',
      },
      log: '',
      createPageClosed: true,
    };
  },
  methods: {
    confirmDeletePage(data) {
      this.$dialog.confirm({
        title: 'Deleting page',
        message: 'Are you sure you want to <strong>delete</strong> your page? This action cannot be undone.',
        confirmText: 'Delete Page',
        type: 'is-danger',
        hasIcon: true,
        onConfirm: () => {
          this.$toast.open({
            message: 'Page deleted!',
          });
          this.$root.removePage(data);
        },
      });
    },
    getPageId(page) {
      this.log = page;
    },
    niceDate(id) {
      return moment(new Date(parseInt(id, 10))).calendar();
    },
    truncate(value, length, omission) {
      if (value.length <= length) return value;
      return value.substring(0, parseInt(length, 10)) + omission.toString();
    },
    createPage(page) {
      this.$root.createPage(page);
      this.newPage.title = '';
      this.newPage.body = '';
      this.createPageClosed = true;
    },
    opencreatePage() {
      this.createPageClosed = false;
    },
    closecreatePage() {
      this.createPageClosed = true;
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
#add-page {
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
#add-page::after{
  content: 'add page';
  text-transform: uppercase;
  color: black;
  font-size: 10px;
  position: absolute;
  bottom: 10px;
  width: 70px;
  display: none;
  left: 25px;
}
#add-page:hover::after{
  display: block;
}
</style>
