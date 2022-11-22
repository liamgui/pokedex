export type Pokemon = {
	id: string;
	number: number;
	name: string;
	weight: PokemonDimension;
	height: PokemonDimension;
	types: string[];
	maxCP: number;
	maxHP: number;
	evolutions: Pokemon[];
	previousEvolutions: Pokemon[];
	image: string;
	sound: string;
	isFavorite: boolean;
}

export type PokemonDimension = {
	minimum: string;
	maximum: string;
}

export type PokemonQueryInput = {
	limit: number;
	offset?: number;
	search?: string;
	filter?: PokemonFilterInput;
}

export type PokemonFilterInput = {
	type?: string;
	isFavorite?: boolean;
}