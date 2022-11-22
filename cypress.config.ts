import { defineConfig } from "cypress";

export default defineConfig({
	projectId: "f7oymj",

	e2e: {
		setupNodeEvents(on, config) {
			// implement node event listeners here
		},
	},

	component: {
		devServer: {
			framework: "vue",
			bundler: "vite",
		},
	},
});
