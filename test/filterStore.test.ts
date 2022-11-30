import { mount } from "@vue/test-utils";
import { useFilterStore } from "../src/stores/useFilterStore";
import { beforeEach, describe, expect, it, test } from "vitest";
import { setActivePinia, createPinia, storeToRefs } from "pinia";

describe("Index", () => {
	beforeEach(() => {
		setActivePinia(createPinia());
	});
	
	// test("changes view type ", async () => {

	// 	const { setViewType } = useFilterStore();
	// 	const { viewType } = storeToRefs(useFilterStore());
	// 	expect(viewType.value).toBe("grid");
	// 	setViewType("list");
	// 	expect(viewType.value).toBe("list");

	// });

	// test favorite filter
	test("changes favorite filter ", async () => {
		
		const { toggleFavoriteView } = useFilterStore();
		const { filters } = storeToRefs(useFilterStore());
		expect(filters.value.isFavorite).toBe(undefined);
		toggleFavoriteView();
		expect(filters.value.isFavorite).toBe(true);
		toggleFavoriteView();
		expect(filters.value.isFavorite).toBe(null);

	});

	// test types filter
	test("changes type filter ", async () => {
		
		const { setFilter } = useFilterStore();
		const { filters } = storeToRefs(useFilterStore());
		expect(filters.value.type).toBe(undefined);
		setFilter("fire", "type");
		expect(filters.value.type).toBe("fire");
		setFilter("blue", "type");
		expect(filters.value.type).toBe("blue");
		expect(filters.value.type).not.toBe("fire");
		setFilter(null, "type");
		expect(filters.value.type).not.toBe("blue");
		expect(filters.value.type).toBe(null);


	});		

	// test search filter
	test("changes search filter ", async () => {
		
		const { updateSearch } = useFilterStore();
		const { search } = storeToRefs(useFilterStore());
		expect(search.value).toBe("");
		updateSearch("pikachu");
		expect(search.value).toBe("pikachu");
		updateSearch("charmander");
		expect(search.value).toBe("charmander");
		updateSearch("");
		expect(search.value).toBe("");

	});
});