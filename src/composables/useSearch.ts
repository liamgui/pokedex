import { computed, ref, Ref } from "vue";

//in case we wanted to add more search options like type (or weakness if weakness is added to api in the future)
export function useSearch(fieldsToSearch: string[], data: Ref<any>) {
	const search = ref("");
	const searchData = computed(() => {
		const searchValue = search.value.toLowerCase();
		if (!searchValue || searchValue.length === 0) {
			return data.value;
		}

		return data.value.filter((item: any) => {
			const foundOneField = fieldsToSearch.some((field) => {
				const value = item[field]?.toLowerCase();
				return value?.includes(searchValue);
			});

			if (foundOneField) {
				return true;
			}

			// add all fields together with spaces between for more matches
			const concatFields = fieldsToSearch.reduce((prev, key) => {
				return prev + " " + item[key]?.toLowerCase();
			}, "");
			return concatFields.toLowerCase().includes(searchValue);
		});
	});
	return { search, searchData };
}