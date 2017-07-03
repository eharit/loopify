# loopify

> A lightweight CMS for small SPA's featuring medium.js on screen editing, drag and drop block redistribution on page, dynamic component routing and importing. Currently served by a Firebase db/storage backend.

## Build Setup

``` bash
# install dependencies
npm install

# create a firebase app
https://console.firebase.google.com/

# get your config details (Add Firebase to your web app) from the overview page and rename /src/helpers/firebase.config.sample.js to firebase config.js and replace config data respectively
https://console.firebase.google.com/project/<your_project_id>/overview

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report

# run unit tests
npm run unit

# run e2e tests
npm run e2e

# run all tests
npm test
```

For detailed explanation on how things work, checkout the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
