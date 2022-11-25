<script setup lang="ts">
import { ref } from "vue";
import { useFilterStore, Filters } from "~/stores/useFilterStore";

const searchText = ref("");
const { search, updateSearch } = useFilterStore();
</script>
<template>
	<div class="search-bar">
		<input v-model="searchText" type="text" @input="updateSearch(searchText)" />
	</div>
</template>