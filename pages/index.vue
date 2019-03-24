<!-- 全体の構造を示す部分 CMS等との通信は全てここで行う -->
<template>
  <section class="container">
    <work-modal :work="postObject"/>
    <div class="blurable" :class="{blurred: postObject !== void 0}">
      <hero/>
      <navigation :categories="categories" />
      <!-- <category-description /> -->
      <!-- <nuxt-child /> -->
      <div class="contents-container" id="navigation-mobile">
        <navigation-mobile :categories="categories" :categoryObject="categoryObject" />
        <contents :posts="posts" :is-big="category == defaultCategory" />
      </div>
      <footer>
        <p>&copy; wararyo</p>
      </footer>
    </div>
  </section>
</template>

<script>
import Hero from '~/layouts/Hero.vue'
import Navigation from '~/layouts/Navigation.vue'
import NavigationMobile from '~/layouts/NavigationMobile.vue'
import CategoryDescription from '~/layouts/CategoryDescription.vue'
import Contents from '~/layouts/Contents.vue'
import WorkModal from '~/components/WorkModal.vue'

var contentful = require('contentful')

export default {

  components: {
    Hero,
    Navigation,
    NavigationMobile,
    CategoryDescription,
    Contents,
    WorkModal
  },

  asyncData () {
    return client.getEntries({
      'content_type':'category',
      'order':'fields.emphasized'
    }).then((entries => {
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
        //this.$nextTick(() => { this.$nuxt.$loading.start(); });
        client.getEntries({
          'content_type':'work',
          'fields.categories.sys.id[in]': val.sys.id,
          'order':'-fields.createdAt'
        }).then((entries => {
          this.posts = entries.items;
          //this.$nuxt.$loading.finish();
        })).catch(console.error);
      },
      immediate: true
    }
  },

  computed: {
    defaultCategory () {
      return process.env.defaultCategorySlug;
    },
    category () {
      if(this.$route.params.category === void 0)
        return process.env.defaultCategorySlug;
      return this.$route.params.category;
    },
    post () {
      if(this.$route.params.work === void 0) return "";
      return this.$route.params.work;
    },
    categoryObject () {
      let category = this.category;
      let c = this.categories.filter(function (item) {
        return item.fields.slug == category;
      });
      if(c.length == 0) {
        c = this.categories.filter(function (item) {
          return item.fields.slug == process.env.defaultCategorySlug;
        });
      }
      return c[0];
    },
    postObject () {
      if(this.post == "") return void 0;
      let post = this.post;
      let p = this.posts.filter(function (item) {
        return item.fields.slug == post;
      });
      return p[0];
    }
  }

}

//Initialize Contentful
var client = contentful.createClient({
  space: process.env.contentful.space,
  accessToken: process.env.contentful.accessToken
});

</script>

<style lang="scss">
.container {
  text-align: center;
}
.contents-container {
  position: relative;
}
footer {
  margin: 24px;
}

.blurable {
  transition: filter .2s ease-in-out;
}
.blurred {
  filter: blur(2px);
}

@include mq(sp){
  .blurred {
    filter: none;
  }
}
</style>

