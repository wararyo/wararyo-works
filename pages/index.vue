<!-- 全体の構造を示す部分 CMS等との通信は全てここで行う -->
<template>
  <section class="container">
    <hero/>
    <navigation :categories="categories" />
    <!-- <category-description /> -->
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

  data: function() {
    return {
      categories: {},
      posts: [],
    };
  },

  watch: {
    categoryObject: {
      handler: function (val,old) {
        if(old !== void 0) if(old.sys.id == val.sys.id) return;
        this.posts = [];
        client.getEntries({
          'content_type':'work',
          'fields.categories.sys.id[in]': val.sys.id
        }).then((entries => {
          this.posts = entries.items;
        })).catch(console.error);
      },
      immediate: true
    }
  },

  computed: {
    category () {
      if(this.$route.params.category == null)
        return process.env.defaultCategorySlug;
      return this.$route.params.category;
    },
    work () {
      if(this.$route.params.work == null) return "";
      return this.$route.params.work;
    },
    categoryObject () {
      let categoryID = "";
      let category = this.category;
      let c = this.categories.filter(function (item) {
        return item.fields.slug == category;
      });
      return c[0];
    },

  }

}

//Initialize Contentful
var client = contentful.createClient({
  space: process.env.contentful.space,
  accessToken: process.env.contentful.accessToken
});

</script>

<style>
.container {
  text-align: center;
}
</style>

