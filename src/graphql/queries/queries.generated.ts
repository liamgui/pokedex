import * as Types from "../types.d";

import * as Operations from "./queries.js";
import * as VueApolloComposable from "@vue/apollo-composable";
import * as VueCompositionApi from "vue";
export type ReactiveFunction<TParam> = () => TParam;
export type PokemonsQueryVariables = Types.Exact<{
  limit: Types.Scalars["Int"];
  offset?: Types.InputMaybe<Types.Scalars["Int"]>;
  search?: Types.InputMaybe<Types.Scalars["String"]>;
  filter?: Types.InputMaybe<Types.PokemonFilterInput>;
}>;


export type PokemonsQuery = { __typename?: "Query", pokemons: { __typename?: "PokemonConnection", limit: number, offset: number, count: number, edges: Array<{ __typename?: "Pokemon", id: string, name: string, types: Array<string>, image: string, sound: string, isFavorite: boolean }> } };

export type PokemonTypesQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type PokemonTypesQuery = { __typename?: "Query", pokemonTypes: Array<string> };

export type PokemonByNameQueryVariables = Types.Exact<{
  name: Types.Scalars["String"];
}>;


export type PokemonByNameQuery = { __typename?: "Query", pokemonByName?: { __typename?: "Pokemon", id: string, number: number, name: string, types: Array<string>, maxCP: number, maxHP: number, image: string, sound: string, isFavorite: boolean, weight: { __typename?: "PokemonDimension", minimum: string, maximum: string }, height: { __typename?: "PokemonDimension", minimum: string, maximum: string }, evolutions: Array<{ __typename?: "Pokemon", id: string, name: string, image: string }>, previousEvolutions: Array<{ __typename?: "Pokemon", id: string, name: string, image: string }> } | null };

export declare const pokemons: import("graphql").DocumentNode;
export declare const pokemonTypes: import("graphql").DocumentNode;
export declare const pokemonByName: import("graphql").DocumentNode;

export function usePokemonsQuery(variables: PokemonsQueryVariables | VueCompositionApi.Ref<PokemonsQueryVariables> | ReactiveFunction<PokemonsQueryVariables>, options: VueApolloComposable.UseQueryOptions<PokemonsQuery, PokemonsQueryVariables> | VueCompositionApi.Ref<VueApolloComposable.UseQueryOptions<PokemonsQuery, PokemonsQueryVariables>> | ReactiveFunction<VueApolloComposable.UseQueryOptions<PokemonsQuery, PokemonsQueryVariables>> = {}) {
	return VueApolloComposable.useQuery<PokemonsQuery, PokemonsQueryVariables>(Operations.pokemons, variables, options);
}
export function usePokemonsLazyQuery(variables: PokemonsQueryVariables | VueCompositionApi.Ref<PokemonsQueryVariables> | ReactiveFunction<PokemonsQueryVariables>, options: VueApolloComposable.UseQueryOptions<PokemonsQuery, PokemonsQueryVariables> | VueCompositionApi.Ref<VueApolloComposable.UseQueryOptions<PokemonsQuery, PokemonsQueryVariables>> | ReactiveFunction<VueApolloComposable.UseQueryOptions<PokemonsQuery, PokemonsQueryVariables>> = {}) {
	return VueApolloComposable.useLazyQuery<PokemonsQuery, PokemonsQueryVariables>(Operations.pokemons, variables, options);
}
export type PokemonsQueryCompositionFunctionResult = VueApolloComposable.UseQueryReturn<PokemonsQuery, PokemonsQueryVariables>;
export function usePokemonTypesQuery(options: VueApolloComposable.UseQueryOptions<PokemonTypesQuery, PokemonTypesQueryVariables> | VueCompositionApi.Ref<VueApolloComposable.UseQueryOptions<PokemonTypesQuery, PokemonTypesQueryVariables>> | ReactiveFunction<VueApolloComposable.UseQueryOptions<PokemonTypesQuery, PokemonTypesQueryVariables>> = {}) {
	return VueApolloComposable.useQuery<PokemonTypesQuery, PokemonTypesQueryVariables>(Operations.pokemonTypes, {}, options);
}
export function usePokemonTypesLazyQuery(options: VueApolloComposable.UseQueryOptions<PokemonTypesQuery, PokemonTypesQueryVariables> | VueCompositionApi.Ref<VueApolloComposable.UseQueryOptions<PokemonTypesQuery, PokemonTypesQueryVariables>> | ReactiveFunction<VueApolloComposable.UseQueryOptions<PokemonTypesQuery, PokemonTypesQueryVariables>> = {}) {
	return VueApolloComposable.useLazyQuery<PokemonTypesQuery, PokemonTypesQueryVariables>(Operations.pokemonTypes, {}, options);
}
export type PokemonTypesQueryCompositionFunctionResult = VueApolloComposable.UseQueryReturn<PokemonTypesQuery, PokemonTypesQueryVariables>;
export function usePokemonByNameQuery(variables: PokemonByNameQueryVariables | VueCompositionApi.Ref<PokemonByNameQueryVariables> | ReactiveFunction<PokemonByNameQueryVariables>, options: VueApolloComposable.UseQueryOptions<PokemonByNameQuery, PokemonByNameQueryVariables> | VueCompositionApi.Ref<VueApolloComposable.UseQueryOptions<PokemonByNameQuery, PokemonByNameQueryVariables>> | ReactiveFunction<VueApolloComposable.UseQueryOptions<PokemonByNameQuery, PokemonByNameQueryVariables>> = {}) {
	return VueApolloComposable.useQuery<PokemonByNameQuery, PokemonByNameQueryVariables>(Operations.pokemonByName, variables, options);
}
export function usePokemonByNameLazyQuery(variables: PokemonByNameQueryVariables | VueCompositionApi.Ref<PokemonByNameQueryVariables> | ReactiveFunction<PokemonByNameQueryVariables>, options: VueApolloComposable.UseQueryOptions<PokemonByNameQuery, PokemonByNameQueryVariables> | VueCompositionApi.Ref<VueApolloComposable.UseQueryOptions<PokemonByNameQuery, PokemonByNameQueryVariables>> | ReactiveFunction<VueApolloComposable.UseQueryOptions<PokemonByNameQuery, PokemonByNameQueryVariables>> = {}) {
	return VueApolloComposable.useLazyQuery<PokemonByNameQuery, PokemonByNameQueryVariables>(Operations.pokemonByName, variables, options);
}
export type PokemonByNameQueryCompositionFunctionResult = VueApolloComposable.UseQueryReturn<PokemonByNameQuery, PokemonByNameQueryVariables>;