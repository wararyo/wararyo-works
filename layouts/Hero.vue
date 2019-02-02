<!-- 何かかっこいいことを書く -->
<template>
	<div class="hero">
      <h1 class="hero-title">
        wararyo Works
      </h1>
      <h2 class="hero-catch">
        &emsp;何かかっこいいことを書く。
      </h2>
      <span class="hero-description">
        wararyo's portfolio Nuxt.js project
      </span>
    </div>
</template>

<style lang="scss">
.hero {
  min-height: calc(100vh - 200px);
  padding: 24px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;
  color: #35495e;
}

.hero-title {
  position: absolute;
  top: 48px;
  left: 50%;
  transform: translateX(-50%);
  display: block;
  font-family: "Quicksand", "Source Sans Pro", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif; /* 1 */
  font-weight: lighter;
  font-size: 2em;
  letter-spacing: 1px;
}
.hero-catch {
  font-size: 3em;
}
.hero-description {
  font-weight: 300;
  font-size: 2em;
  word-spacing: 5px;
  padding-bottom: 15px;
}
</style>