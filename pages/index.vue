<!-- 全体の構造を示す部分 CMS等との通信は全てここで行う -->
<template>
  <section class="container">
    <hero/>
    <navigation :categories="categories" />
    <p>category = {{$route.params.category}}</p>
    <p>work = {{$route.params.work}}</p>
    <category-description />
    <!-- <nuxt-child /> -->
    <!-- <contents :posts="posts" /> -->
    <footer>
      <p>&copy; wararyo</p>
    </footer>
  </section>
</template>

<script>
import Hero from '~/layouts/Hero.vue'
import Navigation from '~/layouts/Navigation.vue'
import CategoryDescription from '~/layouts/CategoryDescription.vue'
import Contents from '~/layouts/Contents.vue'

var contentful = require('contentful')

export default {
  components: {
    Hero,
    Navigation,
    CategoryDescription,
    Contents
  },

  data: function() {
    return {

    };
  },

  watch: {

  },

  /*asyncData () {
    return client.getEntries({
      'content_type':'work',
      'fields.categories.sys.id[in]':'4edF79nhl1tkYcZJJ0s4KF'
    }).then((entries => {
      return {
        posts: entries.items
      };
    })).catch(console.error);
  },*/

  asyncData () {
    return client.getEntries({'content_type':'category'})
    .then((entries => {
      return {
        categories: entries.items
      };
    })).catch(console.error);
  }

}

//Initialize Contentful
var client = contentful.createClient({
  space: 'vlu6hvdg3cmf',
  accessToken: '69559523b19be9eec1faf2fd6ae3314d24f6ed07b74f0fd96de92b5d208611bf'
});

</script>

<style>
.container {
  text-align: center;
}
</style>

