<template>
  <div>
    <nuxt/>
  </div>
</template>

<style lang="scss">
html {
  font-family: 'Noto Sans CJK JP', 'Noto Sans JP', "Source Sans Pro", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
  background: url('~assets/bg.png') center/110px 191.5px fixed, linear-gradient(#fffff4,#e0e6d5) fixed;
}

*, *:before, *:after {
  box-sizing: border-box;
  margin: 0;
}

ul {
  list-style-type: none;
  padding: 0;
}

@include mq(sp){
  html {
    //モバイル時Webフォントつかわない
    font-family: 'Noto Sans CJK JP', "Source Sans Pro", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
  }
}
</style>