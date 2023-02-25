# @pascholda1/vue-runtime-config-plugin

## Installation

```shell
npm i @pascholda1/vue-runtime-config-plugin
```

## Usage

### Basic Usage

````javascript

import Vue from 'vue';

import vueRuntimeConfigPlugin from '@pascholda1/vue-runtime-config-plugin';

Vue.use(vueRuntimeConfigPlugin)

(async () => {

  // fetch the config files from /config
  await vueRuntimeConfigPlugin.loadEnvironment({
    environment: process.env.NODE_ENV,
    forceFetch: false
  });

  // init App
  new Vue({
    render: h => h(App),
  }).$mount('#app');
})


````

### Advanced Usage

````javascript

import Vue from 'vue';

import {VueRuntimeConfigPlugin} from '@pascholda1/vue-runtime-config-plugin';

const vueRuntimeConfigPlugin = new VueRuntimeConfigPlugin({
  configPath: "/my/config/path",
  staticConfig: process.env
})

Vue.use(vueRuntimeConfigPlugin)

(async () => {

  // fetch the config files from /config
  await vueRuntimeConfigPlugin.loadEnvironment({
    environment: process.env.NODE_ENV,
    forceFetch: false
  });

  // init App
  new Vue({
    render: h => h(App),
  }).$mount('#app');
})


````

### Access the configuration Object / Switch environment while runtime

````vue

<template>
  <div id="app">
    <pre>{{ $config }}</pre>
  </div>
</template>

<script>

export default {
  name: 'App',
  created() {
    console.log(this.$config)
  },
  methods: {
    async switchConfigEnvironment(environment) {
      await this.$vueRuntimeConfigPlugin.loadEnvironment({
        environment
      });

      // Note that the $config object is NOT reactive
      await this.$forceUpdate()
    }
  }
};
</script>


````
