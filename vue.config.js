const { defineConfig } = require('@vue/cli-service');

module.exports = defineConfig({
  transpileDependencies: true,

  devServer: {
    port: 8080,
    https: true,
    proxy: {
      '^/api': {
        target: 'http://localhost:9000',
      },
    },
  },
});
