export default function storeCart() {
	const key = "LAST_CATEGORY";
	let value;

	const readLocal = () => {
		const localData = window.localStorage.getItem(key);
		return JSON.parse(localData) || 0;
	};

	const writeLocal = () => {
		window.localStorage.setItem(key, JSON.stringify(value));
	};

	const getValue = () => {
		return value;
	};

	const setValue = (newValue) => {
		value = newValue;
	};

	value = readLocal();

	return { readLocal, writeLocal, getValue, setValue };
}
