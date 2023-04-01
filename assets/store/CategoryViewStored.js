import LocalStorageManager from "./LocalStorageManager.js";

export default class CategoryViewStored {
	#localStorageManager;
	#categoryID;

	constructor() {
		this.#localStorageManager = new LocalStorageManager("TC_VIEW_CATEGORY");
		this.#categoryID = this.#localStorageManager.value;

		if (this.#categoryID === null) {
			this.#categoryID = 1;
			this.saveToLocalStorage();
		}
	}

	get categoryID() {
		return this.#categoryID;
	}

	set categoryID(categoryID) {
		this.#categoryID = categoryID;
	}

	saveToLocalStorage() {
		this.#localStorageManager.value = this.#categoryID;
	}
}
