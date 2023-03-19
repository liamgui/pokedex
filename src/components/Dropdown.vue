<script lang="ts" setup>
import { onMounted, ref } from "vue";

const props = withDefaults(defineProps<{
	options: string[],
	title: string
	defaultValue?: string | null;
}>(),
{
	defaultValue: null
});

const value = ref("");
const changeEmitName = "change";

const handleCommand = (value: string | number) => {
	console.log("handleCommand", value);
	emits(changeEmitName, value);
};

const emits = defineEmits<{
	(e: typeof changeEmitName, value: string | number): void
}>();

onMounted(() => {
	value.value = props.defaultValue || "";
});

</script>

<template>
	<div>
		<el-select
			v-model="value"
			class="dropdown"
			:placeholder="title"
			size="large"
			clearable
			@change="handleCommand($event)"
		>
			<el-option
				v-for="item in options"
				:key="item"
				class="option"
				:label="item"
				:value="item.toLowerCase()"
			/>
		</el-select>
	</div>
</template>

<style scoped>
.dropdown:deep() .el-input {
	font-size: 1rem;
}
.option {
	font-size: 1rem;
}
</style>
  