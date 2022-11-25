import { defineStore } from "pinia";
import { Ref, ref } from "vue";

export type ViewType = "list" | "grid";

export const useViewStore = defineStore(
	"view",
	() => {	
		//this is not used for the dropdown! this is only used for clicking on the type in the pokemon card and shwoing the pokemon of that type
		const selectedPokemonType: Ref<string> = ref("");
		function setSelectedPokemonType(value: string) {
			selectedPokemonType.value = selectedPokemonType.value === value ? "" : value;
		}
		
		const viewType: Ref<ViewType> = ref("grid");
		function setViewType(value: ViewType) {
			viewType.value = value;
		}

		return {
			selectedPokemonType,
			setSelectedPokemonType,
			viewType,
			setViewType
		};
	}
);
