<script lang="ts">
export default {
	name: "Pokemon"
};
</script>
<script setup lang="ts">
import { useHead } from "@vueuse/head";
import { computed, onMounted, watch } from "vue";
import { usePokemonByNameQuery } from "~/composables/usePokemon";
import PokemonTypes from "~/components/PokemonTypes.vue";
import PokemonList from "~/components/PokemonList.vue";
import { Pokemon } from "~/types";
import { useRoute } from "vue-router";

const props = defineProps<{
	name: string;
}>();

const { pokemon, refetch } = usePokemonByNameQuery(props.name.replace("_", " "));

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
	const combined = [...previousEvolutions, pokemon.value, ...nextEvolutions];
	return combined.sort((a,b) => a.id.localeCompare(b.id));
});

const route = useRoute();

watch(
	() => (route.params),
	(params: { name: string }) => {
		if (route.params.name) {
			refetch({ name: params.name.replace("_", " ")});
		}
	},
	{ immediate: true }
);

</script>
<template>
	<div class="content">
		<!-- <router-link to="/">Home</router-link> -->
		<div class="pokemon">
			<div class="top flex row">
				<div v-if="pokemon.image" class="pokemon-image">
					<div class="image-container">
						<img :src="pokemon?.image" />
						<div class="height">
							Height: {{ pokemon?.height.minimum }} - {{ pokemon?.height.maximum }}
						</div>
						<div class="width">
							Width: {{ pokemon?.weight.minimum }} - {{ pokemon?.weight.maximum }}
						</div>
					</div>
				</div>
				<div class="pokemon-info">
					<h1>{{ pokemon?.name }}</h1>
					<div v-if="pokemon.types" class="pokemon-info-types">
						<PokemonTypes :types="pokemon.types"></PokemonTypes>
					</div>
					{{ pokemon?.maxCP }}
					{{ pokemon?.maxHP }}
				</div>
			</div>
			<div v-if="evolutions && evolutions.length" class="bottom">
				<div class="evolutions">
					<h2>Evolutions</h2>
					<PokemonList :pokemons="evolutions" :display-types="false" :display-favorite="false"></PokemonList>
				</div>
			</div>
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

.flex.row {
	display: flex;
	flex-direction: row;
	justify-content: space-between;
}

.top {
	width: 100%;
	padding: 4rem 0;
	max-width: var(--max-width);
	margin: 0 auto;
	margin-bottom: 4rem;
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
}

.image-container {
	position: relative;
	& img {
		width: 100%;
	}
	&::before {
		content: "";
		position: absolute;
		bottom: -4rem;
		left: 0;
		width: 100%;
		height: 2px;
		background: var(--light-blue);
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
.width {
	position: absolute;
	bottom: -6.5rem;
	left: 50%;
	padding: 0.5rem 1rem;
	width: 100%;
	/* font-size: 0.8rem; */
	transform: translateX(-50%);
}

.pokemon-info {
	flex: 1 1 auto;
	padding: 4rem;
	text-align: left;
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
	gap: 6rem;
	& li {
		position: relative;
		&:not(:last-of-type)::after {
			content: "";
			position: absolute;
			top: 0;
			right: -4rem;
			height: 100%;
			width: 20px;
			background-image: url("~/assets/svgs/chevron.svg");
			background-repeat: no-repeat;
			background-position: center;
			background-size: contain;
			z-index: 1;

		}
	}
}
</style>