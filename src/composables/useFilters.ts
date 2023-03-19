import { ref, Ref } from "vue";
import { PokemonFilterInput } from "~/graphql/types";
import { debounce } from "~/utils/debounce";

const filters: Ref<Record<string, string | number | boolean | null>> = ref({});
const search: Ref<string> = ref("");

export function useFilters() {

	function setFilter(value: string | number | boolean | null, key: keyof PokemonFilterInput) {
		filters.value[key] = value;
	}

	function toggleFavoriteView() {
		if (!filters.value.isFavorite) return setFilter(true, "isFavorite");
		return setFilter(null, "isFavorite");
	}

	const updateSearch = debounce((value: string) => {
		search.value = value;
	}, 500);


	return {
		filters,
		setFilter,
		toggleFavoriteView,
		search,
		updateSearch
	};
}