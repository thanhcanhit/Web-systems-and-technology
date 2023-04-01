export default class LocalStorageManager {
  #key;

  constructor(key) {
    this.#key = key;
  }
  
  set value(value) {
    localStorage.setItem(this.#key, JSON.stringify(value));  
  }

  get value() {
    return JSON.parse(localStorage.getItem(this.#key));
  }
  
}