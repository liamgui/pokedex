import { ApolloQueryResult } from "@apollo/client/core";
import { useQuery } from "@vue/apollo-composable";
import { computed, ComputedRef, Ref, ref } from "vue";
import { pokemonNameQuery, pokemonsQuery, pokemonTypesQuery } from "~/graphql/queries/queries";
import { Pokemon } from "~/types";
import { debounce } from "~/utils/debounce";
// import { debounce } from "lodash";

import { PokemonFilterInput as Filters } from "./../graphql/types.d";
import { PokemonQueryResult } from "./../types";


interface Options {
	limit?: number;
	offset?: number;
	filter?: Filters;
	search?: string;
}


const limit: Ref<number> = ref(20);
const offset: Ref<number> = ref(0);
const filter: Ref<Filters> = ref({});
const search: Ref<string> = ref("");

const pokemons: Ref<Pokemon[]> = ref([]);


export function usePokemonQuery({ limit: limitParam = 20, offset: offsetParam = 0, filter: filterParam = {}, search: searchParam = "" }: Options = {}) {

	limit.value = limitParam;
	offset.value = offsetParam;
	filter.value = filterParam;
	search.value = searchParam;

	const { query, loading, error, result, fetchMore, refetch, onResult, onError } = useQuery(pokemonsQuery, () => ({
		limit: limit.value,
		offset: offset.value,
		filter: filter.value,
		search: search.value,
	}));

	onResult((result: ApolloQueryResult<PokemonQueryResult>) => {
		pokemons.value = result.data.pokemons.edges || [];
	});

	function setFilters(filters: Filters) {
		filter.value = filters;
		refetchPokemon();
	}

	function refetchPokemon() {
		console.log("refetching");
		offset.value = 0;
		refetch({
			limit: limit.value,
			offset: 0,
			filter: filter.value,
			search: search.value,
		});
	}
		
	function setFilter<K extends keyof Filters>(key: K, value: Filters[K]) {
		if ( !value ) {
			delete filter.value[key];
		} else {
			filter.value[key] = value;
		}
		refetchPokemon();
	}


	function toggleFavorites() {
		if (!filter.value.isFavorite) {
			setFilter("isFavorite", true);
		} else {
			setFilter("isFavorite", undefined);
		}
		refetchPokemon();
	}
	
	const updateSearch = debounce((value: string) => {
		search.value = value;
		refetchPokemon();
	}, 500);

	const count: ComputedRef<number> = computed((): number => {
		return result.value?.pokemons.count || 0;
	});

	//load more pokemons for infinite scroll (fetch next 20 pokemons)
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

	return {
		limit,
		offset,
		filter,
		search,
		pokemons,
		data: result,
		query,
		loading,
		error,
		loadMore,
		onResult,
		count,
		refetch,
		onError,
		setFilter,
		setFilters,
		toggleFavorites,
		updateSearch
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