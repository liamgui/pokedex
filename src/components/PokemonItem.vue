<script setup lang="ts">
import { computed, ref } from "vue";
import { useFavorites } from "~/composables/useFavorites";
import { Pokemon } from "~/types";
import HeartGraySVG from "~/assets/svgs/heart-gray.svg?component";
import HeartRedSVG from "~/assets/svgs/heart-red.svg?component";
import Audio from "~/components/Audio.vue";
import { useViewStore } from "~/stores/useViewStore";
import PokemonTypes from "~/components/PokemonTypes.vue";

interface Props {
	pokemon: Pokemon,
	displayTypes?: boolean,
	displayFavorite?: boolean,
}
const props = withDefaults(defineProps<Props>(), {
	displayTypes: true,
	displayFavorite: true,
});

// favorites composable
const { toggleFavorite } = useFavorites();


const to = computed(() => {
	return props.pokemon.name.replace(" ", "_");
});

</script>
<template>
	<router-link :to="to">
		<div class="pokemon" :to="to">
			<div class="image-container top">
				<img v-if="pokemon.image" :src="pokemon.image" />
			</div>
			<div class="bottom-bar">
				<div class="title-type">
					<h2>{{ pokemon.name }}</h2>
					<div v-if="displayTypes">
						<PokemonTypes :types="pokemon.types" :hover="true"></PokemonTypes>
					</div>
				</div>
				<button v-if="displayFavorite" class="heart-button" @click.prevent="toggleFavorite(pokemon)">
					<HeartGraySVG class="empty" />
					<transition name="heart">
						<HeartRedSVG v-if="pokemon.isFavorite" class="filled" />
					</transition>
				</button>
			</div>
		</div>
	</router-link>
</template>

<style scoped>

.router-link {
	width: 100%;
}
.pokemon {
	background: white;
	display: flex;
	flex-direction: column;
	box-shadow: 0 0 7px rgba(0, 0, 0, 0.25);
	padding: 0;
	height: var(--listing-height);
	width: 100%;
	position: relative;
	transition: all 0.2s ease-in-out;
	&:hover {
		transform: scale(1.015);
		box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
	}
}


.image-container {
	flex: 1 1 auto;
	width: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
}

img {
	padding: 1.5rem;
	height: 200px;
	max-width: 100%;
	object-fit: contain;
	box-sizing: border-box;
}

h2 {
	color: var(--black);
	text-align: left;
	margin: 0;
	margin-bottom: 1rem;
}


.bottom-bar {
	display: flex;
	align-items: flex-start;
	justify-content: space-between;
	padding: 1rem;
	background: var(--light-gray);
}

.heart-button {
	background: transparent;
	border: none;
	position: relative;
    height: 25px;
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
}

</style>