import { defineStore } from "pinia";
import { Ref, ref } from "vue";

export type Filters = {
	[key: string]: string;
}

export const useFilterStore = defineStore("filters", () => {	
	const filters: Ref<Record<string, string | number | boolean>> = ref({});

	function setFilter(value: string | number | boolean, key: string) {
		filters.value[key] = value;
	}

	return {
		filters,
		setFilter
	};
});
