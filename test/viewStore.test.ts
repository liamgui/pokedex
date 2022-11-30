import { mount } from "@vue/test-utils";
import { useViewStore } from "./../src/stores/useViewStore";
import { beforeEach, describe, expect, it, test } from "vitest";
import { setActivePinia, createPinia, storeToRefs } from "pinia";

describe("Index", () => {
	beforeEach(() => {
		setActivePinia(createPinia());
	});
	
	test("changes view type ", async () => {

		const { setViewType } = useViewStore();
		const { viewType } = storeToRefs(useViewStore());
		expect(viewType.value).toBe("grid");
		setViewType("list");
		expect(viewType.value).toBe("list");

	});
	test("changes selected pokemon type for view ", async () => {

		const { setSelectedPokemonType } = useViewStore();
		const { selectedPokemonType } = storeToRefs(useViewStore());
		expect(selectedPokemonType.value).toBe("");
		setSelectedPokemonType("fire");
		expect(selectedPokemonType.value).toBe("fire");

		setSelectedPokemonType("brown");
		expect(selectedPokemonType.value).toBe("brown");

	});
});