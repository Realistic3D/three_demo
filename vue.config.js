const { defineConfig } = require('@vue/cli-service')
const path = require('path');

module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    static: {directory: path.join(__dirname, 'public')},
    allowedHosts: "all",
    port: 8081,
  },
  chainWebpack: (config) => {
    config.plugins.delete('hmr');
  },
})
