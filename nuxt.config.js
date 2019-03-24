module.exports = {
  server: {
    host: '192.168.20.24', // デフォルト: localhost
  },
  /*
  ** Headers of the page
  */
  head: {
    title: 'wararyo\'s work',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'og:site_name', property: 'og:site_name', content: 'wararyo\'s work' },
      { hid: 'og:type', property: 'og:type', content: 'website' },
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:site', content: '@wararyo' },
      { content: 'replace' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet', href: '/nuxt-loading.css' }
    ],
    script: [
      { src: '/navigation-canvas.js' },
    ]
  },
  env: {
    contentful: {
      space: 'vlu6hvdg3cmf',
      accessToken: '69559523b19be9eec1faf2fd6ae3314d24f6ed07b74f0fd96de92b5d208611bf'
    },
    defaultCategorySlug: 'pick-up'
  },
  plugins: [
    '~/plugins/scroll-directive',
    '~/plugins/smooth-scroll',
    '~/plugins/user-agent'
  ],
  modules: [
    '@nuxtjs/style-resources',
    ['@nuxtjs/google-analytics',{id:'UA-133749103-1'}],
    'nuxt-webfontloader',
  ],
  styleResources: {
    sass: [
      '~/assets/breakpoints.scss',
      '~/assets/variables.scss'
    ]
  },
  webfontloader: {
    google: {
      families: ['Noto+Sans+JP:400,700']
    }
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

