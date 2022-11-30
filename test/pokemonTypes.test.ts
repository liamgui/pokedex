import { mount } from "@vue/test-utils";
import PokemonTypes from "~/components/PokemonTypes.vue";
import { beforeEach, describe, expect, test } from "vitest";
import { setActivePinia, createPinia } from "pinia";

describe("PokemonTypes", () => {
	beforeEach(() => {
		setActivePinia(createPinia());
	});
	
	test("mount component and with props", async () => {
		expect(PokemonTypes).toBeTruthy();

		const wrapper = mount(PokemonTypes, {
			props: {
				types: ["fire", "blue"],
			},
		});
		
		//check class name
		expect(wrapper.html()).toContain("type-fire");
		//check type text
		expect(wrapper.html()).toContain("fire");
		
		//check class name
		expect(wrapper.html()).toContain("type-blue");
		//check type text
		expect(wrapper.html()).toContain("blue");
	});

	test("mount component without props", async () => {
		expect(PokemonTypes).toBeTruthy();

		const wrapper = mount(PokemonTypes, {
			props: {
				types: []
			},
		});
		
		// check if no types are rendered
		expect(wrapper.html()).not.toContain("type-");
	});
});