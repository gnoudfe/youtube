import { createRouter, createWebHistory } from "vue-router";
import HomePage from "../pages/HomePage.vue";
import AboutPage from "../pages/AboutPage.vue";
import DefaultLayout from "../layouts/DefaultLayout.vue";
import VideoDetailLayout from "../layouts/VideoDetailLayout.vue";
import VideoDetailPage from "../pages/VideoDetailPage.vue";
import AuthorDetailPage from "../pages/AuthorDetailPage.vue";
import SearchPage from "../pages/SearchPage.vue";
const routers = [
  {
    path: "/",
    component: HomePage,
    name: "Homepage",
    meta: {
      layout: DefaultLayout,
    },
  },
  {
    path: "/about",
    component: AboutPage,
    name: "Aboutpage",
    meta: {
      layout: VideoDetailLayout,
    },
  },
  {
    path: "/:id",
    name: "videodetails",
    component: VideoDetailPage,
    meta: {
      layout: VideoDetailLayout,
    },
  },
  {
    path: "/channel/:id",
    name: "authordetails",
    component: AuthorDetailPage,

    meta: {
      layout: DefaultLayout,
    },
  },
  {
    path: "/search",
    name: "searchPage",
    component: SearchPage,

    meta: {
      layout: DefaultLayout,
    },
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: routers,
});

export default router;
