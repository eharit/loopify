<template>
  <section class="section">
    <div class="container">
      <div class="heading">
        <h1 class="title">{{content.title}}</h1>
        <h2 class="subtitle">
          {{content.subtitle}}
        </h2>
      </div>
    </div>
  </section>
</template>
<script>
export default {
  name: 'Page2',
  data: function data() {
    return {

    };
  },
  props: ['content'],
};
</script>
<style>
</style>
