import LocalStorageManager from "./LocalStorageManager.js";

export default class CartStored {
	#localStorageManager;
	#list;

	constructor() {
		this.#localStorageManager = new LocalStorageManager("TC_CART");
		this.#list = this.#localStorageManager.value || [];
	}

	set list(newList) {
		if (Array.isArray(newList)) {
			this.#list = newList;
		}
	}

	get list() {
		return this.#list;
	}

	/**
	 * Thêm 1 đối tượng vào mảng nếu hợp lệ
	 * @param item: { item_id: number, qty:number, color: number, size: number}
	 */
	addItem(item) {
		// Kiểm tra xem có hàng như vậy trong giỏ chưa
		const current = this.#list.findIndex(
			(localItem) =>
				localItem.item_id === item.item_id &&
				localItem.color === item.color &&
				localItem.size === item.size
		);

		console.log(current)

		if (current !== -1) {
			this.#list[current].qty += item.qty;
		} else {
			this.#list.push({
				item_id: item.item_id,
				qty: item.qty,
				color: item.color,
				size: item.size,
			});
		}

		return true;
	}

	removeItem(index) {
		this.#list.splice(index, 1);
	}

	saveToLocalStorage() {
		this.#localStorageManager.value = this.#list;
	}
}
