/// <reference types="vitest" />


import { defineConfig } from "vite";
import Vue from "@vitejs/plugin-vue";
import Pages from "vite-plugin-pages";
import { VitePluginFonts } from "vite-plugin-fonts";
import svgLoader from "vite-svg-loader";

import { createRequire } from "node:module";
const require = createRequire(import.meta.url);
const pkg = require("./package.json");

export default defineConfig({
	resolve: {
		alias: {
			"@": "/src/",
			"~": "/src/",
		},
	},
	plugins: [
		Vue(),
		Pages({
			importMode: "async",
		}),
		VitePluginFonts({
			google: {
				families: [
					{
						name: "Fira Sans",
						styles: "wght@300;400;700;800;900",
					}
				],
			},
		}),
		svgLoader()
	],
	build: {
		rollupOptions: {
			// make sure to externalize deps that shouldn't be bundled
			// into your library
			external: Object.keys(pkg.dependencies),
			// output: {
			// 	// Provide global variables to use in the UMD build
			// 	// for externalized deps
			// 	globals: {
			// 		vue: "Vue",
			// 		"vue-router": "VueRouter",
			// 		pinia: "Pinia",
			// 		vite: "Vite",
			// 		"vite-plugin-pages": "VitePluginPages",
			// 		"vite-plugin-fonts": "VitePluginFonts",
			// 		"vite-svg-loader": "ViteSvgLoader",

			// 	}
			// }
		}
	},
	test: {
		globals: true,
		environment: "jsdom"
	},
});
