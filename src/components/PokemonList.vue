<script setup lang="ts">
//composables
import { useViewStore } from "~/stores/useViewStore";
//pokemonitem
import PokemonItem from "~/components/PokemonItem.vue";
//filters for favorites
import { storeToRefs } from "pinia";
import { Pokemon } from "~/types";
import { onMounted } from "vue";

type Props = {
  pokemons: Pokemon[];
  displayTypes?: boolean;
  displayFavorite?: boolean;
  viewType?: string;
};
const props = withDefaults(
	defineProps<Props>(),
	{
		displayTypes: true,
		displayFavorite: true,
		viewType: "grid"
	}
);

const typesClass = (type: string | string[]) => {
	if (!props.displayTypes) return "";
	if (Array.isArray(type)) return type.map((t) => `type-${t.toLowerCase()}`);
	return "type-" + type.toLowerCase();
};

const { selectedPokemonType: selectedPokemonTypeRef } = storeToRefs(useViewStore());
// function to check if pokemon type is selectedPokemonType
const isSelectedType = (types: string[], reverse: boolean = false) => {
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
			<PokemonItem :pokemon="pokemon" :display-types="displayTypes" :display-favorite="displayFavorite" />
		</li>
	</ul>
</template>

<style scoped>
.pokemon-list {
	margin: 3rem 0;
}
.pokemon-list.grid {
	display: grid;
	grid-template-columns: repeat(auto-fill, 275px);
	grid-gap: 20px;
	list-style: none;
	justify-content: center;
	@media screen and (min-width: 1920px) {
		grid-template-columns: repeat(auto-fill, 350px);
	}
}

.pokemon-list.list {
	display: list-item;
	list-style: none;
	padding-left: 0;
	max-width: 1280px;
	margin: 3rem auto;
}


.pokemon {
	transition: all 0.3s ease-in-out;
}

.fade {
	opacity: 0.25;
}

.list:deep() .pokemon {
	--card-height: 100px;
	margin-bottom: 0.5rem;
	flex-direction: row;
	&:hover {
		transform: none;
		background: rgba(255, 255, 255, 0.7)
	}
	& a {
		width: 100px;
	}
	& .image-container {
		width: 120px;
		flex: initial;

	}
	& img {
		max-height: 100px;
		object-fit: contain;
		padding: 0.5rem;
	}
	& .bottom-bar {
		flex: 1 1 auto;
	}
}
.grid:deep() .pokemon {
	--listing-height: 320px;
}
</style>