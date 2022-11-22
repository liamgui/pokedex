<script setup lang="ts">
import { useQuery } from "@vue/apollo-composable";
import gql from "graphql-tag";
import { onMounted, Ref, watch } from "vue";
import { usePokemonByNameQuery } from "~/composables/usePokemon";
const props = defineProps<{
	name: string;
}>();

const { pokemon } = usePokemonByNameQuery(props.name);

watch(
	pokemon,
	(pokemon) => {
		if (pokemon) {
			console.log(pokemon);
		}
	},
	{ immediate: true }
);

</script>
<template>
	<router-link to="/">Home</router-link>
	<h1>{{ pokemon.name }}</h1>
</template>
<style scoped>

</style>