const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  publicPath: process.env.NODE_ENV === 'production' ? '/' : '/',
  devServer: {
    historyApiFallback: true,
    allowedHosts: 'all',
    proxy: {
      '/api': {
        target: 'https://ummalife.com',
        changeOrigin: true
      }
    }
  },
  transpileDependencies: true,

  pluginOptions: {
    i18n: {
      locale: 'ru',
      fallbackLocale: 'en',
      localeDir: 'locales',
      enableLegacy: false,
      runtimeOnly: false,
      compositionOnly: false,
      fullInstall: true
    },
    fontLoader: {
      enabled: true,
      useDefaultFontLoader: false
    }
  }

  // chainWebpack: (config) => {
  //   // Remove the existing fonts rule
  //   config.module.rules.delete('fonts');

  //   // Add the new fonts rule
  //   config.module
  //     .rule('fonts')
  //     .test(/\.(woff2?|eot|ttf|otf)(\?.*)?$/i)
  //     .use('url-loader')
  //     .loader('url-loader')
  //     .tap((options) => {
  //       options = {
  //         limit: 8192, // You can adjust this limit based on your project's needs
  //         name: 'fonts/[name].[hash:8].[ext]',
  //       };
  //       return options;
  //     })
  //     .end();

  //   config.plugin('define').tap((definitions) => {
  //     definitions[0]['process.env']['VUE_APP_DOMAIN_NAME'] = JSON.stringify(process.env.VUE_APP_DOMAIN_NAME);
  //     return definitions;
  //   });
  // }
})
