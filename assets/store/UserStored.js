import LocalStorageManager from "./LocalStorageManager.js";

export default class UserStored {
	#localStorageManager;
	#user;

	constructor() {
		this.#localStorageManager = new LocalStorageManager("TC_USER");
		this.#user = this.#localStorageManager.value;

		if (this.#user === null) {
			this.saveToLocalStorage();
		}
	}

	get user() {
		return this.#user;
	}

	set user(userData) {
		if ((userData?.username, userData?.name)) {
			this.#user = {
				username: userData.username,
				name: userData.name,
			};
		}
	}

	get name() {
		return this.#user.name;
	}

	get username() {
		return this.#user.username;
	}

	isLogin() {
		return !(this.#user === null || this.#user === "logout");
	}

	logout() {
		this.#user = "logout";
		this.saveToLocalStorage();
	}

	saveToLocalStorage() {
		this.#localStorageManager.value = this.#user;
	}
}
