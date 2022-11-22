import "./style.css";
import { createHead } from "@vueuse/head";
import { createRouter, createWebHistory } from "vue-router";
import App from "./App.vue";

const router = createRouter({
	history: createWebHistory(),
	routes
});


const app = createApp({
	render: () => h(App),
});

const head = createHead();
app.use(head);
app.use(router);
app.mount("#app");
