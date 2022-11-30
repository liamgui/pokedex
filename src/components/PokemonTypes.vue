<script setup lang="ts">
import { ref } from "vue";
import { useViewStore } from "~/stores/useViewStore";

type Props = {
	types: string[];
	hover?: boolean;
};

withDefaults(defineProps<Props>(), {
	hover: false,
});

const { setSelectedPokemonType } = useViewStore();
const hovering = ref(false);
const typeHover = (type: string) => {
	hovering.value = true;
	setTimeout(() => {
		if (hovering.value) {
			setSelectedPokemonType(type);
		}
	}, 400);
};

const typeLeave = () => {
	hovering.value = false;
	setSelectedPokemonType("");
};


</script>
<template>
	<div class="types">
		<div
			v-for="ptype of types"
			:key="ptype"
			class="type"
			:class="'type-' + ptype.toLowerCase() + '-background'"
			@mouseover="typeHover(ptype.toLowerCase())"
			@mouseleave="typeLeave()"
		>
			{{ ptype }}
		</div>
	</div>
</template>

<style scoped>
.types {
	display: flex;
	flex-direction: row;
	justify-content: flex-start;
	align-items: center;
	text-align: center;
}
.type {
	width: 100px;
	border-radius: 5px;
	font-size: 0.75rem;
	font-weight: 700;
	letter-spacing: 1px;
	text-transform: uppercase;
	margin-right: 0.25rem;
	color: white;
	text-shadow: 1px 1px 1px rgba(0, 0, 0, 0.5);
	position: relative;
	cursor: default;
}
</style>