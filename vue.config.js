const { defineConfig } = require('@vue/cli-service');

module.exports = defineConfig({
  transpileDependencies: true,
  css: {
    loaderOptions: {
      sass: {
        additionalData: `
          @import "@/assets/styles/_variables.sass"
          @import "@/assets/styles/global.sass"
        `
      }
    }
  },
  publicPath: process.env.NODE_ENV === 'production'
    ? '/weather-forecast/'  // Replace <REPO_NAME> with the name of your repository
    : '/'
});
