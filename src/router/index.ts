import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    redirect: "/home"
  },
  {
    path: "/home",
    name: "home",
    component: () => import("../2023/环境相关问题.md")
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes
});



export default router;
