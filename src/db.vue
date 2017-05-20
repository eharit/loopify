<template>
  <div id="db">

  </div>
</template>
<script>
export default {
  name: "db",
  data() {
    return {
      db: {
        routes: {
          _route1: {
            routeName: String,
            title: String,
            index: Number,
            blocks: [
              '_block1',
              '_block2',
            ],
            contents: {
              _block1: '_content1',
              _block2: '_content2',
            },
            options: {
              _option1: String,
              _option2: String,
            },
          },
          _route2: {
            routeName: String,
            title: String,
            index: Number,
            blocks: [
              '_block1',
              '_block2',
            ],
            contents: {
              _block1: '_content1',
              _block2: '_content2',
            },
            options: {
              _option1: String,
              _option2: String,
            },
          },
        },
        blocks: {
          _block1: {
            component: String,
            options: {
              _option1: String,
              _option2: String,
            },
          },
          _block2: {
            component: String,
            options: {
              _option1: String,
              _option2: String,
            },
          },
        },
        contents: {
          _content1: {
            _field1: String,
            _field2: String,
            options: {
              _option1: String,
              _option2: String,
            },
          },
          _content2: {
            _field1: String,
            _field2: String,
            options: {
              _option1: String,
              _option2: String,
            },
          },
        },
      },
    },
  },
}
</script>
<style>
</style>
