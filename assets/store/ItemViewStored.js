import LocalStorageManager from "./LocalStorageManager.js";

export default class ItemViewStored {
	#localStorageManager;
	#itemID;

	constructor() {
		this.#localStorageManager = new LocalStorageManager("TC_VIEW_ITEM");
		this.#itemID = this.#localStorageManager.value;

		if (this.#itemID === null) {
			this.#itemID = 1;
			this.saveToLocalStorage();
		}
	}

	get itemID() {
		return this.#itemID;
	}

	set itemID(itemID) {
		this.#itemID = itemID;
	}

	saveToLocalStorage() {
		this.#localStorageManager.value = this.#itemID;
	}
}
