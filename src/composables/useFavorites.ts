import { useMutation } from "@vue/apollo-composable";
import { favoritePokemon as favoriteMutation, unFavoritePokemon as unFavoriteMutation } from "~/graphql/mutations/mutations";
import { ref } from "vue";
import { Pokemon } from "~/graphql/types";

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
	const { mutate: unFavoritePokemon } = useMutation(
		unFavoriteMutation,
		() => ({
			variables: {
				id: pokemonToFavorite.value,
			},
		})
	);

	const toggleFavorite = (pokemon: Pokemon) => {
		pokemonToFavorite.value = pokemon.id;
		if (pokemon.isFavorite) {	
			unFavoritePokemon();
		} else {
			favoritePokemon();
		}
	};
	
	return {
		addFavorite: favoritePokemon,
		removeFavorite: unFavoritePokemon,
		pokemonToFavorite,
		toggleFavorite
	};
}