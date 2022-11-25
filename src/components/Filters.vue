<script setup lang="ts">
import Dropdown from "~/components/Dropdown.vue";
import SearchBar from "~/components/SearchBar.vue";
import { usePokemonTypesQuery } from "~/composables/usePokemon";
import { useFilterStore } from "~/stores/useFilterStore";
import { useViewStore } from "~/stores/useViewStore";
// pokemon types query
const { types, loading: pokemonTypesLoading, error: pokemonTypesError } = usePokemonTypesQuery();

const { setFilter } = useFilterStore();
const { setViewType } = useViewStore();



</script>
<template>
	<button @click="setFilter(null, 'isFavorite')">All</button>
	<button @click="setFilter(true, 'isFavorite')">Favorites</button>
	<Dropdown :options="types" title="Types" @change="setFilter($event, 'type')"></Dropdown>
	<SearchBar></SearchBar>
	<button @click="setViewType('grid')">Grid</button>
	<button @click="setViewType('list')">List</button>
</template>