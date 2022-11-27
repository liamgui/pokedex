<script setup lang="ts">

import { computed } from "vue";
//head
import { useHead } from "@vueuse/head";
import { usePokemonQuery } from "~/composables/usePokemon";
import { useFilterStore } from "~/stores/useFilterStore";

import Filters from "~/components/Filters.vue";
import PokemonList from "~/components/PokemonList.vue";
import { useViewStore } from "~/stores/useViewStore";
import { storeToRefs } from "pinia";

//define head
useHead({
	title: "Pokedex",
	meta: [
		{
			name: "description",
			content: computed(() => "Find your favorite pokemon using this pokedex."),
		},
	],
});

const { pokemons, loading: pokemonsLoading, error: pokemonsError, loadMore, count } = usePokemonQuery();

const { viewType: viewTypeRef } = storeToRefs(useViewStore());


const load = () => {
	// if pokemon count is greater than or equal to total count.. don't load more
	// or if pokemons count is 0, don't load more
	if (!pokemons.value.length || pokemons.value.length >= count.value) return;

	//need a debounce here?
	setTimeout(() => {
		loadMore();
	}, 50);
};

// pokemon query
const { filters } = useFilterStore();

const filteredPokemons = computed(() => {
	if (filters.isFavorite) return pokemons.value.filter((pokemon) => pokemon.isFavorite);
	return pokemons.value;
});

</script>

<template>
	<div class="content">
		<Filters></Filters>
		<div class="auto-scroll">
			<div
				v-if="!pokemonsLoading && !pokemonsError"
				v-infinite-scroll="load"
			>
				<div v-if="filteredPokemons && filteredPokemons.length">
					<PokemonList :pokemons="filteredPokemons" :view-type="viewTypeRef"></PokemonList>
				</div>
			</div>
			<div v-else-if="pokemonsError"></div>
			<div v-else class="loading"></div>
		</div>
	</div>
</template>

<style scoped>

.content {
	width: 100%;
	height: 100vh;
	overflow: hidden;
	display: flex;
	flex-direction: column;
}

.auto-scroll {
	overflow-y: auto;
	height: 100%;
}

</style>
