import { computed, ref, Ref } from "vue";
import { getValueFromStringPath } from "@/util";

export function defaultFilterFunction(value: any, filter: string) {
	if (value === undefined) {
		return false;
	}

	filter = filter.toLocaleLowerCase();

	if (Array.isArray(value)) {
		return value.map((v) => {
			if (typeof v == "string") {
				return v.toLowerCase();
			}
			return v;
		}).includes(filter);
	}

	if (typeof value == "string") {
		return value.toLowerCase().includes(filter);
	}

	return value.toString() == filter;
}

export function useFilter(fieldToFilterBy: string, data: Ref<any[] | undefined>, customFilterFunction?: (value: any, filter: string) => boolean) {
	const filterValue = ref("");

	const filteredData = computed(() => {
		if (!filterValue.value || filterValue.value.length === 0) {
			return data.value;
		}

		if (!data.value) {
			return [];
		}

		return data.value.filter((item: any) => {
			const value = getValueFromStringPath(item, fieldToFilterBy);

			if (customFilterFunction) {
				return customFilterFunction(value, filterValue.value);
			}

			return defaultFilterFunction(value, filterValue.value);
		});
	});

	return { filterValue, filteredData };
}
