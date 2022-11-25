<script setup lang="ts">
import { computed, watch } from "vue";
//composables
import { usePokemonQuery } from "~/composables/usePokemon";
//card
import Card from "~/components/Card.vue";
//filters for favorites
import { useFilterStore } from "~/stores/useFilterStore";
import { useTypesStore } from "~/stores/useTypesStore";
import { storeToRefs } from "pinia";

// pokemon query
const { pokemons, loading: pokemonsLoading, error: pokemonsError, loadMore, count } = usePokemonQuery();
const { filters } = useFilterStore();

const filteredPokemons = computed(() => {
	if (filters.isFavorite) return pokemons.value.filter((pokemon) => pokemon.isFavorite);
	return pokemons.value;
});


const load = () => {
	// if pokemon count is greater than or equal to total count.. don't load more
	// or if pokemons count is 0, don't load more
	if (!pokemons.value.length || pokemons.value.length >= count.value) return;
	loadMore();
};

const typesClass = (type: string | string[]) => {
	if (Array.isArray(type)) return type.map((t) => `type-${t.toLowerCase()}`);
	return "type-" + type.toLowerCase();
};

const { selectedType } = storeToRefs(useTypesStore());
// watch(selectedType, (type) => {
// 	if (type) {
// 		filters.type = type;
// 	} else {
// 		filters.type = null;
// 	}
// });

// function to check if pokemon type is selectedType
const isSelectedType = (types: string[], reverse: boolean = false) => {
	if (!selectedType.value) return false;
	const result = types.find((type) => type.toLowerCase() === selectedType.value);
	return reverse ? !result : result;
};

</script>
<template>
	<div v-if="!pokemonsLoading && !pokemonsError">
		<ul
			v-if="filteredPokemons && filteredPokemons.length"
			v-infinite-scroll="load"
			infinite-scroll-immediate="false"
			class="pokemon-list"
		>
			<li v-for="pokemon in filteredPokemons" :key="pokemon.id" :class="[{favorite: pokemon.isFavorite, fade: isSelectedType(pokemon.types, true), }, typesClass(pokemon.types), 'pokemon']">
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
	grid-template-columns: repeat(auto-fill, 275px);
	grid-gap: 20px;
	list-style: none;
	justify-content: center;
}

.pokemon {
	transition: all 0.3s ease-in-out;
}

.fade {
	opacity: 0.25;
}
</style>