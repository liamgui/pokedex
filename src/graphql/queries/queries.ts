import gql from "graphql-tag";

export const pokemons = gql`
	query pokemons($limit: Int!, $offset: Int, $search: String, $filter: PokemonFilterInput) {
		pokemons(query: { limit: $limit, offset: $offset, search: $search, filter: $filter }) {
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

export const pokemonTypes = gql`
	query pokemonTypes {
		pokemonTypes
	}
`;

export const pokemonByName = gql`
	query pokemonByName($name: String!) {
		pokemonByName(name: $name) {
			id
			number
			name
			weight {
				minimum
				maximum
			} 
			height {
				minimum
				maximum
			}
			types
			maxCP
			maxHP
			evolutions {
				id
				name
				image
			}
			previousEvolutions {
				id
				name
				image
			}
			image
			sound
			isFavorite
		}
	}
`;