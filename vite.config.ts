import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import Pages from "vite-plugin-pages";
import { VitePluginFonts } from "vite-plugin-fonts";

export default defineConfig({
	resolve: {
		alias: {
			"@": "/src/",
			"~": "/src/",
		},
	},
	plugins: [
		vue(),
		Pages(),
		VitePluginFonts({
			google: {
				families: [
					{
						name: "Lato",
						styles: "wght@300;400;700;900",
					}
				],
			},
		}),
	],
});
