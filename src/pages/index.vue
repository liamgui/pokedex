<script setup lang="ts">

import { computed, ref } from "vue";
//head
import { useHead } from "@vueuse/head";
import { usePokemonQuery } from "~/composables/usePokemon";
import { useFilterStore } from "~/stores/useFilterStore";

import Filters from "~/components/Filters.vue";
import PokemonList from "~/components/PokemonList.vue";
import Loader from "~/components/Loader.vue";
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

const loadingMore = ref(false);

const load = () => {
	// if pokemon count is greater than or equal to total count.. don't load more
	// or if pokemons count is 0, don't load more
	if (!pokemons.value.length || pokemons.value.length >= count.value) return;
	loadingMore.value = true;
	//need a debounce here to prevent multiple calls
	setTimeout(async () => {
		await loadMore();
		loadingMore.value = false;
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
			<div v-infinite-scroll="load" infinite-scroll-distance="20">
				<div v-if="filteredPokemons && filteredPokemons.length">
					<PokemonList :pokemons="filteredPokemons" :view-type="viewTypeRef"></PokemonList>
				</div>
				<div v-else>
					<p>No Pokemon Matches</p>
				</div>
				<!-- Favicon credits -->
				<div class="credits">
					<span class="link">
						<a href="https://www.flaticon.com/free-icons/pokemon" title="pokemon favicon">Pokemon favicon created by Nikita Golubev - Flaticon</a>
					</span>
				</div>
			</div>
		</div>
		<div v-if="pokemonsError" class="error">
			<p>There was an error loading the pokemons. Please refresh the page and try again.</p>
		</div>
		<div v-if="pokemonsLoading || loadingMore" class="loading" :class="{more: loadingMore}">
			<Loader></Loader>
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

.loading {
	margin: 2rem auto;
	width: 100%;
	&.more {
		position: absolute;
		left: 0;
		bottom: 3rem;
		z-index: 2;
	}
}

</style>
