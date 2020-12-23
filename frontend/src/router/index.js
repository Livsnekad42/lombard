import Vue from "vue";
import VueRouter from "vue-router";
import Main from "../views/Main";
import SignIn from "../views/adminpanel/SignIn";
import AdminMain from "../views/adminpanel/AdminMain";
import MapControl from "../views/adminpanel/control-panels/MapControl";
import DocumentControl from "../views/adminpanel/control-panels/DocumentControl";
import CommentControl from "../views/adminpanel/control-panels/CommentsControl";
import store from "../store";

const ifNotAuth = (to, from, next) => {
  if ( !store.getters.isLoggedIn ) {
    next();
    return;
  }
  next("/admin-panel");
}

const ifAuth = (to, from, next) => {
  if ( store.getters.isLoggedIn ) {
    next();
    return;
  }
  next("/sign-in-admin");
}

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Main",
    component: Main
  },
  {
    path: "/sign-in-admin",
    name: "SignIn",
    component: SignIn,
    beforeEnter: ifNotAuth
  },
  {
    path: "/admin-panel",
    name: "AdminPanel",
    component: AdminMain,
    children: [
      {
        path: "",
        name: "mapControl",
        component: MapControl,
        beforeEnter: ifAuth,
        meta: {
          requiresAuth: true
        }
      },
      {
        path: "/admin-panel/documents",
        name: "documentLoad",
        component: DocumentControl,
        beforeEnter: ifAuth,
        meta: {
          requiresAuth: true
        }
      },
      {
        path: "/admin-panel/comments",
        name: "comments",
        component: CommentControl,
        beforeEnter: ifAuth,
        meta: {
          requiresAuth: true
        }
      }
    ]
  },
  {
    path: "*",
    redirect: { name: 'Main' }
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
