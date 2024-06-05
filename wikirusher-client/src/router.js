import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

export default new Router({
  mode: "history",
  routes: [
    {
      path: "/",
      name: "home",
      component: () => import("./components/home")
    },
    {
      path: "/room",
      alias: "/rooms",
      name: "room",
      component: () => import("./components/room/list")
    },
    {
      path: "/room/join",
      name: "room-join",
      component: () => import("./components/room/join")
    },
    {
      path: "/room/create",
      name: "room-create",
      component: () => import("./components/room/create")
    },
    {
      path: "/room/update",
      name: "room-update",
      component: () => import("./components/room/update")
    },
    {
      path: "/room/question",
      name: "room-question",
      component: () => import("./components/room/index")
    },
    {
      path: "/legalnotice",
      name: "legalnotice",
      component: () => import("./components/legalnotice/index")
    }
  ]
});
