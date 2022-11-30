import { mount } from "@vue/test-utils";
import FavoriteButton from "~/components/FavoriteButton.vue";
import { beforeEach, describe, expect, test, vi } from "vitest";
import { setActivePinia, createPinia } from "pinia";

describe("FavoriteButton", () => {
	beforeEach(() => {
		vi.mock("~/composables/useFavorites", () => {
			return {useFavorites: () => {
				return {
					// change props to match your useFavorites implementation
					toggleFavorite: () => {
						console.log("toggleFavorite");
					},
				};
			}};
		});
	});

	test("mount component and with props", async () => {
		expect(FavoriteButton).toBeTruthy();

		const wrapper = mount(FavoriteButton, {
			props: {
				pokemon: {
					id: 1,
					name: "bulbasaur",
					image: "",
					types: ["grass", "poison"],
					isFavorite: false,
				},
			},
		});
		expect(wrapper.html()).not.toContain("isFavorite");
		wrapper.find("button").trigger("click");
		// expect(wrapper.html()).toContain("isFavorite");
		wrapper.find("button").trigger("click");
		expect(wrapper.html()).not.toContain("isFavorite");
	});

});