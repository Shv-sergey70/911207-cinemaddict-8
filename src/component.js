import {createDomElement} from "./utility";

export default class Component {
  constructor() {
    if (new.target === Component) {
      throw new Error(`Can't create instance of abstract class Component`);
    }

    this._element = null;
  }

  get _template() {
    throw new Error(`You have to define template`);
  }

  _bindListeners() {}

  _unbindListeners() {}

  render() {
    this._element = createDomElement(this._template);
    this._bindListeners();

    return this._element;
  }

  remove() {
    if (this._element !== null) {
      this._unbindListeners();
      this._element.remove();
      this._element = null;
    }
  }

  _rerender() {
    this._unbindListeners();
    this._element.innerHTML = this._template;
    this._bindListeners();
  }
}
