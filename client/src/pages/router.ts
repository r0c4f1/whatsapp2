import { createMemoryHistory, createRouter } from "vue-router";

import Login from "../components/Login.vue";
import Main from "../Main.vue";

const routes = [
  { path: "/main", component: Main },
  { path: "/", component: Login },
];

export const router = createRouter({
  history: createMemoryHistory(),
  routes,
});
