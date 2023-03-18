<script setup lang="ts">
import { computed } from "vue";
import { Pokemon } from "~/graphql/types";
import FavoriteButton from "./FavoriteButton.vue";
import PokemonTypes from "~/components/PokemonTypes.vue";
import { useViewStore } from "~/stores/useViewStore";
import { storeToRefs } from "pinia";

interface Props {
	pokemon: Pokemon,
	displayTypes?: boolean,
	displayFavorite?: boolean,
}
const props = withDefaults(defineProps<Props>(), {
	displayTypes: true,
	displayFavorite: true,
});

const { viewType } = storeToRefs(useViewStore());


const to = computed(() => {
	return props.pokemon?.name?.replace(" ", "_") || "";
});

</script>
<template>
	<router-link :to="to">
		<div class="pokemon" :class="viewType">
			<div class="image-container top">
				<img v-if="pokemon.image" :src="pokemon.image" :alt="pokemon.name" />
			</div>
			<div class="bottom-bar">
				<div class="title-favorite">
					<h2>{{ pokemon.name }}</h2>
					<div v-if="displayFavorite">
						<FavoriteButton :pokemon="pokemon"></FavoriteButton>
					</div>
				</div>
				<div v-if="displayTypes">
					<PokemonTypes :types="pokemon.types" :hover="true"></PokemonTypes>
				</div>
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

.pokemon.list {
	--listing-height: 100px;
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

.title-favorite {
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin-bottom: 1rem;
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
	/* margin-bottom: 1rem; */
}


.bottom-bar {
	/* display: flex; */
	align-items: flex-start;
	justify-content: space-between;
	padding: 1rem;
	background: var(--light-gray);
}

</style>