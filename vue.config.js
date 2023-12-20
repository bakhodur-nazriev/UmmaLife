const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  publicPath: process.env.NODE_ENV === 'production' ? '/' : '/',
  devServer: {
    port: 8082,
    webSocketServer: false,
    historyApiFallback: true,
    proxy: {
      '/api': {
        target: 'preview.https://ummalife.com',
        changeOrigin: true,
        headers: {
          'X-Forwarded-Host': 'preview.ummalife.com',
          Host: 'preview.ummalife.com'
        }
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
})
