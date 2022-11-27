<script setup lang="ts">
import { storeToRefs } from "pinia";
import { ref } from "vue";
import Dropdown from "~/components/Dropdown.vue";
import SearchBar from "~/components/SearchBar.vue";
import { usePokemonTypesQuery } from "~/composables/usePokemon";
import { useFilterStore } from "~/stores/useFilterStore";
import { useViewStore } from "~/stores/useViewStore";
import HeartGrayStackSVG from "~/assets/svgs/heart-gray-stacked.svg?component";
import HeartRedStackSVG from "~/assets/svgs/heart-red-stacked.svg?component";
import ListSVG from "~/assets/svgs/list.svg?component";
import GridSVG from "~/assets/svgs/grid.svg?component";
// pokemon types query
const { types, loading: pokemonTypesLoading, error: pokemonTypesError } = usePokemonTypesQuery();

const { setFilter, updateSearch, toggleFavoriteView } = useFilterStore();
const { filters: filtersRef } = storeToRefs(useFilterStore());
const { setViewType } = useViewStore();
const { viewType } = storeToRefs(useViewStore());

function resetAllFilters() {
	setFilter(null, "isFavorite");
	updateSearch("");
	setFilter("", "type");
	setViewType("grid");
	searchText.value = "";
}

const searchText = ref("");

function toggleView() {
	const value = viewType.value === "grid" ? "list" : "grid";
	setViewType(value);
}

</script>
<template>
	<div class="filters">
		<div class="start">
			<Dropdown :options="types" title="Types" @change="setFilter($event, 'type')"></Dropdown>
			<SearchBar :text="searchText"></SearchBar>
			<button @click="resetAllFilters()">Reset</button>
		</div>
		<div class="end">
			<button class="favorite-view icon-button" :class="{favorites: filtersRef.isFavorite}" @click="toggleFavoriteView()">
				<HeartGrayStackSVG v-if="!filtersRef.isFavorite"></HeartGrayStackSVG>
				<HeartRedStackSVG v-if="filtersRef.isFavorite"></HeartRedStackSVG>
			</button>
			<button class="view icon-button" @click="toggleView()">
				<ListSVG v-if="viewType === 'list'"></ListSVG>
				<GridSVG v-if="viewType === 'grid'"></GridSVG>
			</button>
		</div>
	</div>
</template>
<style scoped>
	.filters {
		display: flex;
		align-items: center;
		justify-content: space-between;
		background: white;
		padding: 1rem;
	}
	.start,
	.end {
		display: flex;
		align-items: center;
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

</style>