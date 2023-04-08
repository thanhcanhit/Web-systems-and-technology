import LocalStorageManager from "./LocalStorageManager.js";

export default class FilterStored {
	#localStorageManager;
	#size;
	#sort;

	constructor() {
		this.#localStorageManager = new LocalStorageManager("TC_VIEW_FILTER");
		this.#size = this.#localStorageManager.value?.size;
		this.#sort = this.#localStorageManager.value?.sort;

		if (this.#size === undefined) {
			this.#size = 0;
			this.saveToLocalStorage();
		}
		if (this.#sort === undefined) {
			this.#sort = 0;
			this.saveToLocalStorage();
		}
	}

	get size() {
		return this.#size;
	}

	set size(size) {
		this.#size = size;
	}

	get sort() {
		return this.#sort;
	}

	set sort(sort) {
		this.#sort = sort;
	}

	saveToLocalStorage() {
		this.#localStorageManager.value = {
			size: this.#size,
			sort: this.#sort,
		};
	}
}
