import { useQuery } from "@vue/apollo-composable";
import { pokemonNameQuery, pokemonsQuery, pokemonTypesQuery } from "~/graphql/queries";
import { computed, ComputedRef, Ref, ref, watch } from "vue";
import { Pokemon, PokemonFilterInput, PokemonQueryInput } from "~/types";
import { useFilterStore } from "~/stores/useFilterStore";
import { storeToRefs } from "pinia";

export function usePokemonQuery() {
	const limit: Ref<number> = ref(20);
	const offset: Ref<number> = ref(0);
	const filter: Ref<PokemonFilterInput> = ref({});
	const search: Ref<string> = ref("");
	// const count: Ref<number> = ref(0);

	const { query, loading, error, result, fetchMore, refetch, onResult, onError } = useQuery(pokemonsQuery, () => ({
		limit: limit.value,
		offset: offset.value,
		filter: filter.value,
		search: search.value,
	}));

	const pokemons: ComputedRef<Pokemon[]> = computed((): Pokemon[] => {
		return result.value?.pokemons.edges || [];
	});

	const count: ComputedRef<number> = computed((): number => {
		return result.value?.pokemons.count || 0;
	});

	const loadMore = async () => {
		offset.value += limit.value;
		await fetchMore({
			variables: {
				limit: limit.value,
				offset: offset.value,
				filter: filter.value,
				search: search.value,
			},
		});
	};

	//watch filters for changes (both search and filters)
	const store = useFilterStore();
	store.$subscribe(() => {
		const { filters: filtersStore, search: searchStore } = storeToRefs(store);
		offset.value = 0;
		filter.value = filtersStore.value;
		search.value = searchStore.value;
		refetch(
			{
				limit: limit.value,
				offset: 0,
				filter: filtersStore.value,
				search: searchStore.value,
			}
		);
	});

	return {
		limit,
		offset,
		pokemons,
		data: result,
		query,
		loading,
		error,
		loadMore,
		onResult,
		count
	};
}

export function usePokemonByNameQuery(name: string) {
	const pokemonName: Ref<string> = ref(name);
	const { query, result, loading, error, refetch } = useQuery(pokemonNameQuery, () => ({
		name: pokemonName.value,
	}));
	
	const pokemon = computed((): Pokemon => {
		return result.value?.pokemonByName || {};
	});

	return {
		pokemonName,
		pokemon,
		data: result,
		query,
		loading,
		error,
		refetch
	};
}

export function usePokemonTypesQuery() {
	const { query, result, loading, error } = useQuery(pokemonTypesQuery);
	
	const types = computed(() => {
		return result.value?.pokemonTypes || [];
	});
	return {
		data: result,
		types,
		query,
		loading,
		error
	};
}