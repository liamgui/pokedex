import "./style.css";
import "element-plus/dist/index.css";

import { ApolloClient, InMemoryCache } from "@apollo/client/core";
import { DefaultApolloClient } from "@vue/apollo-composable";
import { createHead } from "@vueuse/head";
import ElementPlus from "element-plus";
import { createPinia } from "pinia";
import { createApp, h, provide } from "vue";
import { createRouter, createWebHistory } from "vue-router";
import routes from "~pages";

import App from "./App.vue";

const router = createRouter({
	history: createWebHistory(),
	routes
});

const cache = new InMemoryCache({
	typePolicies: {
		Query: {
			fields: {
				pokemons: {
					// Don't cache separate results based on
					// any of this field's arguments.
					keyArgs: false,
					
					merge(existing = {edges: []}, incoming, options) {
						//if there are no more incoming edges, return the existing edges
						if (!incoming || !incoming.edges.length) return existing;
						//return incoming if not a fetchmore
						if (options.args?.query.offset === 0) return incoming;
						// Concatenate the incoming list of edges with
						// the existing list of edges.
						const edges = [...new Set([...existing.edges, ...incoming.edges])];
						return {...existing, ...incoming, edges};
					},
				},
			}
		}
	}
});

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
const pinia = createPinia();

app.use(head);
app.use(ElementPlus);
app.use(router);
app.use(pinia);

app.mount("#app");
