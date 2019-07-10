/**
 * @property {Number} _commentsCount
 */
import FilmAbstract from "./film-abstract";

export default class FilmCardAbstract extends FilmAbstract {
  constructor(data) {
    super(data);

    this._commentsCount = data.comments.length;

    this._onCommentsButtonClickBinded = this._onCommentsButtonClick.bind(this);
  }

  set commentsButtonClickFunc(fn) {
    this._onCommentsButtonClickFunc = fn;
  }

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
}
