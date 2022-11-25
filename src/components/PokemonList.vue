<script setup lang="ts">
import { computed, watch } from "vue";
//composables
import { usePokemonQuery } from "~/composables/usePokemon";
//card
import Card from "~/components/Card.vue";
//filters for favorites
import { useFilterStore } from "~/stores/useFilterStore";
import { useViewStore } from "~/stores/useViewStore";
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

const { selectedPokemonType } = storeToRefs(useViewStore());
const { viewType } = storeToRefs(useViewStore());

// function to check if pokemon type is selectedPokemonType
const isSelectedType = (types: string[], reverse: boolean = false) => {
	if (!selectedPokemonType.value) return false;
	const result = types.find((type) => type.toLowerCase() === selectedPokemonType.value);
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
			:class="viewType"
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
.pokemon-list.grid {
	display: grid;
	grid-template-columns: repeat(auto-fill, 275px);
	grid-gap: 20px;
	list-style: none;
	justify-content: center;
}

.pokemon-list.list {
	display: list-item;
	list-style: none;
	padding-left: 0;
	margin: 0 4rem;
}


.pokemon {
	transition: all 0.3s ease-in-out;
}

.fade {
	opacity: 0.25;
}

.list >>> .card {
	--card-height: 100px;
	display: flex;
	/* box-shadow: none; */
	/* border-bottom: 1px solid #ccc; */
	margin-bottom: 0.5rem;
	&:hover {
		transform: none;
		background: rgba(255, 255, 255, 0.7)
	}
	& a {
		width: 100px;
	}
	& img {
		/* width: 110px; */
		height: 100%;
		object-fit: contain;
		padding: 0.5rem;
	}
	& .bottom-bar {
		/* background: transparent; */
		position: relative;
	}
}
.grid >>> .card {
	--card-height: 320px;
}
</style>