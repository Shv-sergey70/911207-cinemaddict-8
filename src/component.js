import {createDomElement} from "./utility";

/**
 * @property {String} _title
 * @property {Number} _rating
 * @property {Number} _releaseDate
 * @property {String} _duration
 * @property {String} _poster
 * @property {String} _description
 * @property {Array} _genres
 */
export default class Component {
  constructor(data) {
    if (new.target === Component) {
      throw new Error(`Can't create instance of abstract class Component`);
    }
    ({
      title: this._title,
      rating: this._rating,
      releaseDate: this._releaseDate,
      duration: this._duration,
      poster: this._poster,
      description: this._description,
      genres: this._genres
    } = data);
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
    this._unbindListeners();
    this._element.remove();
    this._element = null;
  }
}
