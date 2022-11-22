import { useMutation } from "@vue/apollo-composable";
import { favoritePokemon as favoriteMutation, unfavoritePokemon as unfavoriteMutation } from "~/graphql/mutations";
import { ref } from "vue";

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
	
	return {
		addFavorite: favoritePokemon,
		removeFavorite: unfavoritePokemon,
		pokemonToFavorite
	};
}