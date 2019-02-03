<!-- 何かかっこいいことを書く -->
<template>
	<div class="hero">
      <h1 class="hero-title">
        wararyo's work
      </h1>
      <h2 class="hero-catch">
        <span class="is-punctuation">見て、聴いて、触って。</span><br>
        <span>気持ちいいものを</span><span class="is-punctuation">作るためなら、</span><span class="is-punctuation">手段を選びません。</span>
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
    </div>
</template>

<script>
export default {
  methods: {
    scroll () {
      console.log("hoge");
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
</script>

<style lang="scss">
.hero {
  min-height: calc(84vh - 48px);
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
}
.hero-catch {
  padding: 96px 0 32px 16px;
  font-size: 2.7em;
  font-family: 'Noto Sans JP', sans-serif;
  font-weight: 700;
  font-style: normal;
}
.hero-description {
  font-weight: 300;
  font-family: 'Noto Sans JP', sans-serif;
  font-size: 1em;
  word-spacing: 5px;
  padding-bottom: 15px;

  p {
    margin-bottom: 16px;
    span {
      display: inline-block;
      margin-right: -8px;
    }
  }
}

.hero-button {
  margin: 16px;
  padding: 10px 30px;
  display: inline-block;
  border-radius: 4px;
  border: 1px solid $blue-gray;
  color: $blue-gray;
  font-family: 'Noto Sans JP';
  text-decoration: none;
  transition: all .1s;
}
.hero-button:hover {
  color: $white;
  background-color: $blue-gray;
}

@include mq(sp){
  .hero {
    min-height: 90vh;
    padding: 8px;
  }
  .hero-title {
    font-size: 1.6em;
    width: 100%;
    display: block;
    line-height: 56px;
    top: 0;
    left: 0;
    transform: none;
  }
  .hero-catch {
    font-size: 1.6em;
    padding: 80px 4px 32px;
    span {
      display: inline-block;
      margin-right: -8px;
      &.is-punctuation {
        padding-left: 0.6em;
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