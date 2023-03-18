import * as Types from "../types.d";

import * as Operations from "./mutations.js";
import * as VueApolloComposable from "@vue/apollo-composable";
import * as VueCompositionApi from "vue";
export type ReactiveFunction<TParam> = () => TParam;
export type FavoritePokemonMutationVariables = Types.Exact<{
  id: Types.Scalars["ID"];
}>;


export type FavoritePokemonMutation = { __typename?: "Mutation", favoritePokemon?: { __typename?: "Pokemon", id: string, name: string, isFavorite: boolean } | null };

export type UnFavoritePokemonMutationVariables = Types.Exact<{
  id: Types.Scalars["ID"];
}>;


export type UnFavoritePokemonMutation = { __typename?: "Mutation", unFavoritePokemon?: { __typename?: "Pokemon", id: string, name: string, isFavorite: boolean } | null };

export declare const favoritePokemon: import("graphql").DocumentNode;
export declare const unFavoritePokemon: import("graphql").DocumentNode;

export function useFavoritePokemonMutation(options: VueApolloComposable.UseMutationOptions<FavoritePokemonMutation, FavoritePokemonMutationVariables> | ReactiveFunction<VueApolloComposable.UseMutationOptions<FavoritePokemonMutation, FavoritePokemonMutationVariables>> = {}) {
	return VueApolloComposable.useMutation<FavoritePokemonMutation, FavoritePokemonMutationVariables>(Operations.favoritePokemon, options);
}
export type FavoritePokemonMutationCompositionFunctionResult = VueApolloComposable.UseMutationReturn<FavoritePokemonMutation, FavoritePokemonMutationVariables>;
export function useUnFavoritePokemonMutation(options: VueApolloComposable.UseMutationOptions<UnFavoritePokemonMutation, UnFavoritePokemonMutationVariables> | ReactiveFunction<VueApolloComposable.UseMutationOptions<UnFavoritePokemonMutation, UnFavoritePokemonMutationVariables>> = {}) {
	return VueApolloComposable.useMutation<UnFavoritePokemonMutation, UnFavoritePokemonMutationVariables>(Operations.unFavoritePokemon, options);
}
export type UnFavoritePokemonMutationCompositionFunctionResult = VueApolloComposable.UseMutationReturn<UnFavoritePokemonMutation, UnFavoritePokemonMutationVariables>;