<script lang="ts" setup>
import { ArrowDown } from "@element-plus/icons-vue";

defineProps<{
	options: string[]
}>();

const handleCommand = (command: string | number | object) => {
	console.log(command);
};
</script>

<template>
	<el-dropdown trigger="click" @command="handleCommand">
		<el-button type="primary">
			Dropdown List<el-icon class="el-icon--right">
				<arrow-down />
			</el-icon>
		</el-button>
		<template #dropdown>
			<el-dropdown-menu>
				<el-dropdown-item v-for="option of options" :key="option" command="option">{{ option }}</el-dropdown-item>
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
  