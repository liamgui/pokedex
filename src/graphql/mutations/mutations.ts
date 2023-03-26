import gql from "graphql-tag";

export const favoritePokemon = gql`
	mutation favoritePokemon($id: ID!) {
		favoritePokemon(id: $id) {
			id
			name
			isFavorite
		}
	}
`;

export const unFavoritePokemon = gql`
	mutation unFavoritePokemon($id: ID!) {
		unFavoritePokemon(id: $id) {
			id
			name
			isFavorite
		}
	}
`;
