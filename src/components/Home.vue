<template>
  <div id='home' class="section">
    <div class="container">
      <new-page v-if="$root.user.uid"></new-page>
      <!-- <button @click="$root.setData()">setdata</button> -->
      <hr v-if="$root.user.uid">
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
  </div>
</template>
<script>
export default {
  name: 'home',
  data: function data() {
    return {
      pages: this.$root.pages,
      blocks: this.$root.blocks,
      content: this.$root.content,
    };
  },
  components: {
    'new-page': () => import('./admin/new-page'),
  },
};
</script>
<style>
</style>
