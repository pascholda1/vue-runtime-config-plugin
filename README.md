# @pascholda1/vue-runtime-config-plugin

A VueJS plugin to read JSON config files per environment at runtime.

Works with Vue2. Vue3 support coming soon.

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
  const config = await vueRuntimeConfigPlugin.loadEnvironment({
    environment: process.env.NODE_ENV,
    forceFetch: false
  });

  console.log(config)

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
  const config = await vueRuntimeConfigPlugin.loadEnvironment({
    environment: process.env.NODE_ENV,
    forceFetch: false
  });

  console.log(config)

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

### Config Files and Config merging

Your config directory should contain min. two Files. The `default.config.json` and the one for each environment
eg. `development.config.json`

the environment config will be merged into the default config which will be merged into the static config which was
passed to the constructor.

If you use nested configurations in your file the plugin will overwrite the whole first level Object. 


