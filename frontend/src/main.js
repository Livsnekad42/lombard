import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "slick-carousel/slick/slick.css";
import VueMask from "v-mask";
import * as VueGoogleMaps from "vue2-google-maps";
Vue.use(VueMask);
Vue.use(VueGoogleMaps, {
  load: {
    key: "AIzaSyDO6gE-CKjr3ZzFfVVMjxmK5hD1CUUfi4o",
    libraries: "places"
  }
});
// Or as a directive
import { VueMaskDirective } from "v-mask";
Vue.directive("mask", VueMaskDirective);
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
