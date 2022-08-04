<template>
  <router-link
    v-bind:to="'/blog/detail/' + id"
    class="blogCard d-flex flex-column position-relative"
  >
    <div
      class="blogCard-img"
      :style="'background-image: url(' + imgUrl + ')'"
    ></div>
    <div class="blogCard-main">
      <div class="blogCard-main-time">{{ time }}</div>
      <div class="blogCard-main-title">{{ title }}</div>
      <div class="blogCard-main-content">{{ content }}</div>
    </div>
    <div
      class="blogCard-comments_count position-absolute d-flex justify-content-center align-items-center"
      v-if="comments_count > 0"
    >
      {{ comments_count }}
    </div>
  </router-link>
</template>

<script>
export default {
  name: "BlogCard",
  props: {
    id: {
      type: Number,
      default() {
        return null;
      },
    },
    title: {
      type: String,
      default() {
        return "";
      },
    },
    imgUrl: {
      type: String,
      default() {
        return "";
      },
    },
    content: {
      type: String,
      default() {
        return "";
      },
    },
    time: {
      type: String,
      default() {
        return "";
      },
    },
    comments_count: {
      type: Number,
      default() {
        return 0;
      },
    },
  },
};
</script>

<style lang="scss" scoped>
.blogCard {
  width: 100%;
  margin: 10px;
  border-radius: 30px;
  border-right: 8px solid $orange;
  border-bottom: 8px solid $orange;
  &:hover {
    text-decoration: none;
  }
  &-img {
    width: 100%;
    background-position: center center;
    background-color: $white;
    background-size: cover, 60%;
    object-fit: cover;
    height: 0;
    padding-bottom: 67%;
    border-radius: 20px 20px 0 0;
    border: 1px solid #000;
    border-bottom: unset;
  }
  &-comments_count {
    height: 50px;
    width: 50px;
    background: $orange;
    right: 20px;
    top: 20px;
    border-radius: 50%;
    color: $white;
    font-weight: 600;
  }
  &-main {
    height: 200px;
    background: $white;
    border-radius: 0 0 20px 20px;
    padding: 20px;
    border: 1px solid #000;
    border-top: unset;
    &-time {
      font-size: 22px;
      color: $orange;
    }
    &-title {
      font-size: 30px;
      color: $black;
      font-weight: 600;
      white-space: nowrap;
      width: 100%;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    &-content {
      font-size: 20px;
      color: $black;
      white-space: nowrap;
      width: 100%;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
}
</style>
