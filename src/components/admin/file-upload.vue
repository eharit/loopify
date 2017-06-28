<template>
  <div id="dropzone">
    <file-upload>
      <input type="hidden" name="token" value="xxx">
    </file-upload>
  </div>
</template>
<script>
export default {
  name: 'Dropzone',
  components: {
    'file-upload': () => import('vue2-dropzone'),
  },
};
</script>
<style lang="scss">
</style>
