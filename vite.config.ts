/// <reference types="vitest" />

import { defineConfig } from "vite";
import Vue from "@vitejs/plugin-vue";
import Pages from "vite-plugin-pages";
import { VitePluginFonts } from "vite-plugin-fonts";
import svgLoader from "vite-svg-loader";

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
	test: {
		globals: true,
		environment: "jsdom"
	},
});
