<template>
  <div id="new-page">
    <!-- new page -->
      <div v-if="createPageClosed">
        <span @click="opencreatePage" class="button is-white">
          <span class="icon is-small">
            <i class="material-icons">add_circle</i>
          </span>
          <span>Add Page</span>
        </span>
      </div>
      <div class="box" v-if="!createPageClosed">
        <button v-if="user.uid" class="delete is-small is-pulled-right" @click="closecreatePage"></button>
        <div class="title">
          New Page
        </div>
        <progress class="progress is-small is-success is-animated" :value="progress" max="100">{{progress}}%</progress>
        <b-field>
          <b-input
            name="pageTitle"
            minlength="3"
            maxlength="100"
            v-model="newPage.title"
            placeholder="Title">
          </b-input>
        </b-field>
        <div class="field">
          <p class="control">
            <button class="button is-primary" type="button" name="submit" @click="createPage(newPage)">Add New Page</button>
          </p>
        </div>
      </div>
  </div>
</template>
<script>
import moment from 'moment';

export default {
  name: 'new-page',
  data() {
    return {
      pages: this.$root.pages,
      newPage: {
        title: '',
      },
      log: '',
      createPageClosed: true,
      user: this.$root.user,
      initialProgress: 15,
    };
  },
  methods: {
    niceDate(id) {
      return moment(new Date(parseInt(id, 10))).calendar();
    },
    createPage(page) {
      this.$root.createPage(page);
      this.newPage.title = '';
      this.createPageClosed = true;
    },
    opencreatePage() {
      this.createPageClosed = false;
    },
    closecreatePage() {
      this.createPageClosed = true;
    },
  },
  computed: {
    progress() {
      let progr = this.initialProgress;
      if (this.newPage.title.length > 3) {
        progr = 100;
      }
      return progr;
    },
  },
};
</script>
<style>
  progress[value]::-webkit-progress-value {
    -webkit-transition : width 1s ease;
    -moz-transition : width 1s ease;
    -o-transition : width 1s ease;
    transition : width 1s ease;
  }
</style>
