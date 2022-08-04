<template>
  <div class="text-center">
    <div class="layoutAdmin d-flex flex-column">
      <div
        class="layoutAdmin-header d-flex justify-content-start align-items-center"
      >
        <router-link to="/">
          <b-icon icon="chevron-left" color="white"></b-icon>
        </router-link>
      </div>
      <div class="layoutAdmin-main d-flex">
        <slot />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    createBlog() {
      this.$router.push("/blog/create");
    },
  },
};
</script>

<style lang="scss" scoped>
.layoutAdmin {
  width: 100vw;
  height: 100%;
  &-header {
    height: 80px;
    background: rgb(77, 162, 223);
    padding: 0 50px;
    color: white;
    font-size: 18px;
    font-weight: 600;
  }
  &-main {
    min-height: calc(100vh - 80px);
    padding: 50px 100px;
  }
}
</style>
