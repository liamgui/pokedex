import { ref, Ref } from "vue";
export type ViewType = "list" | "grid";

const selectedPokemonType: Ref<string> = ref("");
const viewType: Ref<ViewType> = ref("grid");


export function useView() {
	function setSelectedPokemonType(value: string) {
		selectedPokemonType.value = selectedPokemonType.value === value ? "" : value;
	}
		
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