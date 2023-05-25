const {defineConfig} = require('@vue/cli-service')
module.exports = defineConfig({
  devServer: {
    historyApiFallback: true,
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
      useDefaultFontLoader: false,
    },
  },

  chainWebpack: (config) => {
    // Remove the existing fonts rule
    config.module.rules.delete('fonts');

    // Add the new fonts rule
    config.module
      .rule('fonts')
      .test(/\.(woff2?|eot|ttf|otf)(\?.*)?$/i)
      .use('url-loader')
      .loader('url-loader')
      .tap((options) => {
        options = {
          limit: 8192, // You can adjust this limit based on your project's needs
          name: 'fonts/[name].[hash:8].[ext]',
        };
        return options;
      })
      .end();
  },
})
