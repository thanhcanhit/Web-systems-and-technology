import LocalStorageManager from "./LocalStorageManager.js";

export default class SearchStored {
	#localStorageManager;
	#input;

	constructor() {
		this.#localStorageManager = new LocalStorageManager("TC_SEARCH_INPUT");
		this.#input = this.#localStorageManager.value;

		if (this.#input === null) {
			this.#input = "";
			this.saveToLocalStorage();
		}
	}

	get input() {
		return this.#input;
	}

	set input(itemID) {
		this.#input = itemID;
	}

	saveToLocalStorage() {
		this.#localStorageManager.value = this.#input;
	}
}
