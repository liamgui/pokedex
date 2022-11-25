<script setup lang="ts">
import Dropdown from "~/components/Dropdown.vue";
import SearchBar from "~/components/SearchBar.vue";
import { Ref, ref, computed } from "vue";
import { usePokemonTypesQuery } from "~/composables/usePokemon";
import { useFilterStore, Filters } from "~/stores/useFilterStore";
// pokemon types query
const { types, loading: pokemonTypesLoading, error: pokemonTypesError } = usePokemonTypesQuery();

const { setFilter } = useFilterStore();



</script>
<template>
	<button @click="setFilter(null, 'isFavorite')">All</button>
	<button @click="setFilter(true, 'isFavorite')">Favorites</button>
	<Dropdown :options="types" title="Types" @change="setFilter($event, 'type')"></Dropdown>
	<SearchBar></SearchBar>
	<button @click="setFilter('grid', 'view')">Grid</button>
	<button @click="setFilter('list', 'view')">List</button>
</template>