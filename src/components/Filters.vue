<script setup lang="ts">
import Dropdown from "~/components/Dropdown.vue";
import SearchBar from "~/components/SearchBar.vue";
import { usePokemonQuery, usePokemonTypesQuery } from "~/composables/usePokemon";
import { PokemonFilterInput as Filters } from "~/graphql/types";
import { useView } from "~/composables/useView";
import HeartGrayStackSVG from "~/assets/svgs/heart-gray-stacked.svg?component";
import HeartRedStackSVG from "~/assets/svgs/heart-red-stacked.svg?component";
import ListSVG from "~/assets/svgs/list.svg?component";
import GridSVG from "~/assets/svgs/grid.svg?component";
// pokemon types query
const { types, loading: pokemonTypesLoading, error: pokemonTypesError } = usePokemonTypesQuery();

const { filter, setFilter, toggleFavorites } = usePokemonQuery();
const { viewType, setViewType } = useView();


function toggleView() {
	const value = viewType.value === "grid" ? "list" : "grid";
	setViewType(value);
}

</script>
<template>
	<div class="filters">
		<div class="start">
			<h1>Pokedex</h1>
			<a target="_blank" href="https://github.com/liamgui/pokedex"><img class="github-icon" src="@/assets/pngs/GitHub-Mark-64px.png" alt="github icon"></a>
		</div>
		<div class="end">
			<div class="searchbar-dropdown">
				<SearchBar class="search"></SearchBar>
				<Dropdown
					class="types"
					:options="types"
					title="Types"
					:default-value="(filter.type as typeof Filters)"
					@change="setFilter('type', $event as string)"></Dropdown>
			</div>
			<div class="favorites-view">
				<button
					title="toggle favorites view"
					class="favorite-view icon-button"
					:class="{favorites: filter.isFavorite}"
					@click="toggleFavorites">
					<HeartGrayStackSVG v-if="!filter.isFavorite"></HeartGrayStackSVG>
					<HeartRedStackSVG v-if="filter.isFavorite"></HeartRedStackSVG>
				</button>
				<button :title="'toggle ' + viewType + ' view'" class="view icon-button" @click="toggleView()">
					<ListSVG v-if="viewType === 'grid'"></ListSVG>
					<GridSVG v-if="viewType === 'list'"></GridSVG>
				</button>
			</div>
		</div>
	</div>
</template>
<style scoped>
	.github-icon {
		margin-left: 0.75rem;
		width: 1.5rem;
		vertical-align: middle;
	}
	.filters {
		display: flex;
		align-items: center;
		justify-content: space-between;
		background: var(--light-gray);;
		padding: 0.5rem 2rem;
	}

	.start,
	.end {
		display: flex;
		align-items: center;
		
	}
	.searchbar-dropdown {
		display: flex;
		align-items: center;
		margin-right: 1rem;
		margin-left: 1rem;
	}
	.favorites-view {
		display: flex;
	}
	.search {
		margin-right: 1rem;
		width: 360px;
	}
	.icon-button {
		background: transparent;
		border: none;
		position: relative;
		height: 25px;
		&:focus {
			outline: none;
		}
		& svg {
			position: absolute;
			top: 0;
			left: 0;
			width: 100%;
			height: 100%;
			pointer-events: none;
		}
	}
	button {
		border-radius: 0;
	}
	.view {
		margin-left: 1rem;
	}
	@media screen and (max-width: 830px) {
		.filters {
			align-items: flex-start;
		}
		.searchbar-dropdown {
			flex-direction: column;
			align-items: flex-start;
		}
		.favorites-view {
			justify-content: center;
			align-items: center;
			flex-direction: column;
		}
		.view {
			margin: 0;
			margin-top: 0.75rem;
		}
		.search {
			width: 100%;
		}
	}
	@media screen and (max-width: 500px) {
		.filters {
			flex-direction: column;
		}
		h1 {
			/* width: 100%; */
			margin-left: 1rem;
			text-align: center;
		}
	}

</style>