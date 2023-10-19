import "../src/main.css";

import { createApp } from "vue";
import { createPinia } from "pinia";
import mitt from 'mitt';
import App from "./App.vue";
import router from "./router/router";
const pinia = createPinia();
const app = createApp(App);
const eventBus = mitt();
app.use(router);
app.use(pinia);
app.mount("#app");
app.provide('eventBus',eventBus);