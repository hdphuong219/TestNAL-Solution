<template>
  <div class="home">
    <PreLoad :preload="preload" />
    <div class="home-header d-flex justify-content-center">
      <div class="home-header-title">List Blog</div>
    </div>
    <div class="home-content p-5">
      <b-container fluid>
        <b-row
          ><b-col cols="12" lg="3" v-for="(item, index) in data" :key="index"
            ><BlogCard
              :id="item.id"
              :title="item.title"
              :content="item.content"
              :time="
                item.created_at === null
                  ? '-'
                  : moment(item.created_at).format('DD/MM/YYYY')
              "
              :comments_count="item.comments_count"
              :imgUrl="item.image.url"
          /></b-col>
          <div class="d-flex justify-content-center w-100 mt-5">
            <Pagination
              :totalpage="totalPage"
              :currentPage="currentPage"
              v-on:update-page="updatePage"
            />
          </div>
        </b-row>
      </b-container>
    </div>

    <div class="home-footer">
      <router-link to="/blog/list">Management</router-link>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import { mapActions, mapGetters } from "vuex";
import BlogCard from "@/components/BlogCard.vue";
import Pagination from "@/components/Pagination.vue";
import PreLoad from "@/components/PreLoad.vue";
import moment from "moment";

export default {
  name: "Home",
  layout: "main",
  head() {
    return {
      title: "List Blog",
    };
  },
  created() {
    const request = {
      page: 1,
      offset: 8,
      search: "",
    };
    this.getListBlog(request);
    this.moment = moment;
  },
  data() {
    return {
      data: [],
      currentPage: 1,
      totalPage: 1,
      preload: true,
    };
  },
  watch: {
    listBlog() {
      this.preload = true;
      this.data = this.listBlog.data.items;
      this.totalPage = this.listBlog.pagination.total;
      this.currentPage = this.listBlog.pagination.page;
      this.preload = false;
    },
  },
  components: {
    BlogCard,
    Pagination,
    PreLoad,
  },
  computed: {
    ...mapGetters(["listBlog", "message", "success", "error"]),
  },
  methods: {
    ...mapActions({
      getListBlog: "getListBlog",
    }),

    updatePage(page) {
      this.page = page;
      const request = {
        page: this.page,
        offset: 8,
        search: "",
      };
      this.getListBlog(request);
      this.preload = true;
    },
  },
};
</script>

<style lang="scss" scoped>
.home {
  // padding: 50px;
  width: 100%;
  &-header {
    &-title {
      font-size: 25px;
      font-weight: 600;
    }
  }
  &-footer {
    a {
      color: $orange;
      font-size: 20px;
    }
  }
}
</style>
