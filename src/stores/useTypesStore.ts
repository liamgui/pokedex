import { defineStore } from "pinia";
import { Ref, ref } from "vue";


export const useTypesStore = defineStore(
	"types",
	() => {	
		//this is not used for the dropdown! this is only used for clicking on the type in the pokemon card and shwoing the pokemon of that type
		const selectedType: Ref<string> = ref("");

		function setSelectedType(value: string) {
			selectedType.value = selectedType.value === value ? "" : value;
		}
		return {
			selectedType,
			setSelectedType
		};
	}
);
