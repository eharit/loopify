<template>
  <div class="">
    <section class="hero is-dark is-admin" v-if="$root.user.uid" :style="heroStyle">
      <div class="hero-body">
        <div class="level">
          <new-page></new-page>
          <!-- <button @click="$root.setData()">setdata</button> -->
        </div>
        <div class="level dropbox">
          <input type="file"
            :name="uploadFieldName"
            :disabled="loading"
            @change="filesChange($event.target.name, $event.target.files);
            fileCount = $event.target.files.length"
            accept="image/*"
            class="input-file" />
            <p v-if="!loading">
              Drag your file(s) here to begin<br> or click to browse
            </p>
            <p v-else>
              Uploading files...
            </p>
        </div>
      </div>
    </section>
    <section class="section">
      <div class="container">
        <h1 class="title is-1">Hello</h1>
        <div class="content">
          <p>
          <b>This is some static content</b> ipsum ut, finibus bibendum lectus. Fusce pharetra laoreet lectus, vel feugiat risus cursus bibendum. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Pellentesque eu odio consectetur, tincidunt nunc ut, dignissim nulla. Proin efficitur consequat tortor posuere ullamcorper. Phasellus rutrum a ipsum at egestas. Duis ut dignissim orci. Maecenas mauris risus, mattis sed lacinia quis, pretium ut purus. Donec vitae quam nec lacus consequat tempus vitae non dolor. Nullam et pulvinar orci. Mauris quis ante lorem. Quisque tortor diam, lacinia a efficitur a, porta ut eros. Pellentesque condimentum rutrum dignissim. Vestibulum tellus nibh, fermentum a aliquam ut, sodales nec elit. Curabitur tortor metus, rutrum nec augue in, facilisis iaculis nulla.
          </p>
          <p>
          Quisque ullamcorper eget ex non tristique. Etiam purus turpis, laoreet eu mattis vel, sollicitudin vel eros. Phasellus venenatis risus blandit, pretium nisi ut, gravida augue. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Suspendisse volutpat blandit urna, rhoncus rutrum nibh porta vel. Morbi a neque quis nisi luctus volutpat. Maecenas lobortis urna ullamcorper libero commodo finibus. Maecenas accumsan maximus risus nec hendrerit. Suspendisse ut consectetur urna.
          </p>
          <p>
          Nullam ultricies, ipsum eu accumsan mollis, risus sapien efficitur sapien, quis rhoncus odio nisi non urna. Phasellus varius pellentesque aliquet. Nulla tristique massa et nulla dignissim feugiat. Vestibulum malesuada orci at eros elementum hendrerit. Aenean non euismod nisl. Pellentesque diam enim, interdum vitae odio non, vulputate mattis justo. Maecenas euismod ante nulla, non rutrum nisl consequat in. Nulla sagittis convallis orci id vehicula. Suspendisse gravida turpis mi, ac sagittis augue venenatis a. Vivamus iaculis lectus at lectus egestas accumsan. Proin dignissim lectus vel pharetra aliquam. Praesent malesuada venenatis elit, eget placerat tellus mattis eget. Morbi in felis ex.
          </p>
        </div>
      </div>
    </section>
  </div>
</template>
<script>
export default {
  name: 'home',
  data() {
    return {
      pages: this.$root.pages,
      blocks: this.$root.blocks,
      content: this.$root.content,
      uploadFieldName: 'myUploadField',
      loading: this.$root.loading,
      imgUrl: this.$root.imgUrl,
    };
  },
  methods: {
    filesChange(name, fileList) {
      if (fileList) {
        this.$log.log(name);
        this.$root.uploadFile(fileList);
        this.$root.loading = true;
      }
    },
  },
  components: {
    'new-page': () => import('./admin/new-page'),
    // dropzone: () => import('vue2-dropzone'),
  },
  computed: {
    heroStyle() {
      return `background-image: url(${this.$root.imgUrl})`;
    },
  },
};
</script>
<style>
  .hero {
    background-position: 50%;
    background-size: cover;
  }
  .dropbox {
    outline: 1px dashed dimgray; /* the dash box */
    outline-offset: -10px;
    background: whitesmoke;
    color: dimgray;
    padding: 10px 10px;
    min-height: 100px; /* minimum height */
    position: relative;
    cursor: pointer;
    border-radius: 10px;
    opacity: 33%;
  }

  .input-file {
    opacity: 0; /* invisible but it's there! */
    width: 100%;
    height: 200px;
    position: absolute;
    cursor: pointer;
  }

  .dropbox:hover {
    opacity: 1; /* when mouse over to the drop zone, change color */
  }

  .dropbox p {
    font-size: 1.2em;
    text-align: center;
    padding: 50px 0;
    margin: auto;
  }
</style>
