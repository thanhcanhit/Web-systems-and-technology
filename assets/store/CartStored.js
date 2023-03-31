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
		if (item?.item_id && item?.qty && item?.color && item?.size) {
			this.#list.push({
				item_id: item.item_id,
				qty: item.qty,
				color: item.color,
				size: item.size,
			});
			return true;
		}
		return false;
	}

	removeItem(index) {
		this.#list = this.#list.slice(index + 1);
	}

	saveToLocalStorage() {
		this.#localStorageManager.value = this.#list;
	}
}
