<template>
  <section class="hero is-medium is-info is-bold">
    <div class="hero-body">
      <div class="container">
        <h1 class="title is-1">
          {{content.title}}
        </h1>
        <h2 class="subtitle is-3">
          {{content.subtitle}}
        </h2>
      </div>
    </div>
  </section>
</template>
<script>
export default {
  name: 'Page1',
  data: function data() {
    return {

    };
  },
  props: ['content'],
};
</script>
<style>
</style>
