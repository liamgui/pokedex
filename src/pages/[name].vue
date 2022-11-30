<script setup lang="ts">
import { useHead } from "@vueuse/head";
import { computed, watch } from "vue";
import { usePokemonByNameQuery } from "~/composables/usePokemon";
import PokemonTypes from "~/components/PokemonTypes.vue";
import PokemonList from "~/components/PokemonList.vue";
import BarChart from "~/components/BarChart.vue";
import Loader from "~/components/Loader.vue";
import FavoriteButton from "~/components/FavoriteButton.vue";
import Audio from "~/components/Audio.vue";
import ChevronSVG from "~/assets/svgs/chevron.svg?component";

import { Pokemon } from "~/types";
import { useRoute } from "vue-router";

const props = defineProps<{
	name: string;
}>();

const { pokemon, refetch, loading, error } = usePokemonByNameQuery(props.name.replace("_", " "));

useHead({
	title: computed(() => { return pokemon.value?.name + ": Pokedex" || "Pokedex"; }),
	meta: [
		{
			name: "description",
			content: computed(() => "Discover stats on"),
		},
	],
});

const evolutions = computed(() => {
	if (!pokemon.value) return [];
	const previousEvolutions: Pokemon[] = pokemon.value.previousEvolutions || [];
	const nextEvolutions: Pokemon[] = pokemon.value.evolutions || [];
	return [...previousEvolutions, pokemon.value, ...nextEvolutions].sort((a,b) => a.id.localeCompare(b.id));
});

const route = useRoute();

watch(
	() => (route.params),
	async (params: { name: string }) => {
		if (route.params.name) {
			await refetch({ name: params.name.replace("_", " ")});
		}
	},
	{ immediate: true }
);

</script>
<template>
	<div class="content">
		<router-link to="/" class="back">
			<ChevronSVG class="chevron"></ChevronSVG>
		</router-link>
		<div v-if="!loading && !error" class="pokemon">
			<div class="top">
				<div v-if="pokemon.image" class="pokemon-image">
					<div class="image-container">
						<img :src="pokemon?.image" :alt="pokemon.name" />
						<div class="height">
							Height: {{ pokemon?.height.minimum }} - {{ pokemon?.height.maximum }}
						</div>
						<div v-if="pokemon.sound" class="sound">
							<Audio :sound-src="pokemon.sound"></Audio>
						</div>
					</div>
				</div>
				<div class="pokemon-info">
					<div class="name-favorite">
						<h1>{{ pokemon?.name }}</h1>
						<div class="favorite">
							<FavoriteButton :pokemon="pokemon"></FavoriteButton>
						</div>
					</div>
					<div v-if="pokemon.types" class="pokemon-info-types">
						<PokemonTypes :types="pokemon.types"></PokemonTypes>
					</div>
					<div v-if="pokemon.image && pokemon.maxCP && pokemon.maxHP" class="chart">
						<BarChart :inputs="[pokemon?.maxCP, pokemon?.maxHP]" :labels="['CP', 'HP']"></BarChart>
					</div>
					<div class="height-weight">
						<p>Height: {{ pokemon?.height.minimum }} - {{ pokemon?.height.maximum }}</p>
						<p>Weight: {{ pokemon?.weight.minimum }} - {{ pokemon?.weight.maximum }}</p>
					</div>
				</div>
			</div>
			<div v-if="evolutions && evolutions.length" class="bottom">
				<div class="evolutions">
					<h2>Evolutions</h2>
					<PokemonList :pokemons="evolutions" :display-types="false" :display-favorite="false"></PokemonList>
				</div>
			</div>
		</div>
		<div v-if="loading" class="loading">
			<Loader></Loader>
		</div>
		<div v-if="error">
			<p>There was an error loading this pokemon. Please refresh the page and try again.</p>
		</div>
	</div>
</template>
<style scoped>
.content {
	margin: 0 auto;
	min-height: 100vh;
	background-color: white;
	--max-width: 1280px;
}

.back {
	position: absolute;
	top: 2rem;
	left: 2rem;
	width: 30px;
	height: 30px;
	transform: rotate(180deg);
	&:deep() svg * {
		transition: filter 0.2s ease-in-out;
	}
	&:hover {
		&:deep() svg * {
			filter: brightness(0.5);
		}
	}
}
.chevron {
	width: 100%;
	height: 100%;
}
.top {
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	width: 100%;
	padding: 4rem 0;
	max-width: var(--max-width);
	margin: 0 auto;
}

.pokemon {
	width: 100%;
}

.pokemon-image {
	background: white;
	display: flex;
	align-items: center;
	justify-content: flex-start;
	height: 100%;
	margin-right: 7rem;
	min-width: 400px;
	/* width: 30%; */
	/* margin: 0 auto; */
	/* width: 100%; */
}

.image-container {
	position: relative;
	& img {
		width: 100%;
		height: 400px;
		object-fit: contain;
	}
	&::after {
		content: "";
		position: absolute;
		top: 0;
		right: -4rem;
		height: 100%;
		width: 2px;
		background: var(--light-blue);
	}
}
.height {
	position: absolute;
	top: 50%;
	right: -11rem;
	padding: 0.5rem 1rem;
	/* font-size: 0.85rem; */
	transform: translateY(-50%) rotate(-90deg);
}

.sound {
	position: absolute;
	bottom: 0;
	left: 0;
	height: 50px;
	width: 50px;
	/* font-size: 0.85rem; */
}

.pokemon-info {
	flex: 1 1 70%;
	padding: 4rem;
	padding-bottom: 0;
	text-align: left;
}

.name-favorite {
	display: flex;
	justify-content: flex-start;
	align-items: center;
	margin-bottom: 1rem;
	& h1 {
		margin-right: 1rem;
	}
}

.bottom {
	background: var(--light-blue);
	& h2 {
		text-align: left;
	}
}

.evolutions {
	max-width: var(--max-width);
	margin: 0 auto;
	padding: 1rem 0;
}

.evolutions:deep() .pokemon-list {
	padding: 0;
	justify-content: flex-start;
	gap: 3rem;
}
.chart {
	/* height: 100%; */
	width: 100%;
	max-width: 600px;
}

@media screen and (max-width: 1280px) {
	.top {
		display: block;
	}
	.pokemon-image {
		justify-content: center;
		& img {
			object-fit: inherit;
			height: auto;
		}
	}
	.pokemon-info {
		flex: unset;
	}
	.evolutions {
		margin: 0 3rem;
	}
	.chart {
		max-width: 900px;
	}
}

@media screen and (max-width: 768px) {
	.bottom h2 {
		text-align: center;
	}
	.evolutions:deep() .pokemon-list {
		justify-content: center;
	}
	.pokemon-image {
		min-width: auto;
		/* padding: 0 2rem; */
		padding-left: 2rem;
	}
	.image-container::after {
		right: -1rem;
	}
	.height {
		right: -8rem;
	}
}

.loading {
	width: 100vw;
	height: 100vh;
}

</style>