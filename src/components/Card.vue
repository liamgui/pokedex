<script setup lang="ts">
import { ref } from "vue";
import { useFavorites } from "~/composables/useFavorites";
import { Pokemon } from "~/types";
import HeartSVG from "~/assets/svgs/heart.svg?component";
import HeartFilledSVG from "~/assets/svgs/heart-filled.svg?component";
import Audio from "~/components/Audio.vue";
import { useViewStore } from "~/stores/useViewStore";

interface Props {
	pokemon: Pokemon,
}
defineProps<Props>();

// favorites composable
const { toggleFavorite } = useFavorites();
const { setSelectedPokemonType } = useViewStore();

</script>
<template>
	<div
		class="card"
		@mouseleave="setSelectedPokemonType('')"
	>
		<router-link class="image-container" :to="'/pokemon/' + pokemon.name.replace(' ', '_').toLowerCase()">
			<img v-if="pokemon.image" :src="pokemon.image" />
		</router-link>
		<div class="bottom-bar">
			<div class="title-type">
				<router-link :to="'/pokemon/' + pokemon.name.replace(' ', '_').toLowerCase()">
					<h2>{{ pokemon.name }}</h2>
				</router-link>
				<div class="types">
					<div
						v-for="ptype of pokemon.types"
						:key="ptype"
						class="type"
						:class="'type-' + ptype.toLowerCase() + '-background'"
						@mouseover="setSelectedPokemonType(ptype.toLowerCase())"
					>
						{{ ptype }}
					</div>
				</div>
			</div>
			<button class="heart-button" @click="toggleFavorite(pokemon)">
				<HeartSVG class="empty" />
				<transition name="heart">
					<HeartFilledSVG v-if="pokemon.isFavorite" class="filled" />
				</transition>
			</button>
		</div>
	</div>
</template>

<style scoped>

.card {
	background: white;
	/* width: 310px; */
	box-shadow: 0 0 7px rgba(0, 0, 0, 0.25);
	padding: 0;
	/* padding-top: 2rem; */
	height: var(--card-height);
	width: 100%;
	position: relative;
	transition: all 0.2s ease-in-out;
	/* transition-property: box-shadow, transform; */
	&:hover {
		transform: scale(1.015);
		box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
	}
}

.image-container {
	/* padding: 1rem; */
	position: relative;
	width: 100%;
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

.types {
	display: flex;
	flex-direction: row;
	justify-content: flex-start;
	align-items: center;
}
.type {
	width: 100px;
	border-radius: 5px;
	/* font-family: Montserrat, sans-serif; */
	font-size: 0.75rem;
	font-weight: 700;
	letter-spacing: 1px;
	text-transform: uppercase;
	margin-right: 0.25rem;
	color: white;
	text-shadow: 1px 1px 1px rgba(0, 0, 0, 0.5);
	position: relative;
	cursor: default;
}

.bottom-bar {
	display: flex;
	align-items: flex-start;
	justify-content: space-between;
	padding: 1rem;
	width: 100%;
	position: absolute;
	box-sizing: border-box;
	background: rgba(var(--light-blue-value), 0.35);
	bottom: 0;
	z-index: 0;
	/* min-height: 90px; */
}

.heart-button {
	background: transparent;
	border: none;
	position: relative;
    height: 25px;
	/* position: absolute;
	bottom: 1rem;
	right: 1rem; */
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