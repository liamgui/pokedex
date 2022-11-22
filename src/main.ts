import "./style.css";

import { ApolloClient, InMemoryCache } from "@apollo/client/core";
import { DefaultApolloClient } from "@vue/apollo-composable";
import { createHead } from "@vueuse/head";
import { createApp, h, provide } from "vue";
import { createRouter, createWebHistory } from "vue-router";
import routes from "~pages";

import App from "./App.vue";

const router = createRouter({
	history: createWebHistory(),
	routes
});

const cache = new InMemoryCache();

const apolloClient = new ApolloClient({
	uri: import.meta.env.VITE_POKEMON_GRAPHQL_API_URL,
	cache,
});

const app = createApp({
	setup () {
		provide(DefaultApolloClient, apolloClient);
	},

	render: () => h(App),
});

const head = createHead();
app.use(head);
app.use(router);
app.mount("#app");
