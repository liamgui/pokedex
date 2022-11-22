import { useQuery } from "@vue/apollo-composable";
import { pokemonsQuery, pokemonTypesQuery } from "~/graphql/queries";
import { Ref, ref } from "vue";

export function usePokemonQuery() {
	const limit: Ref<number> = ref(20);
	const offset: Ref<number> = ref(0);
	const { query, loading, error, result } = useQuery(pokemonsQuery, () => ({
		limit: limit.value,
		offset: offset.value,
	}));

	return {
		limit,
		offset,
		data: result,
		query,
		loading,
		error,
	};
}

export function usePokemonByNameQuery() {
	const pokemonName: Ref<string> = ref("");
	const { query, result, loading, error } = useQuery(pokemonsQuery, () => ({
		name: pokemonName.value,
	}));
	
	return {
		pokemonName,
		data: result,
		query,
		loading,
		error
	};
}

export function usePokemonTypesQuery() {
	const { query, result, loading, error } = useQuery(pokemonTypesQuery);
	
	return {
		data: result,
		query,
		loading,
		error
	};
}