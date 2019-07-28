/**
 * @property {Number} _id
 * @property {String} _title
 * @property {Number} _rating
 * @property {Number} _releaseDate
 * @property {String} _duration
 * @property {String} _poster
 * @property {String} _description
 * @property {Array} _genres
 * @property {Object} _states
 * @property {Number} _watchingDate
 */
import Component from "./component";
import {isFunction} from "./utility";

export default class FilmAbstract extends Component {
  constructor(data) {
    super();

    ({
      id: this._id,
      title: this._title,
      rating: this._rating,
      releaseDate: this._releaseDate,
      duration: this._duration,
      poster: this._poster,
      description: this._description,
      genres: this._genres,
      states: this._states,
      watchingDate: this._watchingDate
    } = data);

    this._onAddToWatchListButtonClickBinded = this._onAddToWatchListButtonClick.bind(this);
    this._onMarkAsWatchedButtonClickBinded = this._onMarkAsWatchedButtonClick.bind(this);
  }

  get id() {
    return this._id;
  }

  get states() {
    return this._states;
  }

  setState(stateType, value) {
    if (this._states[stateType] === undefined) {
      throw new Error(`Incorrect state type`);
    }

    this._states[stateType] = value;
  }

  set onAddToWatchList(func) {
    this._onAddToWatchList = func;
  }

  set onMarkAsWatched(func) {
    this._onMarkAsWatched = func;
  }

  _onAddToWatchListButtonClick(evt) {
    evt.preventDefault();

    return isFunction(this._onAddToWatchList) && this._onAddToWatchList();
  }
  _onMarkAsWatchedButtonClick(evt) {
    evt.preventDefault();

    return isFunction(this._onMarkAsWatched) && this._onMarkAsWatched();
  }

  _bindListeners() {
    this._element.querySelector(`.film-card__comments`).addEventListener(`click`, this._onCommentsButtonClickBinded);
  }

  _unbindListeners() {
    this._element.querySelector(`.film-card__comments`).removeEventListener(`click`, this._onCommentsButtonClickBinded);
  }

  updateData(data) {
    this._states = {
      isInWatchList: data.states.isInWatchList,
      isWatched: data.states.isWatched,
      isFavorite: data.states.isFavorite
    };
  }
}
