<script setup lang="ts">
import { storeToRefs } from "pinia";
import { ref, watch } from "vue";
import { useFilterStore, Filters } from "~/stores/useFilterStore";
import CloseSVG from "~/assets/svgs/close.svg?component";


const props = defineProps<{
  text?: string;
}>();

const searchText = ref("");
const { updateSearch } = useFilterStore();
const { search } = storeToRefs(useFilterStore());

watch(
	search,
	(newVal) => {
		searchText.value = newVal;
	}
);


</script>
<template>
	<div class="search-bar">
		<input v-model="searchText" type="text" @input="updateSearch(searchText)" />
		<CloseSVG></CloseSVG>
	</div>
</template>