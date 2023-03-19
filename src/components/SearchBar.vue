<script setup lang="ts">

import { onMounted, ref, watch } from "vue";
import { useFilters } from "~/composables/useFilters";
import { usePokemonQuery } from "~/composables/usePokemon";
// import CloseSVG from "~/assets/svgs/close.svg?component";


const searchText = ref("");
const { search, updateSearch } = usePokemonQuery();

watch(
	search,
	(newVal) => {
		searchText.value = newVal;
	}
);

onMounted(() => {
	searchText.value = search.value;
});

function sendUpdatedSearch() {
	updateSearch(searchText.value);
}

</script>
<template>
	<div class="search-bar">
		<el-input
			v-model="searchText"
			clearable
			class="input search-bar"
			size="large"
			type="text"
			placeholder="Search"
			@input="sendUpdatedSearch" />
		<!-- <CloseSVG></CloseSVG> -->
	</div>
</template>
<style scoped>
.input {
	font-size: 1rem;
}
</style>