/**
 * @property {Number} _commentsCount
 */
import Component from "./component";

export default class FilmCardAbstract extends Component {
  constructor(data) {
    super(data);

    this._commentsCount = data.comments.length;

    this._onCommentsButtonClickBinded = this._onCommentsButtonClick.bind(this);
    this._onAddToWatchListButtonClickBinded = this._onAddToWatchListButtonClick.bind(this);
    this._onMarkAsWatchedButtonClickBinded = this._onMarkAsWatchedButtonClick.bind(this);
  }

  set commentsButtonClickFunc(fn) {
    this._onCommentsButtonClickFunc = fn;
  }

  get _template() {}

  _getFormattedDuration() {
    return `${Math.floor(this._duration / 60)}h ${this._duration % 60}m`;
  }

  updateCommentsCount(newCommentsCount) {
    this._commentsCount = newCommentsCount;
    this._element.querySelector(`.film-card__comments`).textContent = `${this._commentsCount} comments`;
  }

  _onCommentsButtonClick() {
    return typeof this._onCommentsButtonClickFunc === `function` && this._onCommentsButtonClickFunc();
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
