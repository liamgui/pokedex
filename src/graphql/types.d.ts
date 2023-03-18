export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Mutation = {
  readonly __typename?: "Mutation";
  readonly favoritePokemon?: Maybe<Pokemon>;
  readonly unFavoritePokemon?: Maybe<Pokemon>;
};


export type MutationFavoritePokemonArgs = {
  id: Scalars["ID"];
};


export type MutationUnFavoritePokemonArgs = {
  id: Scalars["ID"];
};

export type Pokemon = {
  readonly __typename?: "Pokemon";
  readonly evolutions: ReadonlyArray<Pokemon>;
  readonly height: PokemonDimension;
  readonly id: Scalars["ID"];
  readonly image: Scalars["String"];
  readonly isFavorite: Scalars["Boolean"];
  readonly maxCP: Scalars["Int"];
  readonly maxHP: Scalars["Int"];
  readonly name: Scalars["String"];
  readonly number: Scalars["Int"];
  readonly previousEvolutions: ReadonlyArray<Pokemon>;
  readonly sound: Scalars["String"];
  readonly types: ReadonlyArray<Scalars["String"]>;
  readonly weight: PokemonDimension;
};

export type PokemonConnection = {
  readonly __typename?: "PokemonConnection";
  readonly count: Scalars["Int"];
  readonly edges: ReadonlyArray<Pokemon>;
  readonly limit: Scalars["Int"];
  readonly offset: Scalars["Int"];
};

export type PokemonDimension = {
  readonly __typename?: "PokemonDimension";
  readonly maximum: Scalars["String"];
  readonly minimum: Scalars["String"];
};

export type PokemonFilterInput = {
  readonly isFavorite?: InputMaybe<Scalars["Boolean"]>;
  readonly type?: InputMaybe<Scalars["String"]>;
};

export type PokemonsQueryInput = {
  readonly filter?: InputMaybe<PokemonFilterInput>;
  readonly limit?: InputMaybe<Scalars["Int"]>;
  readonly offset?: InputMaybe<Scalars["Int"]>;
  readonly search?: InputMaybe<Scalars["String"]>;
};

export type Query = {
  readonly __typename?: "Query";
  readonly pokemonById?: Maybe<Pokemon>;
  readonly pokemonByName?: Maybe<Pokemon>;
  readonly pokemonTypes: ReadonlyArray<Scalars["String"]>;
  readonly pokemons: PokemonConnection;
};


export type QueryPokemonByIdArgs = {
  id: Scalars["ID"];
};


export type QueryPokemonByNameArgs = {
  name: Scalars["String"];
};


export type QueryPokemonsArgs = {
  query: PokemonsQueryInput;
};

export type Root = {
  readonly __typename?: "Root";
  readonly query: Query;
};
