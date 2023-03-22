/**
 * {
 *  item_id: 1,
 *  qty: 2,
 *  color: 1,
 *  size: 2
 * }
 */

export default function storeCart() {
	const key = "CART_ITEM";
	let list = [];

	const readLocal = () => {
		const localData = window.localStorage.getItem(key);
		return JSON.parse(localData) || [];
	};

	const writeLocal = () => {
		window.localStorage.setItem(key, JSON.stringify(list));
	};

	const removeItem = (index) => {
		list.slice(index + 1);
	};

	const addItem = (item) => {
		list.push(item);
	};

	const getList = () => {
		return list;
	};

	const setList = (newList) => {
		list = newList;
	};

	list = readLocal();

	return {
		readLocal,
		writeLocal,
		removeItem,
		addItem,
		getList,
		setList
	};
}
