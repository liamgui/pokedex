<script setup lang="ts">
import HeartGraySVG from "~/assets/svgs/heart-gray.svg?component";
import HeartRedSVG from "~/assets/svgs/heart-red.svg?component";
import { useFavorites } from "~/composables/useFavorites";
import { Pokemon } from "~/graphql/types";

type Props = {
	pokemon: Pokemon;
}

defineProps<Props>();

const { toggleFavorite } = useFavorites();

</script>
<template>
	<button
		title="Click to add pokemon to favorites."
		class="heart-button favorite"
		:class="{isFavorite: pokemon.isFavorite}"
		@click.prevent="toggleFavorite(pokemon)">
		<HeartGraySVG class="empty" />
		<transition name="heart">
			<HeartRedSVG v-if="pokemon.isFavorite" class="filled" />
		</transition>
	</button>
</template>
<style scoped>
.heart-button {
	background: transparent;
	border: none;
	position: relative;
    height: 25px;
	&:deep() svg * {
		transition: all 0.2s ease-in-out;
	}
	& svg {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
	}
	&:focus {
		outline: none;
	}
	&:hover:deep() {
		& svg * {
			filter: brightness(0.95);
		}
	}
}
</style>