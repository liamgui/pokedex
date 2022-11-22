<script setup lang="ts">
import Dropdown from "~/components/Dropdown.vue";
import { usePokemonTypesQuery } from "~/composables/usePokemon";
import { Ref, ref, computed } from "vue";
// pokemon types query
const { types, loading: pokemonTypesLoading, error: pokemonTypesError } = usePokemonTypesQuery();


</script>
<template>
	<Dropdown :options="types"></Dropdown>
</template>