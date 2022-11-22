<script setup lang="ts">
import { ref } from "vue";
import { useFavorites } from "~/composables/useFavorites";
import { Pokemon } from "~/types";
import HeartSVG from "~/assets/svgs/heart.svg?component";
import HeartFilledSVG from "~/assets/svgs/heart-filled.svg?component";
import Audio from "~/components/Audio.vue";

interface Props {
	pokemon: Pokemon,
}
defineProps<Props>();

// favorites composable
const { toggleFavorite } = useFavorites();

</script>
<template>
	<div class="card">
		<router-link :to="'/pokemon/' + pokemon.name.replace(' ', '_').toLowerCase()">
			<img v-if="pokemon.image" :src="pokemon.image" />
		</router-link>
		<div class="bottom-bar">
			<router-link :to="'/pokemon/' + pokemon.name.replace(' ', '_').toLowerCase()">
				<h2>{{ pokemon.name }}</h2>
			</router-link>
			<div v-if="pokemon.sound">
				<Audio :sound-src="pokemon.sound" />
			</div>
			{{ pokemon.types.join(", ") }}
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
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	background: white;
	/* width: 310px; */
	box-shadow: 0 0 7px rgba(0, 0, 0, 0.25);
	& img {
		height: 200px;
	}
	& h2 {
		color: var(--black);
	}
}

.heart-button {
	background: transparent;
	border: none;
	position: relative;
    height: 80px;
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