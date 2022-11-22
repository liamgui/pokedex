<script setup lang="ts">
import { ref } from "vue";

interface Props {
	soundSrc: string,
}
defineProps<Props>();

//audio element ref
const audio = ref<HTMLAudioElement | null>(null);
</script>

<template>
	<audio ref="audio" :src="soundSrc"></audio>
	<button @click="audio?.play()"></button>
</template>