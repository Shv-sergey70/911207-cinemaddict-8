import FilmCardAbstract from "./film-card-abstract";
import moment from "moment";

const filmsStatesToButtonClassesMapper = {
  'isWatched': `mark-as-watched`,
  'isInWatchList': `add-to-watchlist`,
  'isFavorite': `favorite`
};

export default class FilmCardMain extends FilmCardAbstract {
  constructor(data) {
    super(data);
  }

  get _template() {
    return `
         <article class="film-card">
          <h3 class="film-card__title">${this._title}</h3>
          <p class="film-card__rating">${this._rating}</p>
          <p class="film-card__info">
            <span class="film-card__year">${moment(this._releaseDate).format(`YYYY`)}</span>
              <span class="film-card__duration">${this._getFormattedDuration()}</span>
              <span class="film-card__genre">${this._genres[0] || `-`}</span>
          </p>
          <img src="${this._poster}" alt="" class="film-card__poster">
          <p class="film-card__description">${this._description}</p>
          <button class="film-card__comments">${this._commentsCount} comments</button>

          <form class="film-card__controls">
            <button class="film-card__controls-item button film-card__controls-item--add-to-watchlist ${this.states.isInWatchList ? `film-card__controls-item--active` : ``}"><!--Add to watchlist--> WL</button>
            <button class="film-card__controls-item button film-card__controls-item--mark-as-watched ${this.states.isWatched ? `film-card__controls-item--active` : ``}"><!--Mark as watched-->WTCHD</button>
              <button class="film-card__controls-item button film-card__controls-item--favorite ${this.states.isFavorite ? `film-card__controls-item--active` : ``}"><!--Mark as favorite-->FAV</button>
              </form>
            </article>`.trim();
  }

  updateFilmsControlButtons() {
    for (let key in filmsStatesToButtonClassesMapper) {
      if (this.states[key]) {
        this._element.querySelector(`.film-card__controls-item--${filmsStatesToButtonClassesMapper[key]}`).classList.add(`film-card__controls-item--active`);
      } else {
        this._element.querySelector(`.film-card__controls-item--${filmsStatesToButtonClassesMapper[key]}`).classList.remove(`film-card__controls-item--active`);
      }
    }
  }

  _bindListeners() {
    super._bindListeners();
    this._element.querySelector(`.film-card__controls-item--add-to-watchlist`).addEventListener(`click`, this._onAddToWatchListButtonClickBinded);
    this._element.querySelector(`.film-card__controls-item--mark-as-watched`).addEventListener(`click`, this._onMarkAsWatchedButtonClickBinded);
    this._element.querySelector(`.film-card__controls-item--favorite`).addEventListener(`click`, this._onAddToFavoriteButtonClick);
  }

  _unbindListeners() {
    super._unbindListeners();
    this._element.querySelector(`.film-card__controls-item--add-to-watchlist`).removeEventListener(`click`, this._onAddToWatchListButtonClickBinded);
    this._element.querySelector(`.film-card__controls-item--mark-as-watched`).removeEventListener(`click`, this._onMarkAsWatchedButtonClickBinded);
    this._element.querySelector(`.film-card__controls-item--favorite`).removeEventListener(`click`, this._onAddToFavoriteButtonClick);
  }
}
