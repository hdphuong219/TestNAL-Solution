import Vue from "vue";
import VueRouter from "vue-router";
import page404 from "../views/pages/404.vue";
import ListBlog from "../views/pages/blog/list";
import CreateBlog from "../views/pages/blog/create";
import EditBlog from "../views/pages/blog/edit/_id";
import DetailBlog from "../views/pages/blog/detail/_id";
import Home from "../views/pages/blog";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/blog/list",
    name: "ListBlog",
    component: ListBlog,
  },
  {
    path: "/blog/create",
    name: "CreateBlog",
    component: CreateBlog,
  },
  {
    path: "/blog/edit/:id",
    name: "EditBlog",
    component: EditBlog,
  },
  {
    path: "/blog/detail/:id",
    name: "DetailBlog",
    component: DetailBlog,
  },
  {
    path: "/pages/404",
    name: "page404",
    component: page404,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  linkActiveClass: "active",
  scrollBehavior: () => ({ y: 0 }),
  routes,
});

//set head
router.afterEach((to, from) => {
  let component = to.matched[0].components.default;
  Vue.nextTick(() => {
    let head = "";
    if (component.head) {
      head = component.head();
    }
    document.title = head.title || "HaDuyPhuong-VueJS";
    document.meta = head.meta;
  });
});

export default router;
