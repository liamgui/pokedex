<script setup lang="ts">
//composables
import { usePokemonQuery } from "~/composables/usePokemon";
//card
import Card from "~/components/Card.vue";


// pokemon query
const { pokemons, loading: pokemonsLoading, error: pokemonsError, loadMore, count } = usePokemonQuery();


const load = () => {
	if (pokemons.value.length >= count.value) return;
	loadMore();
};
</script>
<template>
	<div v-if="!pokemonsLoading && !pokemonsError">
		<ul v-if="pokemons && pokemons.length" v-infinite-scroll="load" class="pokemon-list">
			<li v-for="pokemon in pokemons" :key="pokemon.id" :class="{favorite: pokemon.isFavorite}">
				<Card :pokemon="pokemon" />
			</li>
		</ul>
	</div>
	<div v-else-if="pokemonsError"></div>
	<div v-else class="loading"></div>
</template>

<style scoped>
.pokemon-list {
	display: grid;
	grid-template-columns: repeat(auto-fill, 400px);
	grid-gap: 20px;
	list-style: none;
	justify-content: center;
}
</style>