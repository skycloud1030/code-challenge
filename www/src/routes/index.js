import VueRouter from "vue-router";
import PageNotFound from "./404.vue";
import Attendance from "../container/attendance/index.vue";

const routes = [
  { path: "/", redirect: { name: "challenge" } },
  {
    path: "/challenge",
    component: Attendance,
    name: "challenge",
    meta: { name: "challenge" },
  },
  { path: "*", component: PageNotFound },
];

const router = new VueRouter({
  // mode: "history",
  routes,
  scrollBehavior(to, from, savedPosition) {
    return { x: 0, y: 0 };
  },
});
export default router;
