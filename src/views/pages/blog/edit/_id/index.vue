<template>
  <div class="create-blog w-100">
    <h3>Edit Blog</h3>
    <b-container>
      <b-row
        ><b-col cols="12" lg="8"
          ><div class="d-flex flex-column">
            <label class="d-flex justify-content-start">Title:</label>
            <b-form-input
              v-model="title"
              placeholder="Enter Title"
              required
            ></b-form-input>

            <label class="d-flex justify-content-start mt-5">Content:</label>
            <b-form-textarea
              v-model="content"
              placeholder="Enter Content..."
              rows="3"
              max-rows="6"
            ></b-form-textarea>
          </div> </b-col
        ><b-col cols="12" lg="4">
          <b-overlay :show="loadingImg">
            <label for="img1" class="w-100">
              <div
                class="data-image-item position-relative"
                :class="image == null ? 'cursor-pointer' : 'cursor-default'"
              >
                <img
                  src="@/assets/img/iconCamera.png"
                  alt=""
                  class="position-absolute img-icon"
                  v-if="!url"
                />
                <img
                  :src="url"
                  alt=""
                  class="position-absolute img-main"
                  v-else
                />
              </div>
            </label>
            <input
              type="file"
              class="d-none"
              id="img1"
              @change="selectImage"
              accept="image/png, .jpeg, .jpg"
            />
          </b-overlay> </b-col
      ></b-row>
      <div class="d-flex w-100 justify-content-center my-5">
        <b-button
          variant="primary"
          class="mx-2"
          v-on:click="handleEdit()"
          :disabled="isLoading"
          >Edit</b-button
        >
        <b-button variant="secondary" class="mx-2" v-on:click="handleCancel()"
          >Cancel</b-button
        >
      </div>
    </b-container>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  name: "EditBlog",
  data() {
    return {
      title: "",
      content: "",
      image: null,
      id: null,
      url: null,
      loadingImg: false,
      isLoading: false,
    };
  },
  created() {
    this.id = this.$route.params.id;
    this.detailBlogByID(this.id);
  },
  computed: {
    ...mapGetters(["detailBlog", "message", "success", "error"]),
  },
  watch: {
    detailBlog() {
      this.title = this.detailBlog.title;
      this.content = this.detailBlog.content;
      this.url = this.detailBlog.image.url;
    },
    success() {
      if (this.success) {
        this.$toaster.success(this.message);
        this.$store.commit("set", ["message", ""]);
        this.$store.commit("set", ["success", false]);
        this.$router.push("/blog/list");
      }
    },

    error() {
      if (this.error) {
        this.$toaster.error(this.message);
        this.$store.commit("set", ["message", ""]);
        this.$store.commit("set", ["error", false]);
      }
    },
  },
  methods: {
    ...mapActions({
      detailBlogByID: "detailBlogByID",
      editBlogs: "editBlogs",
    }),

    async handleEdit() {
      this.isLoading = true;
      if (this.title == "") {
        this.$toaster.error("Title is required field");
      } else if (this.content == "") {
        this.$toaster.error("Content is required field");
      } else {
        const dataForm = new FormData();
        dataForm.append("blog[id]", this.id);
        dataForm.append("blog[title]", this.title);
        dataForm.append("blog[content]", this.content);
        dataForm.append("blog[image]", this.image);
        await this.editBlogs(dataForm);
        this.isLoading = false;
      }
    },

    selectImage(e) {
      if (e.target.files[0].size / 1024 / 1024 > 10) {
        this.$toaster.error("image size is too big");
      } else {
        this.image = e.target.files[0];
        this.url = URL.createObjectURL(this.image);
      }
    },

    handleCancel() {
      this.$router.push("/blog/list");
    },
  },
};
</script>

<style lang="scss" scoped>
.data-image {
  &:hover {
    .img-trash {
      display: block;
    }
  }

  &-item {
    cursor: pointer;
    background: #cccccc;
    padding-top: 100%;
    width: 100%;
    box-shadow: 2px 2px 2px #4d4d4d33;
    @include screen(01199) {
      padding-top: 80%;
      width: 80%;
    }
    @include screen(991) {
      padding-top: 100%;
      width: 100%;
    }

    img {
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 100%;
      object-fit: cover;
      height: auto;
    }

    .img-icon {
      width: 60px;
      height: auto;
      @include screen(480) {
        width: 35px;
      }
    }

    .img-main {
      height: 100% !important;
      width: 100% !important;
    }
  }
  .img-trash {
    display: none;
    top: 0% !important;
    right: 0% !important;
    cursor: pointer;
    width: 50px;
  }
}
</style>
