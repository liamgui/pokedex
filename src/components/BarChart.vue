<script setup lang="ts">
import { computed, ComputedRef, onMounted, onUnmounted, ref, watch } from "vue";
import { Bar } from "vue-chartjs";
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale, ChartOptions, LinearScaleOptions, ScaleOptions } from "chart.js";
// import "chart.js/auto";
// import { ChartOptions } from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";


ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale, ChartDataLabels);

type Props = {
	inputs: number[],
	labels: string[]
}
const props = defineProps<Props>();

const barColors = ["#9694ff", "#68b998"];
const chartData = computed(() => {
	return {
		labels: props.labels,
		datasets: [{
			data: props.inputs,
			backgroundColor: barColors,
			barThickness: 10,
			grouped: true,
			minBarLength: 100,
			max: 5000,
			// inflateAmount: 10,
			borderWidth: 0,
			borderRadius: 10,
			borderSkipped: false
		}]
	};
});

const chartOptions: ComputedRef<ChartOptions> = computed(() => {
	return {
		indexAxis: "y",
		responsive: true,
		maintainAspectRatio: false,
		plugins: {
			legend: {
				display: false
			},
			datalabels: {
				display: true,
				align: "end",
				anchor: "end",
				labels: {
					title: {
						font: {
							weight: "bold"
						}
					}
				}
			}
		},
		scales: {
			x: {
				display: false,
				max: 5000
			},
			y: {
				grid: {
					borderWidth: 0,
					display: false
				}
			}
		}
	};
});


</script>
<template>
	<Bar
		ref="barChart"
		class="bar-chart"
		:chart-options="chartOptions"
		:chart-data="chartData"
	/>
</template>
<style scoped>
.bar-chart {
	height: 100px;
}
</style>