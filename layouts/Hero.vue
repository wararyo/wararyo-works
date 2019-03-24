<!-- 何かかっこいいことを書く -->
<template>
	<div class="hero">
      <h1 class="hero-title">
        wararyo's work
      </h1>
      <h2 class="hero-catch">
        <span class="is-punctuation"><span>見て、</span></span><span class="is-punctuation"><span>聴いて、</span></span><span><span>触って</span></span><br>
        <span><span>気持ちいいものを</span></span><span class="is-punctuation"><span>作るためなら、</span></span><span class="is-punctuation"><span>手段を選びません。</span></span>
      </h2>
      <div class="hero-description">
        <p>
          <span>wararyoが大好きなこと、</span>
          <span>それは、</span><br>
          <span>自分が見て、聴いて、</span>
          <span>触って楽しいものを、</span>
          <span>自分の手で作ることです。</span>
        </p>
        <p>
          <span>そのために、</span>
          <span>Flashゲームから始まり、</span>
          <span>アプリ開発、</span>
          <span>電子工作、</span>
          <span>Webデザイン、</span><br>
          <span>UIデザイン、</span>
          <span>作曲・編曲など</span>
          <span>様々なジャンルを学びながら、</span>
          <span>作品を作っています。</span>
        </p>
        <p>
          <span>ここ&quot;wararyo's work&quot;は、</span>
          <span>そんなwararyoの作品を</span>
          <span>一望できるよう、</span>
          <span>できる限り全て揃えることを</span>
          <span>目標にしています。</span>
        </p>
      </div>
      <span @click="scroll()"><nuxt-link to="" class="hero-button">作品を見る</nuxt-link></span>
      <p v-if="$isIE">このサイトはInternet Explorerでの動作を保証していません。</p>
    </div>
</template>

<script>
export default {
  methods: {
    scroll () {
      if(document.querySelector('#navigation').getBoundingClientRect().height == 0) {
        this.$SmoothScroll(
          document.querySelector('#navigation-mobile'),
          800,
          null,
          null,
          'y'
        );
      }
      else {
        this.$SmoothScroll(
          document.querySelector('#navigation'),
          800,
          null,
          null,
          'y'
        );
      }
    }
  }
}
</script>

<style lang="scss">
.hero {
  min-height: calc(84vh - 72px);
  padding: 24px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  color: #35495e;
}

.hero-title {
  padding: 4px 24px 8px;
  position: absolute;
  top: 48px;
  left: 50%;
  transform: translateX(-50%);
  display: block;
  color: #FFF;
  background-color: #35495e;
  font-family: "Quicksand", "Source Sans Pro", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
  font-weight: lighter;
  font-size: 2em;
  letter-spacing: 1px;
  animation: fadein 0.8s cubic-bezier(0.04, 0.83, 0.29, 1) 0s forwards;
}
.hero-catch {
  padding: 120px 0 28px 16px;
  font-size: 2.7em;
  font-weight: 700;
  font-style: normal;
  > span {
    display: inline-block;
    overflow: hidden;
    line-height: 1em;
    &.is-punctuation {
      margin-right: -0.3em !important;
    }
    &.is-punctuation + span {
      margin-right: 0em;
    }
    > span {
      display: block;
      opacity: 0;
      animation: heromovein 1s cubic-bezier(0.04, 0.83, 0.29, 1) forwards;
    }
    &:nth-of-type(1) > span {animation-delay: 0.4s;}
    &:nth-of-type(2) > span {animation-delay: 0.7s;}
    &:nth-of-type(3) > span {animation-delay: 1.0s;}
    &:nth-of-type(4) > span {animation-delay: 1.1s;}
    &:nth-of-type(5) > span {animation-delay: 1.3s;}
    &:nth-of-type(6) > span {animation-delay: 2s;}
  }
}
.hero-description {
  font-weight: 300;
  font-size: 1em;
  word-spacing: 5px;
  padding-bottom: 15px;
  opacity: 0;
  animation: herofadein 1s cubic-bezier(0.04, 0.83, 0.29, 1) 2.8s forwards;

  p {
    margin-bottom: 16px;
    span {
      display: inline-block;
      margin-right: -8px;
    }
  }
}

.hero-button {
  position: relative;
  margin: 16px;
  padding: 10px 30px;
  display: inline-block;
  color: $blue-gray;
  text-decoration: none;
  transition: all .1s;
  opacity: 0;
  animation: herofadein 1s cubic-bezier(0.04, 0.83, 0.29, 1) 3s forwards;
  &:before {
    content: "";
    display: block;
    position: absolute;
    top: -8px;
    bottom: -8px;
    left: -8px;
    right: -8px;
    border: 12px solid;
    border-image: url('~assets/nav-border.png') 24;
  }
}
.hero-button:hover {
  color: $white;
  background-color: $blue-gray;
}

@keyframes heromovein {
  0% {transform: translateY(100%); opacity: 0;}
  100% {transform: translateY(0);opacity: 1;}
}

@keyframes herofadein {
  0% {transform: translateY(4px); opacity: 0;}
  100% {transform: translateY(0);opacity: 1;}
}

@include mq(sp){
  .hero {
    min-height: calc(90vh - 12px);
    padding: 8px;
  }
  .hero-title {
    font-size: 1.6em;
    width: 100%;
    display: block;
    line-height: 56px;
    padding: 0;
    top: 0;
    left: 0;
    transform: none;
  }
  .hero-catch {
    font-size: 1.6em;
    padding: calc(4vh + 64px) 4px 32px;
    > span {
      display: inline-block;
      &.is-punctuation {
        margin-right: -0.4em !important;
      }
      &.is-punctuation + span {
        margin-right: 0em;
      }
    }
  }
  .hero-description {
    padding-bottom: 0;
    font-size: 0.9em;
  }
  .hero-button {
    background-color: rgba(255,255,255,.6);
  }
}

</style>