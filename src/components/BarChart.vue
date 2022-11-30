<script setup lang="ts">
import { computed, ComputedRef } from "vue";
import { Bar } from "vue-chartjs";
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale, ChartOptions } from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";


ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale, ChartDataLabels);

type Props = {
	inputs: number[],
	labels: string[]
}
const props = defineProps<Props>();

const barColors = ["#9694ff", "#68b998"];
const barColorsGray = ["#cccccc", "#cccccc"];
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
		},
		{
			data: [5000, 5000],
			backgroundColor: barColorsGray,
			barThickness: 10,
			grouped: true,
			minBarLength: 100,
			max: 5000,
			// inflateAmount: 10,
			borderWidth: 0,
			borderRadius: 10,
			borderSkipped: false,
			datalabels: {
				display: false
			},
			
		},
		]
	};
});
//modified base chartoptions to add scales - vue plugin didn't support scales in options
const chartOptions: ComputedRef<{scales: any} & ChartOptions> = computed(() => {
	return {
		indexAxis: "y",
		responsive: true,
		maintainAspectRatio: false,
		events: [],
		plugins: {
			legend: {
				display: false
			},
			datalabels: {
				display: true,
				align: "top",
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
			y: 
				{
					stacked: true,
					gridLines: {
						display: false,
						tickMarkLength: 0
					},
					grid: {
						borderWidth: 0,
						display: false
					}
				},

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