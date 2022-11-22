export function getValueFromStringPath(obj: any, path: string) {
	const parts = path.split(".");
	let value = obj;
	for (let i = 0; i < parts.length; i++) {
		if (value === undefined) {
			return undefined;
		}

		value = value[parts[i]];
	}
	return value;
}