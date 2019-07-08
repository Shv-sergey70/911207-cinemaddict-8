import Component from "./component";

export default class FilmCard extends Component {
  constructor(data, isMain = false) {
    super(data);
    this._isMain = isMain;

    this._onCommentsButtonClickBinded = this._onCommentsButtonClick.bind(this);
  }

  set commentsButtonClickFunc(fn) {
    this._onCommentsButtonClickFunc = fn;
  }

  get _template() {
    return `<article class="film-card ${this._isMain ? `` : `film-card--no-controls`}">
          <h3 class="film-card__title">${this._title}</h3>
          <p class="film-card__rating">${this._rating}</p>
          <p class="film-card__info">
            <span class="film-card__year">${this._year}</span>
            <span class="film-card__duration">${this._duration}</span>
            <span class="film-card__genre">${this._genre}</span>
          </p>
          <img src="${this._poster}" alt="" class="film-card__poster">
          ${this._isMain ? `<p class="film-card__description">${this._description}</p>` : ``}
          <button class="film-card__comments">${this._comments.length} comments</button>

          ${this._isMain ? `
<form class="film-card__controls">
<button class="film-card__controls-item button film-card__controls-item--add-to-watchlist"><!--Add to watchlist--> WL</button>
<button class="film-card__controls-item button film-card__controls-item--mark-as-watched"><!--Mark as watched-->WTCHD</button>
<button class="film-card__controls-item button film-card__controls-item--favorite"><!--Mark as favorite-->FAV</button>
</form>` : ``}
        </article>`.trim();
  }

  _onCommentsButtonClick() {
    return typeof this._onCommentsButtonClickFunc === `function` && this._onCommentsButtonClickFunc();
  }

  _bindListeners() {
    this._element.querySelector(`.film-card__comments`).addEventListener(`click`, this._onCommentsButtonClickBinded);
  }

  _unbindListeners() {
    this._element.querySelector(`.film-card__comments`).removeEventListener(`click`, this._onCommentsButtonClickBinded);
  }
}
