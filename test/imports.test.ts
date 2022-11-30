import { describe, test, expect } from "vitest";
describe("import vue components", () => {
	test("normal imports as expected", async () => {
		const cmp = await import("~/components/FavoriteButton.vue");
		expect(cmp).toBeDefined();
	});

	test("template string imports as expected", async () => {
		// eslint-disable-next-line @typescript-eslint/quotes
		const cmp = await import("~/components/FavoriteButton.vue");
		expect(cmp).toBeDefined();
	});

	test("dynamic imports as expected", async () => {
		const name = "FavoriteButton";
		const cmp = await import(`~/components/${name}.vue`);
		expect(cmp).toBeDefined();
	});
});
