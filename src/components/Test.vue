<template>
  <div id='test'>
    <h1>Test</h1>
    <p>{{msg}}</p>
  </div>
</template>
<script>
export default {
  name: 'test',
  data: function data() {
    return {
      msg: 'Hello',
    };
  },
  mounted() {
    // this.$log.log(this);
  },
};
</script>
<style>
</style>
