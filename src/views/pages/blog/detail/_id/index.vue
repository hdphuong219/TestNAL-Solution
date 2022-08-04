<template>
  <div class="d-flex flex-column">
    <h3>{{ title }}</h3>
    <h5>{{ content }}</h5>
    <img :src="image" alt="" />
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  name: "DetailBlog",
  created() {
    this.id = this.$route.params.id;
    this.detailBlogByID(this.id);
  },
  data() {
    return {
      title: "",
      content: "",
      image: null,
      id: null,
    };
  },
  computed: {
    ...mapGetters(["detailBlog", "message", "success", "error"]),
  },
  watch: {
    detailBlog() {
      this.title = this.detailBlog.title;
      this.content = this.detailBlog.content;
      this.image = this.detailBlog.image.url;
    },
  },
  methods: {
    ...mapActions({
      detailBlogByID: "detailBlogByID",
    }),
  },
};
</script>

<style lang="scss" scoped>
img {
  width: 300px;
  height: 300px;
  object-fit: cover;
}
</style>
