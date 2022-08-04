<template>
  <div class="list-blog d-flex flex-column w-100">
    <PreLoad :preload="preload" />
    <div
      class="list-blog-header d-flex justify-content-between align-items-center"
    >
      <div class="search-bar d-flex w-75 align-items-end">
        <b-form-input
          v-model="keyword"
          placeholder="Enter Search"
          class="input-custom"
        ></b-form-input>
        <b-button v-on:click="search()" variant="info" class="mx-2"
          ><b-icon icon="search"></b-icon
        ></b-button>
        <b-button v-on:click="reset()"
          ><b-icon icon="arrow-repeat"></b-icon
        ></b-button>
      </div>
      <div class="search-bar d-flex">
        <b-button v-on:click="createBlog()" variant="success"
          ><b-icon icon="plus"></b-icon>Create Blog</b-button
        >
      </div>
    </div>
    <div class="list-blog-main d-flex flex-column">
      <Tables
        :items="data"
        :fields="fields"
        :itemsPerPage="10"
        caption="List Blog"
      >
        <template #cell(created_at)="{ item }">
          <div v-if="item.created_at" class="group-btn bg-midnight text-tahiti">
            {{
              item.created_at === null
                ? "-"
                : moment(item.created_at).format("DD/MM/YYYY")
            }}
          </div>
        </template>

        <template #cell(updated_at)="{ item }">
          <div v-if="item.updated_at" class="group-btn bg-midnight text-tahiti">
            {{
              item.updated_at === null
                ? "-"
                : moment(item.updated_at).format("DD/MM/YYYY")
            }}
          </div>
        </template>

        <template #cell(url)="{ item }">
          {{ item.image.url }}
        </template>

        <template #cell(action)="{ item }">
          <div class="item-action d-flex justify-content-between">
            <router-link
              :to="`/blog/edit/${item.id}`"
              class="item-action-edit d-flex justify-content-center align-items-center"
              ><b-icon icon="pencil"></b-icon>
            </router-link>
            <div
              class="item-action-delete d-flex justify-content-center align-items-center"
              v-on:click="deleteBlog(item.id)"
            >
              <b-icon icon="trash"></b-icon>
            </div>
            <div
              class="item-action-view d-flex justify-content-center align-items-center"
              v-on:click="viewImage(item.image.url)"
            >
              <b-icon icon="eye"></b-icon>
            </div>
          </div>
        </template>
      </Tables>
      <div class="d-flex justify-content-center w-100 mt-5">
        <Pagination
          :totalpage="totalPage"
          :currentPage="currentPage"
          v-on:update-page="updatePage"
        />
      </div>
    </div>

    <b-modal v-model="isShowModalView" size="lg" hide-header hide-footer>
      <img :src="urlImage" alt="" style="width: 100%" />
    </b-modal>
    <b-modal v-model="isShowModalDelete" size="lg" hide-header hide-footer>
      API bị lỗi, k call được
    </b-modal>
  </div>
</template>

<script>
// @ is an alias to /src
import { mapActions, mapGetters } from "vuex";
import Tables from "@/components/Table.vue";
import BlogCard from "@/components/BlogCard.vue";
import Pagination from "@/components/Pagination.vue";
import PreLoad from "@/components/PreLoad.vue";
import { tableFields } from "@/utils/table-fields";
import moment from "moment";

export default {
  name: "ListBlog",
  layout: "main",
  head() {
    return {
      title: "List Blog",
    };
  },
  created() {
    const request = {
      page: 1,
      offset: 10,
      search: "",
    };
    this.getListBlog(request);
    this.moment = moment;
  },
  computed: {
    ...mapGetters(["listBlog", "message", "success", "error"]),
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
  data() {
    return {
      page: 1,
      data: [],
      fields: tableFields.LIST_BLOG,
      currentPage: 1,
      totalPage: 1,
      isShowModalView: false,
      urlImage: null,
      isShowModalDelete: false,
      id: null,
      keyword: "",
      preload: true,
    };
  },
  components: {
    Tables,
    BlogCard,
    Pagination,
    PreLoad,
  },
  methods: {
    ...mapActions({
      getListBlog: "getListBlog",
    }),

    updatePage(page) {
      this.page = page;
      const request = {
        page: this.page,
        offset: 10,
        search: "",
      };
      this.getListBlog(request);
      this.preload = true;
    },

    viewImage(url) {
      this.urlImage = url;
      this.isShowModalView = true;
    },

    confirmDelete(id) {
      this.id = id;
      this.isShowModalView = true;
    },

    createBlog() {
      this.$router.push("/blog/create");
    },

    search() {
      const request = {
        page: 1,
        offset: 10,
        search: this.keyword,
      };
      this.getListBlog(request);
      this.preload = true;
    },

    reset() {
      const request = {
        page: this.page,
        offset: 10,
        search: "",
      };
      this.getListBlog(request);
      this.keyword = "";
      this.preload = true;
    },
  },
};
</script>

<style lang="scss" scoped>
.list-blog {
  &-header {
    color: $orange;
    .input-custom {
      width: 500px;
    }
  }
  .item-action {
    &-edit {
      height: 30px;
      cursor: pointer;
      width: 30px;
      border: 1px solid $orange;
      color: $orange;
    }
    &-delete {
      height: 30px;
      cursor: pointer;
      width: 30px;
      border: 1px solid $red;
      color: $red;
    }
    &-view {
      height: 30px;
      cursor: pointer;
      width: 30px;
      border: 1px solid $darkgreen;
      color: $darkgreen;
    }
  }
}
</style>
