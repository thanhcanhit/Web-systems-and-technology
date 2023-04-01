import LocalStorageManager from "./LocalStorageManager.js";

export default class SubCategoryViewStored {
	#localStorageManager;
	#subcategoryID;

	constructor() {
		this.#localStorageManager = new LocalStorageManager("TC_VIEW_SUBCATEGORY");
		this.#subcategoryID = this.#localStorageManager.value;

		if (this.#subcategoryID === null) {
			this.#subcategoryID = 1;
			this.saveToLocalStorage();
		}
	}

	get subcategoryID() {
		return this.#subcategoryID;
	}

	set subcategoryID(subcategoryID) {
		this.#subcategoryID = subcategoryID;
	}

	saveToLocalStorage() {
		this.#localStorageManager.value = this.#subcategoryID;
	}
}
