<script setup lang="ts">
import { ref } from "vue";
import SoundSVG from "~/assets/svgs/sound.svg?component";

interface Props {
	soundSrc: string,
}
defineProps<Props>();

//audio element ref
const audio = ref<HTMLAudioElement | null>(null);
</script>

<template>
	<audio ref="audio" :src="soundSrc"></audio>
	<button @click="audio?.play()">
		<SoundSVG></SoundSVG>
	</button>
</template>

<style scoped>

button {
	background: transparent;
	border: none;
	position: relative;
    /* height: 50px; */
	height: 100%;
	width: 100%;
	&:deep() svg * {
		transition: all 0.2s ease-in-out;
	}
	&:hover:deep() {
		& svg * {
			filter: brightness(0.75);
		}
	}
	& svg {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
	}
	&:focus {
		outline: none;
	}
}

</style>