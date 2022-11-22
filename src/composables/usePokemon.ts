import { useQuery } from "@vue/apollo-composable";
import { pokemonNameQuery, pokemonsQuery, pokemonTypesQuery } from "~/graphql/queries";
import { computed, Ref, ref } from "vue";
import { Pokemon, PokemonFilterInput, PokemonQueryInput } from "~/types";

export function usePokemonQuery() {
	const limit: Ref<number> = ref(20);
	const offset: Ref<number> = ref(0);
	const filter: Ref<PokemonFilterInput> = ref({});
	const search: Ref<string> = ref("");

	const { query, loading, error, result } = useQuery(pokemonsQuery, (): PokemonQueryInput => ({
		limit: limit.value,
		offset: offset.value,
		filter: filter.value,
		search: search.value,
	}));

	const pokemons: Ref<Pokemon[]> = computed(() => {
		return result.value?.pokemons.edges as Pokemon[] || [];
	});
	

	return {
		limit,
		offset,
		pokemons,
		count: result.value?.count,
		data: result,
		query,
		loading,
		error,
	};
}

export function usePokemonByNameQuery(name: string) {
	const pokemonName: Ref<string> = ref(name);
	const { query, result, loading, error } = useQuery(pokemonNameQuery, () => ({
		name: pokemonName.value,
	}));
	
	const pokemon = computed(() => {
		return result.value?.pokemonByName as Pokemon || {};
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