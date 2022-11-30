<script setup lang="ts">
import { storeToRefs } from "pinia";
import { onMounted, ref, watch } from "vue";
import { useFilterStore } from "~/stores/useFilterStore";
// import CloseSVG from "~/assets/svgs/close.svg?component";


const searchText = ref("");
const { updateSearch } = useFilterStore();
const { search } = storeToRefs(useFilterStore());

watch(
	search,
	(newVal) => {
		searchText.value = newVal;
	}
);

onMounted(() => {
	searchText.value = search.value;
});

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
			@input="updateSearch(searchText)" />
		<!-- <CloseSVG></CloseSVG> -->
	</div>
</template>
<style scoped>
.input {
	font-size: 1rem;
}
</style>