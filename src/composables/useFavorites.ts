import { useMutation } from "@vue/apollo-composable";
import { favoritePokemon as favoriteMutation, unfavoritePokemon as unfavoriteMutation } from "~/graphql/mutations";
import { ref } from "vue";
import { Pokemon } from "~/types";

export function useFavorites() {
	const pokemonToFavorite = ref("");

	const { mutate: favoritePokemon } = useMutation(
		favoriteMutation,
		() => ({
			variables: {
				id: pokemonToFavorite.value,
			},
		})
	);
	const { mutate: unfavoritePokemon } = useMutation(
		unfavoriteMutation,
		() => ({
			variables: {
				id: pokemonToFavorite.value,
			},
		})
	);

	const toggleFavorite = (pokemon: Pokemon) => {
		pokemonToFavorite.value = pokemon.id;
		if (pokemon.isFavorite) {	
			unfavoritePokemon();
		} else {
			favoritePokemon();
		}
	};
	
	return {
		addFavorite: favoritePokemon,
		removeFavorite: unfavoritePokemon,
		pokemonToFavorite,
		toggleFavorite
	};
}