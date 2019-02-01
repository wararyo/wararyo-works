module.exports = {
  /*
  ** Headers of the page
  */
  head: {
    title: 'wararyo-works',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'wararyoのポートフォリオサイトです。' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ],
    script: [
      { src: '/navigation-canvas.js' }
    ]
  },
  env: {
    contentful: {
      space: 'vlu6hvdg3cmf',
      accessToken: '69559523b19be9eec1faf2fd6ae3314d24f6ed07b74f0fd96de92b5d208611bf'
    },
    defaultCategorySlug: 'pick-up'
  },
  /*
  ** Customize the progress bar color
  */
  loading: { color: '#3B8070' },
  /*
  ** Build configuration
  */
  build: {
    /*
    ** Run ESLint on save
    */
    extend (config, { isDev, isClient }) {
      if (isDev && isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }
  }
}

