import LocalStorageManager from "./LocalStorageManager.js";

export default class UsersStored {
	#localStorageManager;
	#list;

	constructor() {
		this.#localStorageManager = new LocalStorageManager("TC_USERS");
		this.#list = this.#localStorageManager.value;

		if (this.#list === null) {
			this.#list = [];
			this.saveToLocalStorage();
		}
	}

	get users() {
		return this.#list;
	}

	addUser(userData) {
		if (
			userData?.username &&
			userData?.name &&
			userData?.sdt &&
			userData?.password
		) {
			this.#list.push({
				username: userData.username,
				name: userData.name,
				sdt: userData.sdt,
				password: userData.password,
			});
		}
	}

	getUserByID(id) {
		this.#list.find((user) => user.id === id);
	}

	saveToLocalStorage() {
		this.#localStorageManager.value = this.#list;
	}
}
