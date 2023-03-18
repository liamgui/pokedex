<script setup lang="ts">
//composables
//pokemonitem
import PokemonItem from "~/components/PokemonItem.vue";
//filters for favorites
import { storeToRefs } from "pinia";
import { useViewStore } from "~/stores/useViewStore";
import { Pokemon } from "~/graphql/types";

type Props = {
	pokemons: Pokemon[];
	displayTypes?: boolean;
	displayFavorite?: boolean;
};

const props = withDefaults(
	defineProps<Props>(),
	{
		displayTypes: true,
		displayFavorite: true
	}
);

const { viewType } = storeToRefs(useViewStore());

const typesClass = (type: string | readonly string[]) => {
	if (!props.displayTypes) return "";
	if (typeof type === "object") return type.map((t) => `type-${t.toLowerCase()}`);
	return "type-" + type.toLowerCase();
};

const { selectedPokemonType: selectedPokemonTypeRef } = storeToRefs(useViewStore());
// function to check if pokemon type is selectedPokemonType
const isSelectedType = (types: readonly string[], reverse: boolean = false) => {
	if (!props.displayTypes || !selectedPokemonTypeRef.value) return false;
	const result = types.find((type) => type.toLowerCase() === selectedPokemonTypeRef.value);
	return reverse ? !result : result;
};

</script>
<template>
	<ul
		v-if="pokemons && pokemons.length"
		class="pokemon-list"
		:class="viewType"
	>
		<li v-for="pokemon in pokemons" :key="pokemon.id" :class="[{favorite: displayFavorite && pokemon.isFavorite, fade: displayTypes ?isSelectedType(pokemon.types, true) : false, }, typesClass(pokemon.types), 'pokemon']">
			<PokemonItem
				:pokemon="pokemon"
				:display-types="displayTypes"
				:display-favorite="displayFavorite"
				:view-type="viewType" />
		</li>
	</ul>
</template>

<style scoped>
.pokemon-list {
	margin: 3rem 0;
	padding: 0;
}
.pokemon-list.grid {
	--grid-item-width: 275px;
	display: grid;
	grid-template-columns: repeat(auto-fill, var(--grid-item-width));
	grid-gap: 20px;
	list-style: none;
	justify-content: center;
	--listing-height: 320px;

	@media screen and (min-width: 1920px) {
		--grid-item-width: 360px;
	}
	@media screen and (max-width: 768px) {
		--grid-item-width: 215px;
	}
}

.pokemon-list.list {
	display: list-item;
	list-style: none;
	padding-left: 0;
	max-width: 1280px;
	margin: 3rem auto;
	--listing-height: 100px;
}


.pokemon {
	transition: all 0.3s ease-in-out;
}

.fade {
	opacity: 0.25;
}

</style>