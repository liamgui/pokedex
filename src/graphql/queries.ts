import gql from "graphql-tag";

export const pokemonsQuery = gql`
	query pokemons($limit: Int!, $offset: Int) {
		pokemons(query: { limit: $limit, offset: $offset }) {
			limit
			offset
			count
			edges {
				id
				name
				types
				image
				sound
				isFavorite
			}
		}
	}
`;

export const pokemonTypesQuery = gql`
	query pokemonTypes {
		pokemonTypes
	}
`;