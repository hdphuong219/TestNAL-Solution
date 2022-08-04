import Vue from "vue";
import Vuex from "vuex";
import { Urls } from "../utils/urls";
import { Api } from "../utils/http-common";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    success: false,
    error: false,
    message: "",
    listBlog: {},
    detailBlog: {},
  },
  getters: {
    listBlog: (state) => state.listBlog,
    success: (state) => state.success,
    error: (state) => state.error,
    message: (state) => state.message,
    detailBlog: (state) => state.detailBlog,
  },
  mutations: {
    // Setters
    set(state, [variable, value]) {
      state[variable] = value;
    },
  },
  actions: {
    async getListBlog({ commit }, request) {
      const page = request.page;
      const offset = request.offset;
      const search = request.search;
      await Api.requestServer
        .get(`/${Urls.BLOGS}?page=${page}&offset=${offset}&search=${search}`)
        .then((response) => {
          const { data } = response;
          if (data) {
            commit("set", ["listBlog", data]);
          }
        })
        .catch((error) => {});
    },

    async createBlogs({ commit }, request) {
      await Api.requestServer
        .post(`/${Urls.BLOGS}`, request)
        .then((response) => {
          const { data } = response;
          if (data) {
            commit("set", ["message", "Create successful blogs"]);
            commit("set", ["success", true]);
          } else {
            commit("set", ["message", "error"]);
            commit("set", ["error", true]);
          }
        })
        .catch((error) => {});
    },

    async editBlogs({ commit }, request) {
      await Api.requestServer
        .put(`/${Urls.BLOGS}/${request.get("blog[id]")}`, request)
        .then((response) => {
          const { data } = response;
          if (data) {
            commit("set", ["message", "Edit successful blogs"]);
            commit("set", ["success", true]);
          } else {
            commit("set", ["message", "error"]);
            commit("set", ["error", true]);
          }
        })
        .catch((error) => {});
    },

    async detailBlogByID({ commit }, id) {
      await Api.requestServer
        .get(`/${Urls.BLOGS}/${id}`)
        .then((response) => {
          const { data } = response;
          if (data) {
            commit("set", ["detailBlog", data.data]);
          }
        })
        .catch((error) => {});
    },

    // deleteBlog({ commit }, id) {
    //   Api.requestServer
    //     .delete(`/${Urls.BLOGS}/${id}`)
    //     .then((response) => {
    //       const { data } = response;
    //       if (data) {
    //         commit("set", ["listBlog", data]);
    //       }
    //     })
    //     .catch((error) => {});
    // },
  },
});
