import { useQuery } from "@vue/apollo-composable";
import { pokemonNameQuery, pokemonsQuery, pokemonTypesQuery } from "~/graphql/queries";
import { computed, ComputedRef, Ref, ref } from "vue";
import { Pokemon, PokemonFilterInput, PokemonQueryInput } from "~/types";

export function usePokemonQuery() {
	const limit: Ref<number> = ref(20);
	const offset: Ref<number> = ref(0);
	const filter: Ref<PokemonFilterInput> = ref({});
	const search: Ref<string> = ref("");

	const { query, loading, error, result, fetchMore } = useQuery(pokemonsQuery, (): PokemonQueryInput => ({
		limit: limit.value,
		offset: offset.value,
		filter: filter.value,
		search: search.value,
	}));

	const pokemons: ComputedRef<Pokemon[]> = computed((): Pokemon[] => {
		return result.value?.pokemons.edges || [];
	});

	const loadMore = () => {
		offset.value += limit.value;
		fetchMore({
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
		pokemons,
		count: result.value?.count,
		data: result,
		query,
		loading,
		error,
		loadMore
	};
}

export function usePokemonByNameQuery(name: string) {
	const pokemonName: Ref<string> = ref(name);
	const { query, result, loading, error } = useQuery(pokemonNameQuery, () => ({
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
		error
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