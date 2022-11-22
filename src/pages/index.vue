<script setup lang="ts">

import { computed, ref, Ref } from "vue";
//head
import { useHead } from "@vueuse/head";
//svgs
import HeartSVG from "~/assets/svgs/heart.svg?component";
import HeartFilledSVG from "~/assets/svgs/heart-filled.svg?component";
//types
import { Pokemon } from "~/types";
//composables
import { useFavorites } from "~/composables/useFavorites";
import { usePokemonQuery, usePokemonTypesQuery } from "~/composables/usePokemon";

// import Filters from "~/components/Filters.vue"; 

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

// pokemon query
const { pokemons, offset, count, loading: pokemonsLoading, error: pokemonsError } = usePokemonQuery();

// sounds object for easy retrieval
const sounds: Ref<Record<string, HTMLAudioElement>> = ref({});

// favorites composable
const { toggleFavorite } = useFavorites();

</script>

<template>
	<div class="content">
		<!-- <Filters></Filters> -->
		<div v-if="!pokemonsLoading && !pokemonsError">
			<ul v-if="pokemons && pokemons.length" class="pokemon-list">
				<li v-for="pokemon in pokemons" :key="pokemon.id" :class="{favorite: pokemon.isFavorite}">
					<div class="card">
						<router-link :to="'/pokemon/' + pokemon.name.replace(' ', '_').toLowerCase()">
							<img v-if="pokemon.image" :src="pokemon.image" />
						</router-link>
						<div class="bottom-bar">
							<router-link :to="'/pokemon/' + pokemon.name.replace(' ', '_').toLowerCase()">
								<h2>{{ pokemon.name }}</h2>
							</router-link>
							<div v-if="pokemon.sound">
								<audio :id="'sounds' + pokemon.id" :ref="(el) => {sounds[pokemon.id] = el as HTMLAudioElement}" :src="pokemon.sound.replace('/\./g', '').replace(' ', '')"></audio>
								<button @click="sounds[pokemon.id].play()"></button>
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
				</li>
			</ul>
		</div>
		<div v-else-if="pokemonsError"></div>
		<div v-else class="loading"></div>
	</div>
</template>

<style scoped>

.content {
	width: 100%;
	height: 100%;
}

.pokemon-list {
	display: grid;
	grid-template-columns: repeat(auto-fill, 400px);
	grid-gap: 20px;
}

.card {
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	/* width: 310px; */
	box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
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
