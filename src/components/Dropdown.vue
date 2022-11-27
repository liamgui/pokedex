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
		class="m-2"
		:placeholder="title"
		size="large"
		@change="handleCommand"
	>
		<el-option value="" />
		<el-option
			v-for="item in options"
			:key="item"
			:label="item"
			:value="item.toLowerCase()"
		/>
	</el-select>
</template>

<style scoped>
.example-showcase .el-dropdown + .el-dropdown {
  margin-left: 15px;
}
.example-showcase .el-dropdown-link {
  cursor: pointer;
  color: var(--el-color-primary);
  display: flex;
  align-items: center;
}
</style>
  