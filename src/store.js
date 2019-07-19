export default class Store {
  /**
   *
   * @param {String} storageKey
   * @param {*} storage
   */
  constructor({storageKey, storage}) {
    this._storageKey = storageKey;
    this._storage = storage;
  }

  /**
   * Returns storage items by key storage
   *
   * @return {*}
   */
  getAll() {
    const emptyItems = {};
    const items = this._storage.getItem(this._storageKey);

    if (!items) {
      return emptyItems;
    }

    try {
      return JSON.parse(items);
    } catch (error) {
      return emptyItems;
    }
  }

  /**
   * Returns item from storage
   *
   * @param {String} key
   * @return {*}
   */
  getItem(key) {
    return this.getAll()[key];
  }

  /**
   * Records item to storage
   *
   * @param {Object} item
   * @param {String} item.key
   * @param {*} item.value
   */
  setItem({key, value}) {
    const items = this.getAll();
    items[key] = value;

    this._storage.setItem(this._storageKey, JSON.stringify(items));
  }
}
