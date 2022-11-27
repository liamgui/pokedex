import { defineStore } from "pinia";
import { Ref, ref } from "vue";

//typing filters a little more strongly for now
export type Filters = {
	// [key: string]: string;
	isFavorite: boolean;
	type: string;
}

export const useFilterStore = defineStore(
	"filters",
	() => {	
		const filters: Ref<Record<string, string | number | boolean | null>> = ref({});
		const search: Ref<string> = ref("");

		function setFilter(value: string | number | boolean | null, key: keyof Filters) {
			filters.value[key] = value;
		}

		function toggleFavoriteView() {
			if (!filters.value.isFavorite) return setFilter(true, "isFavorite");
			return setFilter(null, "isFavorite");
		}

		function updateSearch(value: string) {
			search.value = value;
		}

		return {
			filters,
			setFilter,
			toggleFavoriteView,
			search,
			updateSearch
		};
	}
);
