const DEFAULT_ENVIRONMENT = 'production';
const DEFAULT_CONFIG_PATH = '/config';

export class VueRuntimeConfigPlugin {
  app = null;

  configPath = DEFAULT_CONFIG_PATH;
  environment = DEFAULT_ENVIRONMENT;

  config = {};

  get defaultConfigUri() {
    return `${this.configPath}/default.config.json`;
  }

  get environmentConfigUri() {
    return `${this.configPath}/${this.environment}.config.json`;
  }

  get $runtimeConfig() {
    return {
      ...this.config.staticConfig,
      ...this.config.default ?? {},
      ...this.config[this.environment] ?? {},
    };
  }

  constructor({
    configPath = DEFAULT_CONFIG_PATH,
    staticConfig = {},
  } = {}) {
    this.config.staticConfig = staticConfig || {};
    this.configPath = configPath || DEFAULT_CONFIG_PATH;
  }

  #privateLoadConfigFile(uri) {
    return new Promise((resolve, reject) => {
      const request = new XMLHttpRequest();

      request.onload = () => {
        resolve(JSON.parse(request.responseText));
      };

      request.onerror = () => {
        reject(
            `failed to load config file form "${uri}"`);
      };

      request.open('GET', uri);

      request.send();
    });
  }

  /**
   * Sets the environment and fetches the environment config file if not already loaded.
   *
   * @param environment
   * @param forceFetch
   *
   * @returns {Promise<*>}
   */
  async loadEnvironment({
    environment = DEFAULT_ENVIRONMENT,
    forceFetch = false,
  } = {}) {
    this.environment = environment;

    forceFetch
    ? this.config.default
        = await this.#privateLoadConfigFile(this.defaultConfigUri)
    : this.config.default
        ??= await this.#privateLoadConfigFile(this.defaultConfigUri);

    forceFetch
    ? this.config[this.environment]
        = await this.#privateLoadConfigFile(this.environmentConfigUri)
    : this.config[this.environment]
        ??= await this.#privateLoadConfigFile(this.environmentConfigUri);

    if (this.app) {
      this.install(this.app);
    }

    return this.$runtimeConfig;
  }

  install(app) {

    this.app = app;

    app.config.globalProperties.$config = this.$runtimeConfig;
    app.config.globalProperties.$vueRuntimeConfigPlugin = this;
  }

}

export default (new VueRuntimeConfigPlugin());
