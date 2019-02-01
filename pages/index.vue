<!-- 全体の構造を示す部分 CMS等との通信は全てここで行う -->
<template>
  <section class="container">
    <hero/>
    <navigation :categories="categories" />
    <p>category = {{$route.params.category}}</p>
    <p>work = {{$route.params.work}}</p>
    <category-description />
    <!-- <nuxt-child /> -->
    <contents :posts="posts" />
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

  asyncData () {
    return client.getEntries({'content_type':'category'})
    .then((entries => {
      return {
        categories: entries.items
      };
    })).catch(console.error);
  },

  /*validate({ params }) {
    //WorkとCategoryはなくても可
    if(params.work == null) return true;
    if(params.category == null) return true;
    for(let c in this.categories) {
      if(c.fields.slug == this.category)
        return true;
    }
    return false;
  },*/

  data: function() {
    return {
      categories: {},
      posts: [],
    };
  },

  watch: {
    categoryObject (val) {
      client.getEntries({
        'content_type':'work',
        'fields.categories.sys.id[in]': val.sys.id
      }).then((entries => {
        this.posts = entries.items;
      })).catch(console.error);
    }
  },

  computed: {
    category () {
      if(this.$route.params.category == null) return "pick-up";
      return this.$route.params.category;
    },
    work () {
      if(this.$route.params.work == null) return "";
      return this.$route.params.work;
    },
    categoryObject (val) {
      let categoryID = "";
      let category = this.category;
      let c = this.categories.filter(function (item) {
        return item.fields.slug == category;
      });
      return c[0];
    },

  }

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

