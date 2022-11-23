<script lang="ts" setup>
import { ArrowDown } from "@element-plus/icons-vue";
import { emitKeypressEvents } from "readline";

defineProps<{
	options: string[],
	title: string
}>();

const handleCommand = (value: string | number) => {
	emits(changeEmitName, value);
};

const changeEmitName = "change";

const emits = defineEmits<{
	(e: typeof changeEmitName, value: string | number): void
}>();
</script>

<template>
	<el-dropdown trigger="click" @command="handleCommand">
		<el-button type="primary">
			{{ title }}<el-icon class="el-icon--right">
				<arrow-down />
			</el-icon>
		</el-button>
		<template #dropdown>
			<el-dropdown-menu>
				<el-dropdown-item v-for="option of options" :key="option" :command="option">{{ option }}</el-dropdown-item>
			</el-dropdown-menu>
		</template>
	</el-dropdown>
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
  