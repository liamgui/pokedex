<script lang="ts" setup>
import { ArrowDown } from "@element-plus/icons-vue";
import { emitKeypressEvents } from "readline";
import { ref, watch } from "vue";

const props = defineProps<{
	options: string[],
	title: string
}>();

const value = ref("");

const handleCommand = (value: string | number) => {
	emits(changeEmitName, value);
};

const changeEmitName = "change";

const emits = defineEmits<{
	(e: typeof changeEmitName, value: string | number): void
}>();
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
  