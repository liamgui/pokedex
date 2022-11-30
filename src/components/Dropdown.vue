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

const handleCommand = (value: string | number) => {
	emits(changeEmitName, value);
};

const changeEmitName = "change";

const emits = defineEmits<{
	(e: typeof changeEmitName, value: string | number): void
}>();

onMounted(() => {
	value.value = props.defaultValue || "";
});

</script>

<template>
	<el-select
		v-model="value"
		class="dropdown"
		:placeholder="title"
		size="large"
		clearable
		@change="handleCommand"
	>
		<el-option
			v-for="item in options"
			:key="item"
			class="option"
			:label="item"
			:value="item.toLowerCase()"
		/>
	</el-select>
</template>

<style scoped>
.dropdown:deep() .el-input {
	font-size: 1rem;
}
.option {
	font-size: 1rem;
}
</style>
  