// main.js
import { createApp } from "vue";
import App from "./App.vue";
import router from "./router/index.ts";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { createPinia } from "pinia";

const pinia = createPinia();

createApp(App).use(pinia).use(router).mount("#app");
