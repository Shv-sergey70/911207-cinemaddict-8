/**
 * @property {String} _title
 * @property {Number} _rating
 * @property {Number} _releaseDate
 * @property {String} _duration
 * @property {String} _poster
 * @property {String} _description
 * @property {Array} _genres
 * @property {Object} _states
 */
import Component from "./component";

export default class FilmAbstract extends Component {
  constructor(data) {
    super();

    ({
      title: this._title,
      rating: this._rating,
      releaseDate: this._releaseDate,
      duration: this._duration,
      poster: this._poster,
      description: this._description,
      genres: this._genres,
      states: this._states
    } = data);

    this._onAddToWatchListButtonClickBinded = this._onAddToWatchListButtonClick.bind(this);
    this._onMarkAsWatchedButtonClickBinded = this._onMarkAsWatchedButtonClick.bind(this);
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

  _onAddToWatchListButtonClick() {
    return typeof this._onAddToWatchList === `function` && this._onAddToWatchList();
  }
  _onMarkAsWatchedButtonClick() {
    return typeof this._onMarkAsWatched === `function` && this._onMarkAsWatched();
  }

  _bindListeners() {
    this._element.querySelector(`.film-card__comments`).addEventListener(`click`, this._onCommentsButtonClickBinded);
  }

  _unbindListeners() {
    this._element.querySelector(`.film-card__comments`).removeEventListener(`click`, this._onCommentsButtonClickBinded);
  }
}
