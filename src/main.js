import Vue from "vue";
import App from "./App.vue";
import JsonTree from "vue-json-tree";
Vue.component("json-tree", JsonTree);

Vue.config.productionTip = false;
const app = new Vue({
  el: "#app",
  render: (h) => h(App)
});
