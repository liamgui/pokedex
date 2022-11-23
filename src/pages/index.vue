<script setup lang="ts">

import { computed } from "vue";
//head
import { useHead } from "@vueuse/head";


import Filters from "~/components/Filters.vue";
import PokemonList from "~/components/PokemonList.vue";

//define head
useHead({
	title: "Pokedex",
	meta: [
		{
			name: "description",
			content: computed(() => "Find your favorite pokemon using this pokedex."),
		},
	],
});

</script>

<template>
	<div class="content">
		<Filters></Filters>
		<Pokemon-List></Pokemon-List>
	</div>
</template>

<style scoped>

.content {
	width: 100%;
	height: 100%;
}

</style>
