import { defineStore } from "pinia";
import { Ref, ref } from "vue";

export type Filters = {
	[key: string]: string;
}

export const useFilterStore = defineStore(
	"filters",
	() => {	
		const filters: Ref<Record<string, string | number | boolean | null>> = ref({});
		const search: Ref<string> = ref("");

		function setFilter(value: string | number | boolean | null, key: string) {
			filters.value[key] = value;
		}

		function updateSearch(value: string) {
			search.value = value;
		}

		return {
			filters,
			setFilter,
			search,
			updateSearch
		};
	}
);
