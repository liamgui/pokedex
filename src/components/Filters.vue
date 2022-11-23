<script setup lang="ts">
import Dropdown from "~/components/Dropdown.vue";
import { Ref, ref, computed } from "vue";
import { usePokemonTypesQuery } from "~/composables/usePokemon";
import { useFilterStore, Filters } from "~/stores/useFilterStore";
import { storeToRefs } from "pinia";
// pokemon types query
const { types, loading: pokemonTypesLoading, error: pokemonTypesError } = usePokemonTypesQuery();

const { setFilter } = useFilterStore();

</script>
<template>
	<button @click="setFilter(false, 'isFavorite')">All</button>
	<button @click="setFilter(true, 'isFavorite')">Favorites</button>
	<Dropdown :options="types" title="Types" @change="setFilter($event, 'type')"></Dropdown>
</template>