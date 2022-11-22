<script setup lang="ts">

import { computed, ref, Ref } from "vue";
//head
import { useHead } from "@vueuse/head";
//card
import Card from "~/components/Card.vue";
//types
import { Pokemon } from "~/types";
//composables
import { useFavorites } from "~/composables/useFavorites";
import { usePokemonQuery, usePokemonTypesQuery } from "~/composables/usePokemon";

// import Filters from "~/components/Filters.vue"; 

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

// pokemon query
const { pokemons, count, loading: pokemonsLoading, error: pokemonsError, loadMore } = usePokemonQuery();

const load = () => {
	loadMore();
};


</script>

<template>
	<div class="content">
		<!-- <Filters></Filters> -->
		<div v-if="!pokemonsLoading && !pokemonsError">
			<ul v-if="pokemons && pokemons.length" v-infinite-scroll="load" class="pokemon-list">
				<li v-for="pokemon in pokemons" :key="pokemon.id" :class="{favorite: pokemon.isFavorite}">
					<Card :pokemon="pokemon" />
				</li>
			</ul>
		</div>
		<div v-else-if="pokemonsError"></div>
		<div v-else class="loading"></div>
	</div>
</template>

<style scoped>

.content {
	width: 100%;
	height: 100%;
}

.pokemon-list {
	display: grid;
	grid-template-columns: repeat(auto-fill, 400px);
	grid-gap: 20px;
}

</style>
